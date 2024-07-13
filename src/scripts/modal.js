// Функция добавления попапам класса открытия
export function openPopup(popupElement) {
  popupElement.classList.add("popup_is-opened");
}

// Функция перебора элементов с последующим наложением на каждый функцию,
//которая убирает класс с элементов
export function closePopup(popupElement) {
  popupElement.classList.remove("popup_is-opened");
}

// Слушатель на весь документ, если конпка Escape и у попапа класс открытия, то попап закрывается
document.addEventListener("keydown", function (evt) {
  if (evt.key === "Escape") {
    closePopup(document.querySelector(".popup_is-opened"));
  }
});

// Функция, которая убирает класс с элементов, если нажатие вне попапа на оверлей
export function addCloseOverlayListener(element) {
  element.addEventListener("click", function (e) {
    if (e.target === e.currentTarget) {
      closePopup(e.currentTarget);
    }
  });
}
