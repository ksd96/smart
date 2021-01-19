'use strict';

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
