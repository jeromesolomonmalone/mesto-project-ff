//Главные ссылка и пароль, главный конфиг
const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-18",
  headers: {
    authorization: "4c84455c-b37c-4017-b90f-e1abc3cb4dd2",
    "Content-Type": "application/json",
  },
};

//Если с ответом от сервера все ОК, то возращается результат, если нет - то отображается ошибка
const handleResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
};

//Функция-константа с получением данных о пользователе
export const getDataProfile = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  }).then(handleResponse);
};

//Функция-константа с получением данных о картах
export const getDataCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  }).then(handleResponse);
};

//Функция-константа с пересохранением данных ИМЕНИ и ПОДРОБНЕЕ
export const saveProfileApi = (data) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify(data),
  });
};

//Функция-константа с передачей на сервер данных карточки
export const addNewApiCard = (data) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify(data),
  }).then(handleResponse);
};

//Функция-константа с удалением карточки с сервера
export const deleteCardApi = (cardID) => {
  return fetch(`${config.baseUrl}/cards/${cardID}`, {
    method: "DELETE",
    headers: config.headers,
  }).then(handleResponse);
};

//Функция-константа с добавлением в массив LIKES лайка от меня
export const addLike = (cardID) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardID}`, {
    method: "PUT",
    headers: config.headers,
  }).then(handleResponse);
};

//Функция-константа с удалением из массива LIKES лайка от меня
export const removeLike = (cardID) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardID}`, {
    method: "DELETE",
    headers: config.headers,
  }).then(handleResponse);
};

//Функция-константа с пересохранением ссылки АВАТАРА
export const saveAvatarApi = (data) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify(data),
  });
};
