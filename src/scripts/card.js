const cardTemplate = document.querySelector("#card-template").content;

// @todo: Функция создания карточки
export function addCard(
  item,
  deleteCard,
  showPopup,
  myID,
  addLike,
  removeLike,
  deleteCardApi,
  cardId,
  removeCardLike,
  addCardLike
) {
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);
  cardElement.querySelector(".card__image").src = item.link;
  cardElement.querySelector(".card__image").alt = item.name;
  cardElement.querySelector(".card__title").textContent = item.name;

  // ПУНКТ 7

  //Константа количества лайков с последующей передачей ей количества объектов в массиве на сервере
  const numberOfLikes = cardElement.querySelector(".number__likes");
  numberOfLikes.textContent = item.likes.length;

  const deleteButton = cardElement.querySelector(".card__delete-button");
  //Листенер на кнопку корзины с последующим включением функции, в которой передаются ID карты и КАРТОЧКА
  deleteButton.addEventListener("click", () => {
    deleteCard(item._id, cardElement, deleteCardApi, cardId);
  });

  const cardLikeButton = cardElement.querySelector(".card__like-button");

  //Если в массиве LIKES элемент ID равен моему ID, то изначально сразу кнопке лайка добавляется активный класс
  //и по листенеру на кнопку включается функция УДАЛЕНИЯ отовсюду лайка, а если не равен - функция ДОБАВЛЕНИЯ лайка
  if (item.likes.some((like) => like._id === myID)) {
    cardLikeButton.classList.add("card__like-button_is-active");
    cardLikeButton.addEventListener("click", () => {
      removeCardLike(
        item._id,
        cardLikeButton,
        numberOfLikes,
        removeLike,
        cardId
      );
    });
  } else {
    cardLikeButton.addEventListener("click", () => {
      addCardLike(item._id, cardLikeButton, numberOfLikes, addLike, cardId);
    });
  }

  //Если мой ID не совпадает с ID владельца карты, то кнопке корзины присваевается display "none"
  if (myID !== item.owner._id) {
    deleteButton.style.display = "none";
  }

  const cardImage = cardElement.querySelector(".card__image");
  cardImage.addEventListener("click", function () {
    showPopup(item);
  });

  return cardElement;
}

//Функция-константа с изменением ID карты и самой КАРТОЧКИ, а также активации функции удаления карточки и с сервера и с вёрстки
export const deleteCard = (cardID, card, deleteCardApi, cardId) => {
  cardId = cardID;
  //Переменная самой КАРТОЧКИ
  let deleteElement = card;
  deleteCardApi(cardId).then(() => {
    deleteElement.remove();
  });
};

//Функция-константа с изменением ID карты, КНОПКИ лайк и КОЛИЧЕСТВОМ лайков, а также активации функции добавления
//лайка на сервер, а уже исходя из нее обновление +1 к количеству лайков в верстке и добавления активного класса кнопке лайк
export const addCardLike = (cardID, button, number, addLike, cardId) => {
  cardId = cardID;
  //Переменная самой КНОПКИ лайк
  let likeActiveButton = button;
  //Переменная КОЛИЧЕСТВА лайков
  let numberOfLikes = number;
  addLike(cardId).then((res) => {
    numberOfLikes.textContent = res.likes.length;
    likeActiveButton.classList.add("card__like-button_is-active");
  });
};

//Функция-константа с изменением ID карты, КНОПКИ лайк и КОЛИЧЕСТВОМ лайков, а также активации функции удаления
//лайка на сервер, а уже исходя из нее обновление -1 к количеству лайков в верстке и удаления активного класса кнопке лайк
export const removeCardLike = (cardID, button, number, removeLike, cardId) => {
  cardId = cardID;
  //Переменная самой КНОПКИ лайк
  let likeActiveButton = button;
  //Переменная КОЛИЧЕСТВА лайков
  let numberOfLikes = number;
  removeLike(cardId).then((res) => {
    numberOfLikes.textContent = res.likes.length;
    likeActiveButton.classList.remove("card__like-button_is-active");
  });
};
