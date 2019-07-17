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
      address: {
        value: '',
      },
      type: {
        value: '',
      },
      price: {
        value: '',
      },
      timein: {
        value: '',
      },
      timeout: {
        value: '',
      },
    },
    get title() {
      return this.fields.title.value;
    },
    set title(value) {
      this.fields.title.value = value;
    },
    get address() {
      return this.fields.address.value;
    },
    set address(value) {
      this.fields.address.value = value;
    },
    get type() {
      return this.fields.type.value;
    },
    set type(value) {
      this.fields.type.value = value;
    },
    get price() {
      return this.fields.price.value;
    },
    set price(value) {
      this.fields.price.value = value;
    },
    get timein() {
      return this.fields.timein.value;
    },
    set timein(value) {
      this.fields.timein.value = value;
    },
    get timeout() {
      return this.fields.timeout.value;
    },
    set timeout(value) {
      this.fields.timeout.value = value;
    },
    /**
     * Обработчик обновления значения элемента формы
     * @param {Object} evt Объект события
     */
    handleInputChange: function (evt) {
      var target = evt.target;
      var id = target.id;
      this[id] = target.value;
      console.log(this[id]);
    },
    /**
     * Добавляет обработчики на инпуты
     */
    addInputListeners: function () {
      elements.title.addEventListener('input', this.handleInputChange.bind(this));
      elements.address.addEventListener('change', this.handleInputChange.bind(this));
      elements.type.addEventListener('change', this.handleInputChange.bind(this));
      elements.price.addEventListener('input', this.handleInputChange.bind(this));
      elements.timein.addEventListener('change', this.handleInputChange.bind(this));
      elements.timeout.addEventListener('change', this.handleInputChange.bind(this));
    },
    /**
     * Активирует форму
     */
    activateForm: function () {
      formElement.classList.remove('ad-form--disabled');
    },
    /**
     * Инициализирует форму
     */
    init: function () {
      this.addInputListeners();
    },
  };
})();
