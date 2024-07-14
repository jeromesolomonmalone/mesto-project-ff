import "../pages/index.css";
import { initialCards } from "./cards.js";
import { addCard, deleteCard, cardLikeButton } from "./card.js";
import { openPopup, closePopup, addCloseOverlayListener } from "./modal.js";

// @todo: DOM узлы
const cardsList = document.querySelector(".places__list");
const profileEditOpen = document.querySelector(".profile__edit-button");
const profileAddButton = document.querySelector(".profile__add-button");
const popupTypeEdit = document.querySelector(".popup_type_edit");
const popupTypeNewCard = document.querySelector(".popup_type_new-card");
const closeButtons = document.querySelectorAll(".popup__close");
const popups = document.querySelectorAll(".popup");
const editProfile = document.forms["edit-profile"];
const nameInput = editProfile.elements.name;
const jobInput = editProfile.elements.description;
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const newPlace = document.forms["new-place"];
const popupTypeImage = document.querySelector(".popup_type_image");

// @todo: Вывести карточки на страницу
initialCards.forEach(function (element) {
  cardsList.append(addCard(element, deleteCard, cardLikeButton, showPopup));
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
});

// При нажатии на кнопку добавления карточки вызывается функция открытия попапа
profileAddButton.addEventListener("click", function () {
  openPopup(popupTypeNewCard);
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

// Функция, которая сохраняет введенные данные
function saveProfileData(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closePopup(popupTypeEdit);
}

editProfile.addEventListener("submit", saveProfileData);

//Функция, которая берет введенные данные из формы, подставляет их в значения имени и ссылки
//создает новую карточку, передает ее в функцию создания карточек и добавляет на страницу
function createCard(element) {
  element.preventDefault();
  const placeName = newPlace.elements["place-name"];
  const placeLink = newPlace.elements.link;
  const createCardElement = {
    name: placeName.value,
    link: placeLink.value,
  };
  const newCardElement = addCard(createCardElement, deleteCard, cardLikeButton, showPopup);
  cardsList.prepend(newCardElement);
  element.target.reset();
  closePopup(popupTypeNewCard);
}

newPlace.addEventListener("submit", createCard);
