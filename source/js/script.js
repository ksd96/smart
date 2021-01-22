'use strict';
// -------------------   Гармошка в подвале сайта  ----------------------------------

const footerButtons = document.querySelectorAll(`.footer__button`);
const footerLists = document.querySelectorAll(`.footer__item`);

footerLists.forEach((item) => {
  item.classList.add(`footer__item_closed`);
})

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


// ---------------------  Формы  ------------------------------------

const formQuestions = document.querySelector(`.form_type_questions`);
const formPopup = document.querySelector(`.form_type_popup`)
const buttonPopupOpen = document.querySelector(`.header__button`);
const buttonPopupClose = document.querySelector(`.form__button-close`);
const popup = document.querySelector(`.popup`);
const name = document.querySelector(`.form__item_name-popup`);

function focusPhone(form) {
  const phone = form.querySelector(`[name="phone"]`);

  phone.addEventListener('keydown', function(event) {
    if ( event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 27 || (event.keyCode == 65 && event.ctrlKey === true) || (event.keyCode >= 35 && event.keyCode <= 39)) {
      return;
    } else {
      if ((event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105 )) {
        event.preventDefault();
      }
    }
  });

  phone.addEventListener(`focus`, () => {
    if (phone.value === ``) {
      phone.value = `+7(`;
    }
    phone.addEventListener(`blur`, () => {
      if(phone.value === `+7(`) {
        phone.value = ``;
      }
    });
    phone.addEventListener(`keyup`, (evt) => {
      if(phone.value.length === 6 && evt.key !== `Backspace` ) {
        phone.value = `${phone.value})`;
      }
    })
  });
}

function questionSubmit(form) {
  const name = form.querySelector(`[name="name"]`);
  const phone = form.querySelector(`[name="phone"]`);
  const question = form.querySelector(`[name="question"]`);
  const checkbox = form.querySelector(`.form__checkbox-item`);
  const invalidText = form.querySelector(`.form__invalid-text`);

  if(phone.value.length < 14 || !checkbox.checked) {
    if (!invalidText.classList.contains(`form__invalid-text_active`)) {
      invalidText.classList.add(`form__invalid-text_active`);
    }
  } else {
    localStorage.setItem(`phone`, phone.value);
    localStorage.setItem(`name`, name.value);
    localStorage.setItem(`question`, question.value);
    phone.value = ``;
    name.value = ``;
    question.value = ``;
    if(invalidText.classList.contains(`form__invalid-text_active`)) {
      invalidText.classList.remove(`form__invalid-text_active`);
    }
  }
};

function openPopup() {
  popup.classList.add(`popup_opened`);
  name.focus();
}

function closePopup() {
  popup.classList.remove(`popup_opened`);
}

focusPhone(formQuestions);
focusPhone(formPopup);

formQuestions.addEventListener(`submit`, (evt) => {
    evt.preventDefault();
    questionSubmit(formQuestions);
  }
);

formPopup.addEventListener(`submit`, (evt) => {
  evt.preventDefault();
  questionSubmit(formPopup);
}
);

buttonPopupOpen.addEventListener(`click`, openPopup);
buttonPopupClose.addEventListener(`click`, closePopup);

popup.addEventListener('click', (event) => {
  if (event.target === event.currentTarget) {
    closePopup();
  }
});

window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    if(popup.classList.contains(`popup_opened`)) {
      closePopup();
    }
  }
});

// ---------------------------- Скролл -------------------------------------

const buttonDown = document.querySelector(`.intro__button-down`);
const buttonForQuestions = document.querySelector(`.intro__button`);
const containerAdvantages = document.querySelector(`.advantages`);
const containerQuestions = document.querySelector(`.questions`);

function handleButtonClick(section) {
  section.scrollIntoView({block: "center", behavior: "smooth"});
}

buttonDown.addEventListener('click', () => {
  handleButtonClick(containerAdvantages);
});

buttonForQuestions.addEventListener('click', () => {
  handleButtonClick(containerQuestions);
});
