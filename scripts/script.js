let api = new Api("alandrajh-cats"); // Имя из постмана

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

// Добавление котов в базу по сабмиту

let form = document.forms[0];
form.img_link.addEventListener("change", (e) => {
  form.firstElementChild.style.backgroundImage = `url(${e.target.value})`;
});
form.img_link.addEventListener("input", (e) => {
  form.firstElementChild.style.backgroundImage = `url(${e.target.value})`;
});
form.addEventListener("submit", (e) => {
  e.preventDefault();
  let body = {};
  for (let i = 0; i < form.elements.length; i++) {
    let inp = form.elements[i];
    if (inp.type === "checkbox") { //Проверка типов чекбоксов
      body[inp.name] = inp.checked;
    } else if (inp.name && inp.value) {
      if (inp.type === "number") {
        body[inp.name] = +inp.value;
      } else {
        body[inp.name] = inp.value;
      }
    }
  }
  console.log(body);
  api
    .addCat(body)
    .then((res) => res.json())
    .then((data) => {
      if (data.message === "ok") {
        form.reset();
        closePopupForm.click();
        api
          .getCat(body.id)
          .then((res) => res.json())
          .then((cat) => {
            if (cat.message === "ok") {
              catsData.push(cat.data);
              localStorage.setItem("cats", JSON.stringify(catsData));

              getCats(api, catsData);
            } else {
              console.log(cat);
            }
          });
      } else {
        console.log(data);
        api
          .getIds()
          .then((r) => r.json())
          .then((d) => console.log(d));
      }
    });
});

// // Рендеринг котов // like (функция передается в качестве аргумента, циклу вывода (перебора) метод forEach все это обернуто в функцию)
let main = document.querySelector("main");

const updCards = function (data) {
  main.innerHTML = "";
  data.forEach(function (cat) {
    if (cat.id) {
      let card = `<div class="${
        cat.favourite ? "card like" : "card"
      }" style="background-image:
  url(${cat.img_link || "images/cat.jpeg"})">
  <span class="cats-title">${cat.name}</span>
  </div>`;
      main.innerHTML += card;
    }
  });
  // Адаптация пропорций карточек под картинку
  let cards = document.getElementsByClassName("card");
  for (let i = 0, count = cards.length; i < count; i++) {
    const width = cards[i].offsetWidth;
    cards[i].style.height = width * 0.7 + "px";
  }
};

// Получение данных о котах
let catsData = localStorage.getItem("cats");
catsData = catsData ? JSON.parse(catsData) : [];

const getCats = function (api, store) {
  if (!store.length) {
    api
      .getCats()
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.message === "ok") {
          localStorage.setItem("cats", JSON.stringify(data.data));
          catsData = [...data.data];
          updCards(data.data);
        }
      });
  } else {
    updCards(store);
  }
};
getCats(api, catsData);
