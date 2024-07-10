import { openPopup } from "./modal";
import { cardTemplate } from ".";

// @todo: Функция создания карточки
export function addCard(item, deleteCard, cardLikeButton) {
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);
  cardElement.querySelector(".card__image").src = item.link;
  cardElement.querySelector(".card__image").alt = item.name;
  cardElement.querySelector(".card__title").textContent = item.name;
  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", deleteCard);

  const cardImage = cardElement.querySelector(".card__image");
  cardImage.addEventListener("click", function () {
    imagePopup(item);
  });

  cardElement
    .querySelector(".card__like-button")
    .addEventListener("click", cardLikeButton);

  return cardElement;
}

// @todo: Функция удаления карточки
export function deleteCard(evt) {
  evt.target.closest(".places__item").remove();
}

// Функция с константой попапа карточек с изображениями и привязка к ним данных из
//темплейта и вызов функции открытии попапа
export function imagePopup(item) {
  const popupTypeImage = document.querySelector(".popup_type_image");
  popupTypeImage.querySelector(".popup__image").src = item.link;
  popupTypeImage.querySelector(".popup__image").alt = item.name;
  popupTypeImage.querySelector(".popup__caption").textContent = item.name;
  openPopup(popupTypeImage);
}

//Функция добавления класса активного лайка
export function cardLikeButton(evt) {
  evt.target.classList.toggle("card__like-button_is-active");
}
