import "../pages/index.css";
import { addCard, addLikeApi, removeLikeApi } from "./card.js";
import { openPopup, closePopup, addCloseOverlayListener } from "./modal.js";
import {
  enableValidation,
  clearValidation,
  validationConfig,
} from "./validation.js";
import {
  getDataProfile,
  getDataCards,
  saveProfileApi,
  addNewApiCard,
  saveAvatarApi,
  addLike,
  removeLike,
  deleteCardApi,
} from "./api.js";

// @todo: DOM узлы
const cardsList = document.querySelector(".places__list");
const profileEditOpen = document.querySelector(".profile__edit-button");
const profileAddButton = document.querySelector(".profile__add-button");
const popupTypeEdit = document.querySelector(".popup_type_edit");
const popupTypeNewCard = document.querySelector(".popup_type_new-card");
const popupTypeEditAvatar = document.querySelector(".popup_type_edit-avatar");
const closeButtons = document.querySelectorAll(".popup__close");
const popups = document.querySelectorAll(".popup");
const editProfile = document.forms["edit-profile"];
const nameInput = editProfile.elements.name;
const jobInput = editProfile.elements.description;
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const newPlace = document.forms["new-place"];
const placeName = newPlace.elements["place-name"];
const placeLink = newPlace.elements.link;
const popupTypeImage = document.querySelector(".popup_type_image");
const profileAvatar = document.querySelector(".profile__image");
const buttonEditProfile = document.querySelector(".button_edit-profile");
const buttonNewPlace = document.querySelector(".button_new-place");
const buttonEditAvatar = document.querySelector(".button_edit-avatar");
const editAvatar = document.forms["edit-avatar"];
const avatarInput = editAvatar.elements.avatar;
let myID = null;

// @todo: Вывести карточки на страницу
//Активация функции добавления карты, через проход массива карт из ссылки
Promise.all([getDataProfile(), getDataCards()])
  .then((res) => {
    const dataProfile = res[0];
    profileTitle.textContent = dataProfile.name;
    profileDescription.textContent = dataProfile.about;
    profileAvatar.style.backgroundImage = "url(" + dataProfile.avatar + ")";
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
    avatarInput.value = dataProfile.avatar;
    myID = dataProfile._id;

    res[1].forEach(function (element) {
      cardsList.append(
        addCard(
          element,
          myID,
          addLikeApi,
          removeLikeApi,
          addLike,
          removeLike,
          showPopup,
          deleteCardApi
        )
      );
    });
  })
  .catch((err) => {
    console.log(err);
  });

//Наложение на каждый попап класса анимации
popups.forEach(function (element) {
  element.classList.add("popup_is-animated");
});

// При нажатии на кнопку редактирования профиля вызывается функция открытия попапа,
//и в форме отображаются изначальные данные
profileEditOpen.addEventListener("click", function () {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  openPopup(popupTypeEdit);
  clearValidation(editProfile, validationConfig);
});

// При нажатии на кнопку добавления карточки вызывается функция открытия попапа
profileAddButton.addEventListener("click", function () {
  openPopup(popupTypeNewCard);
});

// При нажатии на аватарку вызывается функция открытия попапа
profileAvatar.addEventListener("click", function () {
  openPopup(popupTypeEditAvatar);
});

// Функция с константой попапа карточек с изображениями и привязка к ним данных из
//темплейта и вызов функции открытии попапа
function showPopup(item) {
  popupTypeImage.querySelector(".popup__image").src = item.link;
  popupTypeImage.querySelector(".popup__image").alt = item.name;
  popupTypeImage.querySelector(".popup__caption").textContent = item.name;
  openPopup(popupTypeImage);
}

// Перебор кнопок закрытия с последующим наложения на них функции, которая убирает класс с элементов
closeButtons.forEach(function (element) {
  element.addEventListener("click", function () {
    popups.forEach(closePopup);
  });
});

// Перебор попапов с последующим наложения на них функции, которая убирает класс с элементов,
//если нажатие вне попапа на оверлей
popups.forEach(addCloseOverlayListener);

//Функция сохранения данных ИМЕНИ и ПОДРОБНЕЕ
function saveProfileData(evt) {
  evt.preventDefault();
  saveProfileApi({
    name: nameInput.value,
    about: jobInput.value,
  })
    .then((res) => {
      renderLoading(true, buttonEditProfile);
      profileTitle.textContent = nameInput.value;
      profileDescription.textContent = jobInput.value;
    })
    .catch((err) => console.log(`Ошибка.....: ${err}`))
    .finally(() => {
      renderLoading(false, buttonEditProfile);
      closePopup(popupTypeEdit);
    });
}

editProfile.addEventListener("submit", saveProfileData);

//Функция сохранения данных КАРТОЧКИ
function createCard(evt) {
  evt.preventDefault();
  addNewApiCard({
    name: placeName.value,
    link: placeLink.value,
  })
    .then((res) => {
      renderLoading(true, buttonNewPlace);
      cardsList.prepend(
        addCard(
          res,
          myID,
          addLikeApi,
          removeLikeApi,
          addLike,
          removeLike,
          showPopup,
          deleteCardApi
        )
      );
    })
    .catch((err) => console.log(`Ошибка.....: ${err}`))
    .finally(() => {
      renderLoading(false, buttonNewPlace);
      evt.target.reset();
      clearValidation(newPlace, validationConfig);
      closePopup(popupTypeNewCard);
    });
}

newPlace.addEventListener("submit", createCard);

//Функция сохранения ссылки АВАТАРА
function editAvatarApi(evt) {
  evt.preventDefault();
  saveAvatarApi({
    avatar: avatarInput.value,
  })
    .then(() => {
      renderLoading(true, buttonEditAvatar);
      profileAvatar.style.backgroundImage = "url(" + avatarInput.value + ")";
    })
    .catch((err) => console.log(`Ошибка.....: ${err}`))
    .finally(() => {
      renderLoading(false, buttonEditAvatar);
      closePopup(popupTypeEditAvatar);
    });
}

editAvatar.addEventListener("submit", editAvatarApi);

//Функция, в которой если isLoading = true, то на кнопке текст "Сохранение..."
function renderLoading(isLoading, element) {
  if (isLoading) {
    element.textContent = "Сохранение...";
  } else {
    element.textContent = "Сохранить";
  }
}

enableValidation(validationConfig);
