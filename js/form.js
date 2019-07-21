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
      title: '',
      address: '',
      type: '',
      price: '',
      timein: '',
      timeout: '',
    },
    get title() {
      return this.fields.title;
    },
    set title(value) {
      elements.title.value = value;
      this.fields.title = value;
      elements.title.setCustomValidity(window.validation.validateTitle(this.title));
    },
    get address() {
      return this.fields.address;
    },
    set address(value) {
      elements.address.value = value;
      this.fields.address = value;
      elements.address.setCustomValidity(window.validation.validateAddress(this.address));
    },
    get type() {
      return this.fields.type;
    },
    set type(value) {
      elements.type.value = value;
      this.fields.type = value;
      elements.type.setCustomValidity(window.validation.validateType(this.type));
    },
    get price() {
      return this.fields.price;
    },
    set price(value) {
      elements.price.value = value;
      this.fields.price = value;
      elements.price.setCustomValidity(window.validation.validatePrice(this.price, this.type));
    },
    get timein() {
      return this.fields.timein;
    },
    set timein(value) {
      elements.timein.value = value;
      this.fields.timein = value;
    },
    get timeout() {
      return this.fields.timeout;
    },
    set timeout(value) {
      elements.timeout.value = value;
      this.fields.timeout = value;
    },
    /**
     * Обработчик обновления значения элемента формы
     * @param {Object} evt Объект события
     */
    handleInputChange: function (evt) {
      var target = evt.target;
      var id = target.id;
      this[id] = target.value;
    },
    /**
     * Задает одинаковое значение инпутам времени при их изменении
     * @param {Object} evt Объект события
     */
    handleTimeChange: function (evt) {
      var target = evt.target;
      var value = target.value;
      if (target === elements.timein) {
        this.timeout = value;
      } else {
        this.timein = value;
      }
    },
    /**
     * Меняет плейсхолдер цены в зависимости от типа жилья
     */
    handleTypeChange: function () {
      switch (elements.type.value) {
        case 'palace':
          elements.price.placeholder = window.config.MinPrices['palace'];
          break;
        case 'flat':
          elements.price.placeholder = window.config.MinPrices['flat'];
          break;
        case 'house':
          elements.price.placeholder = window.config.MinPrices['house'];
          break;
        case 'bungalo':
          elements.price.placeholder = window.config.MinPrices['bungalo'];
          break;
      }
    },
    /**
     * Добавляет обработчики на инпуты
     */
    addInputListeners: function () {
      elements.title.addEventListener('input', this.handleInputChange.bind(this));
      elements.type.addEventListener('change', this.handleInputChange.bind(this));
      elements.type.addEventListener('change', this.handleTypeChange.bind(this));
      elements.price.addEventListener('input', this.handleInputChange.bind(this));
      elements.timein.addEventListener('change', this.handleInputChange.bind(this));
      elements.timein.addEventListener('change', this.handleTimeChange.bind(this));
      elements.timeout.addEventListener('change', this.handleInputChange.bind(this));
      elements.timeout.addEventListener('change', this.handleTimeChange.bind(this));
    },
    /**
     * Активирует форму
     */
    activateForm: function () {
      formElement.classList.remove('ad-form--disabled');
    },
    /**
     * Собирает значения полей из разметки и записывает в стейт
     */
    setFieldsFromMarkup: function () {
      for (var element in elements) {
        if (elements.hasOwnProperty(element)) {
          this[element] = elements[element].value;
        }
      }
    },
    /**
     * Инициализирует форму
     */
    init: function () {
      this.addInputListeners();
      this.setFieldsFromMarkup();
    },
  };
})();
