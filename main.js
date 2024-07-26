(()=>{"use strict";var e=document.querySelector("#card-template").content;function t(t,n,o,r,c,a,i,u){var l=e.querySelector(".places__item").cloneNode(!0);l.querySelector(".card__image").src=t.link,l.querySelector(".card__image").alt=t.name,l.querySelector(".card__title").textContent=t.name;var s=l.querySelector(".number__likes");s.textContent=t.likes.length;var d=l.querySelector(".card__delete-button");n!==t.owner._id&&d.remove(),d.addEventListener("click",(function(){!function(e,t,n){n(e).then((function(){t.remove()})).catch((function(e){return console.log("Ошибка.....: ".concat(e))}))}(t._id,l,u)}));var p=l.querySelector(".card__like-button");return t.likes.some((function(e){return e._id===n}))&&p.classList.add("card__like-button_is-active"),p.addEventListener("click",(function(){p.classList.contains("card__like-button_is-active")?r(t._id,p,s,a):o(t._id,p,s,c)})),l.querySelector(".card__image").addEventListener("click",(function(){i(t)})),l}function n(e,t,n,o){o(e).then((function(e){t.classList.add("card__like-button_is-active"),n.textContent=e.likes.length})).catch((function(e){return console.log("Ошибка.....: ".concat(e))}))}function o(e,t,n,o){o(e).then((function(e){t.classList.remove("card__like-button_is-active"),n.textContent=e.likes.length})).catch((function(e){return console.log("Ошибка.....: ".concat(e))}))}function r(e){e.classList.add("popup_is-opened"),document.addEventListener("keydown",a)}function c(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",a)}function a(e){"Escape"===e.key&&c(document.querySelector(".popup_is-opened"))}var i,u={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"},l=function(e,t,n){var o=n.inactiveButtonClass;!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?(t.classList.remove(o),t.disabled=!1):(t.classList.add(o),t.disabled=!0)},s=function(e,t){var n=t.inputSelector,o=t.inputErrorClass,r=t.errorClass,c=t.inactiveButtonClass,a=t.submitButtonSelector;e.querySelectorAll(n).forEach((function(t){t.classList.remove(o),t.setCustomValidity("");var n=e.querySelector(".".concat(t.id,"-error"));n.classList.remove(r),n.textContent=""})),e.querySelector(a).classList.add(c)},d={baseUrl:"https://nomoreparties.co/v1/wff-cohort-18",headers:{authorization:"4c84455c-b37c-4017-b90f-e1abc3cb4dd2","Content-Type":"application/json"}},p=function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))},f=function(e){return fetch("".concat(d.baseUrl,"/cards/").concat(e),{method:"DELETE",headers:d.headers}).then(p)},m=function(e){return fetch("".concat(d.baseUrl,"/cards/likes/").concat(e),{method:"PUT",headers:d.headers}).then(p)},_=function(e){return fetch("".concat(d.baseUrl,"/cards/likes/").concat(e),{method:"DELETE",headers:d.headers}).then(p)},v=document.querySelector(".places__list"),h=document.querySelector(".profile__edit-button"),y=document.querySelector(".profile__add-button"),S=document.querySelector(".popup_type_edit"),b=document.querySelector(".popup_type_new-card"),q=document.querySelector(".popup_type_edit-avatar"),C=document.querySelectorAll(".popup__close"),E=document.querySelectorAll(".popup"),L=document.forms["edit-profile"],g=L.elements.name,k=L.elements.description,x=document.querySelector(".profile__title"),U=document.querySelector(".profile__description"),A=document.forms["new-place"],T=A.elements["place-name"],w=A.elements.link,B=document.querySelector(".popup_type_image"),D=document.querySelector(".profile__image"),P=document.querySelector(".button_edit-profile"),N=document.querySelector(".button_new-place"),O=document.querySelector(".button_edit-avatar"),V=document.forms["edit-avatar"],j=V.elements.avatar,J=null;function M(e){B.querySelector(".popup__image").src=e.link,B.querySelector(".popup__image").alt=e.name,B.querySelector(".popup__caption").textContent=e.name,r(B)}function H(e,t){t.textContent=e?"Сохранение...":"Сохранить"}Promise.all([fetch("".concat(d.baseUrl,"/users/me"),{headers:d.headers}).then(p),fetch("".concat(d.baseUrl,"/cards"),{headers:d.headers}).then(p)]).then((function(e){var r=e[0];x.textContent=r.name,U.textContent=r.about,D.style.backgroundImage="url("+r.avatar+")",g.value=x.textContent,k.value=U.textContent,j.value=r.avatar,J=r._id,e[1].forEach((function(e){v.append(t(e,J,n,o,m,_,M,f))}))})).catch((function(e){console.log(e)})),E.forEach((function(e){e.classList.add("popup_is-animated")})),h.addEventListener("click",(function(){g.value=x.textContent,k.value=U.textContent,r(S),s(L,u)})),y.addEventListener("click",(function(){r(b)})),D.addEventListener("click",(function(){r(q)})),C.forEach((function(e){e.addEventListener("click",(function(){E.forEach(c)}))})),E.forEach((function(e){e.addEventListener("click",(function(e){e.target===e.currentTarget&&c(e.currentTarget)}))})),L.addEventListener("submit",(function(e){var t;e.preventDefault(),(t={name:g.value,about:k.value},fetch("".concat(d.baseUrl,"/users/me"),{method:"PATCH",headers:d.headers,body:JSON.stringify(t)})).then((function(e){H(!0,P),x.textContent=g.value,U.textContent=k.value})).catch((function(e){return console.log("Ошибка.....: ".concat(e))})).finally((function(){H(!1,P),c(S)}))})),A.addEventListener("submit",(function(e){var r;e.preventDefault(),(r={name:T.value,link:w.value},fetch("".concat(d.baseUrl,"/cards"),{method:"POST",headers:d.headers,body:JSON.stringify(r)}).then(p)).then((function(e){H(!0,N),v.prepend(t(e,J,n,o,m,_,M,f))})).catch((function(e){return console.log("Ошибка.....: ".concat(e))})).finally((function(){H(!1,N),e.target.reset(),s(A,u),c(b)}))})),V.addEventListener("submit",(function(e){var t;e.preventDefault(),(t={avatar:j.value},fetch("".concat(d.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:d.headers,body:JSON.stringify(t)})).then((function(){H(!0,O),D.style.backgroundImage="url("+j.value+")"})).catch((function(e){return console.log("Ошибка.....: ".concat(e))})).finally((function(){H(!1,O),c(q)}))})),i=u.formSelector,Array.from(document.querySelectorAll(i)).forEach((function(e){e.addEventListener("submit",(function(e){e.preventDefault()})),function(e,t){var n=t.inputSelector,o=t.submitButtonSelector,r=Array.from(e.querySelectorAll(n)),c=e.querySelector(o);l(r,c,u),r.forEach((function(t){t.addEventListener("input",(function(){!function(e,t,n){var o=n.inputErrorClass,r=n.errorClass;t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity(""),t.validity.valid?function(e,t,n,o){var r=e.querySelector(".".concat(t.id,"-error"));t.classList.remove(n),t.setCustomValidity(""),r.classList.remove(o),r.textContent=""}(e,t,o,r):function(e,t,n,o,r){var c=e.querySelector(".".concat(t.id,"-error"));t.classList.add(o),c.textContent=n,c.classList.add(r)}(e,t,t.validationMessage,o,r)}(e,t,u),l(r,c,u)}))}))}(e,u)}))})();
//# sourceMappingURL=main.js.map