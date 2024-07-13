const cardTemplate = document.querySelector("#card-template").content;

// @todo: Функция создания карточки
export function addCard(item, deleteCard, cardLikeButton, showPopup) {
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);
  cardElement.querySelector(".card__image").src = item.link;
  cardElement.querySelector(".card__image").alt = item.name;
  cardElement.querySelector(".card__title").textContent = item.name;
  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", deleteCard);

  const cardImage = cardElement.querySelector(".card__image");
  cardImage.addEventListener("click", function(){
     showPopup(item)
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

//Функция добавления класса активного лайка
export function cardLikeButton(evt) {
  evt.target.classList.toggle("card__like-button_is-active");
}
