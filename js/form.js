'use strict';

(function () {
  var formElement = document.querySelector('.ad-form');
  var elements = {
    title: formElement.querySelector('#title'),
    address: formElement.querySelector('#address'),
    type: formElement.querySelector('#type'),
    price: formElement.querySelector('#price'),
    timein: formElement.querySelector('#timein'),
    timeout: formElement.querySelector('#timeout'),
  };

  window.form = {
    fields: {
      title: {
        value: '',
      },
    },
    get title() {
      return this.fields.title.value;
    },
    set title(value) {
      this.fields.title.value = value;
    },
    handleInputChange: function (evt) {
      var target = evt.target;
      // Вот тут замутить словарик
      // И модули захуярить можно
      this.title = evt.target.value;
      console.log(this.title);
    },
    init: function () {
      elements.title.addEventListener('input', this.handleInputChange.bind(this));
    },
    activateForm: function () {
      formElement.classList.remove('ad-form--disabled');
    },
  };
})();
