// class Popup {
// constructor(className);
// this.className = className;
// }



// Попап добавления кота

const addBtn = document.querySelector("#add");
const popupForm = document.querySelector("#popup-form");
const closePopupForm = popupForm.querySelector(".popup-close");
const cardsContainer = document.querySelector(".cards");
// Действие по клику (открытие попапа)
addBtn.addEventListener("click", (e) => {
  e.preventDefault();

  // Проверка не имеет ли popupForm класс active и его добавление в случае отсутствия
  if (!popupForm.classList.contains("active")) {
    popupForm.classList.add("active");
    popupForm.parentElement.classList.add("active");
  }
});
// Убираем класс active по закрытию
closePopupForm.addEventListener("click", () => {
  popupForm.classList.remove("active");
  popupForm.parentElement.classList.remove("active");
});


// Попап полученияя куки "авторизации"

const loginBtn = document.querySelector("#cookieget");
const popupUser = document.querySelector("#popup-form-user");
const closePopupUser = document.querySelector(".closePopupUser");
const SaveCokieBtn = document.querySelector("#save-cookie-btn");
// Действие по клику (открытие попапа)
loginBtn.addEventListener("click", (user) => {
  user.preventDefault();

  // Проверка 
  if (!popupUser.classList.contains("active")) {
    popupUser.classList.add("active");
    popupUser.parentElement.classList.add("active");
  }
});
// Убираем класс active по закрытию
closePopupUser.addEventListener("click", () => {
  popupUser.classList.remove("active");
  popupUser.parentElement.classList.remove("active");
});

// Ввод куки
function SetCookie() {
const UserLoginValue = document.querySelector("#user-login").value;
const UserPasswordValue = document.querySelector("#user-password").value;
document.cookie = `UserName=${UserLoginValue}; samesite=strict; max-age=360;`;
document.cookie = `UserPassword=${UserPasswordValue}; samesite=strict; max-age=360;`;  
};
SaveCokieBtn.onclick= SetCookie;

// Дополнительная проверка записи

function checkACookieUser() {
  if  (document.cookie.split(';').some((item) => item.trim().startsWith('UserName=')))
 {
    alert("Куки уже записаны, при повторной отправке произойдет перезапись");
    console.log("Куки уже записаны, при повторной отправке произойдет перезапись");
  } else {
    console.log("Печенек нет");
  }
}

loginBtn.onclick = checkACookieUser;