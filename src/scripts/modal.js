// Функция добавления попапам класса открытия
export function openPopup(popupElement) {
  popupElement.classList.add("popup_is-opened");
  document.addEventListener("keydown", closePopupByEsc);
}

// Функция перебора элементов с последующим наложением на каждый функцию,
//которая убирает класс с элементов
export function closePopup(popupElement) {
  popupElement.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closePopupByEsc);
}

// Слушатель на весь документ, если конпка Escape и у попапа класс открытия, то попап закрывается
function closePopupByEsc(evt) {
  if (evt.key === "Escape") {
    closePopup(document.querySelector(".popup_is-opened"));
  }
}

// Функция, которая убирает класс с элементов, если нажатие вне попапа на оверлей
export function addCloseOverlayListener(element) {
  element.addEventListener("click", function (e) {
    if (e.target === e.currentTarget) {
      closePopup(e.currentTarget);
    }
  });
}
