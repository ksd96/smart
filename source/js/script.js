'use strict';
// -------------------   Гармошка в подвале сайта  ----------------------------------

const footerButtons = document.querySelectorAll(`.footer__button`);
const footerLists = document.querySelectorAll(`.footer__item`);

function classToggle(element, firstClass, lastClass) {
  element.classList.toggle(`${firstClass}`);
  element.classList.toggle(`${lastClass}`);
}

footerButtons.forEach((button) => {
  button.addEventListener(`click`, (evt) => {
    if(button.classList.contains(`footer__button_closed`)) {
      footerButtons.forEach((item) => {
        if(item.classList.contains(`footer__button_opened`)) {
          classToggle(item, `footer__button_closed`, `footer__button_opened`);
        }
      });
      footerLists.forEach((list) => {
        if(list.classList.contains(`footer__item_opened`)) {
          classToggle(list, `footer__item_closed`, `footer__item_opened`);
        }
      });
    };
    classToggle(button, `footer__button_closed`, `footer__button_opened`);

    const list = evt.target.parentElement.parentElement.querySelector(`.footer__item`);
    classToggle(list, `footer__item_closed`, `footer__item_opened`);
  });
});


// ---------------------  Валидация формы  ------------------------------------

const buttonSubmit = document.querySelector(`.form__submit`);
const form = document.querySelector(`.form`);
const inputPhone = document.querySelector(`.form__item_type_phone`);
const inputName = document.querySelector(`.form__item_type_name`);
const invalidText = document.querySelector(`.form__invalid-text`);
const question = document.querySelector(`.form__question`);
const checkbox = document.querySelector(`.form__checkbox-item`);

inputPhone.addEventListener(`focus`, () => {
  if (inputPhone.value === ``) {
    inputPhone.value = `+7(`;
  }
  inputPhone.addEventListener(`blur`, () => {
    if(inputPhone.value === `+7(`) {
      inputPhone.value = ``;
    }
  });
  inputPhone.addEventListener(`keyup`, (evt) => {
    if(inputPhone.value.length === 6 && evt.key !== `Backspace` ) {
      inputPhone.value = `${inputPhone.value})`;
    }
  })
});


form.addEventListener(`submit`, (evt) => {
  evt.preventDefault();
  if(inputPhone.value.length < 14 || !checkbox.checked) {
    if (!invalidText.classList.contains(`form__invalid-text_active`)) {
      invalidText.classList.add(`form__invalid-text_active`);
    }
  } else {
    localStorage.setItem(`phone`, inputPhone.value);
    localStorage.setItem(`name`, inputName.value);
    localStorage.setItem(`question`, question.value);
    inputPhone.value = ``;
    inputName.value = ``;
    question.value = ``;
    if(invalidText.classList.contains(`form__invalid-text_active`)) {
      invalidText.classList.remove(`form__invalid-text_active`);
    }
  }
});
