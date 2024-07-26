const cardTemplate = document.querySelector("#card-template").content;

// @todo: Функция создания карточки
export function addCard(item, myID, addLikeApi, removeLikeApi, addLike, removeLike, showPopup, deleteCardApi) {
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);
  cardElement.querySelector(".card__image").src = item.link;
  cardElement.querySelector(".card__image").alt = item.name;
  cardElement.querySelector(".card__title").textContent = item.name;
  const numberOfLikes = cardElement.querySelector(".number__likes");
  numberOfLikes.textContent = item.likes.length;
  const deleteButton = cardElement.querySelector(".card__delete-button");
  if (myID !== item.owner._id) {
    deleteButton.remove();
  }
  deleteButton.addEventListener("click", () => {
    deleteCard(item._id, cardElement, deleteCardApi);
  });

  const cardLikeButton = cardElement.querySelector(".card__like-button");
  

  if (item.likes.some((like) => like._id === myID)) {
    cardLikeButton.classList.add("card__like-button_is-active");
  }

  cardLikeButton.addEventListener("click", () => {
    if (cardLikeButton.classList.contains("card__like-button_is-active")) {
      removeLikeApi(item._id, cardLikeButton, numberOfLikes, removeLike);
    } else {
      addLikeApi(item._id, cardLikeButton, numberOfLikes, addLike);
    }
  });

  const cardImage = cardElement.querySelector(".card__image");
  cardImage.addEventListener("click", function () {
    showPopup(item);
  });

  return cardElement;
}

//Функция-константа с изменением ID карты и самой КАРТОЧКИ, а также активации функции удаления карточки и с сервера и с вёрстки
export function deleteCard(id, card, deleteCardApi) {
  deleteCardApi(id)
    .then(() => {
      card.remove();
    })
    .catch((err) => console.log(`Ошибка.....: ${err}`));
}

export function addLikeApi(id, button, likes, addLike) {
  addLike(id)
    .then((res) => {
      button.classList.add("card__like-button_is-active");
      likes.textContent = res.likes.length;
    })
    .catch((err) => console.log(`Ошибка.....: ${err}`));
}

export function removeLikeApi(id, button, likes, removeLike) {
  removeLike(id)
    .then((res) => {
      button.classList.remove("card__like-button_is-active");
      likes.textContent = res.likes.length;
    })
    .catch((err) => console.log(`Ошибка.....: ${err}`));
}
