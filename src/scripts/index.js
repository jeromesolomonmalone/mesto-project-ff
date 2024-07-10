import "../pages/index.css";
import { initialCards } from "./cards.js";
import { addCard, deleteCard, cardLikeButton } from "./card.js";
import { openPopup, closePopup, closeOverlay } from "./modal.js";

// @todo: DOM узлы
export const cardTemplate = document.querySelector("#card-template").content;
const cardsList = document.querySelector(".places__list");
const profileEditOpen = document.querySelector(".profile__edit-button");
const profileAddButton = document.querySelector(".profile__add-button");
const popupTypeEdit = document.querySelector(".popup_type_edit");
const popupTypeNewCard = document.querySelector(".popup_type_new-card");
const closeButtons = document.querySelectorAll(".popup__close");
export const popup = document.querySelectorAll(".popup");
const formElement = document.forms["edit-profile"];
const nameInput = formElement.elements.name;
const jobInput = formElement.elements.description;
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const newPlace = document.forms["new-place"];

// @todo: Вывести карточки на страницу
initialCards.forEach(function (element) {
  cardsList.append(addCard(element, deleteCard, cardLikeButton));
});

//Наложение на каждый попап класса анимации
popup.forEach(function (element) {
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

// Перебор кнопок закрытия с последующим наложения на них функции, которая убирает класс с элементов
closeButtons.forEach(function (element) {
  element.addEventListener("click", function () {
    closePopup(popup);
  });
});

// Перебор попапов с последующим наложения на них функции, которая убирает класс с элементов,
//если нажатие вне попапа на оверлей
popup.forEach(closeOverlay);

// Функция, которая сохраняет введенные данные
function handleFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closePopup(popup);
}

formElement.addEventListener("submit", handleFormSubmit);

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
  const newCardElement = addCard(createCardElement, deleteCard);
  cardsList.prepend(newCardElement);
  element.target.reset();
  closePopup(popup);
}

newPlace.addEventListener("submit", createCard);
