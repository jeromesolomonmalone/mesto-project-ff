import { popup } from ".";

// Функция добавления попапам класса открытия
export function openPopup(popupElement) {
  popupElement.classList.add("popup_is-opened");
}

// Функция перебора элементов с последующим наложением на каждый функцию,
//которая убирает класс с элементов
export function closePopup(element) {
  element.forEach(function (item) {
    item.classList.remove("popup_is-opened");
  });
}

// Слушатель на весь документ, если конпка Escape и у попапа класс открытия, то попап закрывается
document.addEventListener("keydown", function (evt) {
  if (evt.key === "Escape") {
    popup.forEach(function (element) {
      if (element.classList.contains("popup_is-opened")) {
        closePopup(popup);
      }
    });
  }
});

// Функция, которая убирает класс с элементов, если нажатие вне попапа на оверлей
export function closeOverlay(element) {
  element.addEventListener("click", function (e) {
    if (e.target === e.currentTarget) {
      closePopup(popup);
    }
  });
}
