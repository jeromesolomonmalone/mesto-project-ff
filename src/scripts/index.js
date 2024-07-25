import "../pages/index.css";
import { addCard, deleteCard, addCardLike, removeCardLike } from "./card.js";
import {
  openPopup,
  closePopup,
  addCloseOverlayListener,
  renderLoading,
} from "./modal.js";
import { enableValidation, clearValidation } from "./validation.js";
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
const popupTypeImage = document.querySelector(".popup_type_image");
const profileAvatar = document.querySelector(".profile__image");
const myID = "2fcc5740c8d4ed7400fccd50";
const buttonEditProfile = document.querySelector(".button_edit-profile");
const buttonNewPlace = document.querySelector(".button_new-place");
const buttonEditAvatar = document.querySelector(".button_edit-avatar");
const editAvatar = document.forms["edit-avatar"];
const avatarInput = editAvatar.elements.avatar;
let cardId = null;

// @todo: Вывести карточки на страницу
//Активация функции добавления карты, через проход массива карт из ссылки
getDataCards().then((res) => {
  res.forEach(function (element) {
    cardsList.append(
      addCard(
        element,
        deleteCard,
        showPopup,
        myID,
        addLike,
        removeLike,
        deleteCardApi,
        cardId,
        removeCardLike,
        addCardLike
      )
    );
  });
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
  clearValidation(editProfile, nameInput);
  clearValidation(editProfile, jobInput);
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

enableValidation();

//Активация функции данных профиля
getDataProfile().then((res) => {
  //Данные шапки равно данные с сервера
  profileTitle.textContent = res.name;
  profileDescription.textContent = res.about;
  profileAvatar.style.backgroundImage = "url(" + res.avatar + ")";

  //Данные инпутов равно данные из шапки
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  avatarInput.value = res.avatar;
});

//Функция сохранения данных ИМЕНИ и ПОДРОБНЕЕ
function saveProfileData(evt) {
  evt.preventDefault();

  //Запуск функции изменения кнопки, когда закружается информация
  renderLoading(true, buttonEditProfile);

  //Данные шапки равно данные инпутов
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;

  //Активация функции пересохранения данных имени и подробнее
  saveProfileApi({
    name: nameInput.value,
    about: jobInput.value,
  })
    //Выключение функции изменения кнопки, когда закружается информация
    .finally(() => {
      renderLoading(false, buttonEditProfile);
    });

  closePopup(popupTypeEdit);
}

editProfile.addEventListener("submit", saveProfileData);

//Функция сохранения данных КАРТОЧКИ
function createCard(evt) {
  evt.preventDefault();

  //Запуск функции изменения кнопки, когда закружается информация
  renderLoading(true, buttonNewPlace);
  const placeName = newPlace.elements["place-name"];
  const placeLink = newPlace.elements.link;
  //Активация функции сохранения карточки
  addNewApiCard({
    name: placeName.value,
    link: placeLink.value,
  })
    //Если все прошло успешно, то карточка добавляется вначало списка карточек
    .then((data) => {
      cardsList.prepend(
        addCard(
          data,
          deleteCard,
          showPopup,
          myID,
          addLike,
          removeLike,
          deleteCardApi,
          cardId,
          removeCardLike,
          addCardLike
        )
      );
    })

    //Выключение функции изменения кнопки, когда закружается информация
    .finally(() => {
      renderLoading(false, buttonNewPlace);
    });

  evt.target.reset();
  clearValidation(newPlace, placeName);
  clearValidation(newPlace, placeLink);
  closePopup(popupTypeNewCard);
}

newPlace.addEventListener("submit", createCard);

//Функция сохранения ссылки АВАТАРА
function saveAvatarData(evt) {
  evt.preventDefault();

  //Запуск функции изменения кнопки, когда закружается информация
  renderLoading(true, buttonEditAvatar);

  //Данные шапки равно данные инпутов
  profileAvatar.style.backgroundImage = "url(" + avatarInput.value + ")";

  //Активация функции пересохранения ссылки аватара
  saveAvatarApi({
    avatar: avatarInput.value,
  })
    //Выключение функции изменения кнопки, когда закружается информация
    .finally(() => {
      renderLoading(false, buttonEditAvatar);
    });

  //Закрытие попапа
  closePopup(popupTypeEditAvatar);
}

//Листенер на форму сохранения ссылки АВАТАРА
editAvatar.addEventListener("submit", saveAvatarData);
