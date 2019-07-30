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

  var form = {
    fields: {
      title: '',
      address: '',
      type: '',
      price: '',
      timein: '',
      timeout: '',
    },

    /**
     * Геттер поля заголовка
     * @readonly
     */
    get title() {
      return this.fields.title;
    },

    /**
     * Сеттер поля заголовка
     * @param {string} value Передаваемое значение
     */
    set title(value) {
      var validateTitle = window.validation.validateTitle;

      elements.title.value = value;
      this.fields.title = value;
      elements.title.setCustomValidity(validateTitle(this.title));
    },

    /**
     * Геттер поля адреса
     * @readonly
     */
    get address() {
      return this.fields.address;
    },

    /**
     * Сеттер поля адреса
     * @param {string} value Передаваемое значение
     */
    set address(value) {
      elements.address.value = value;
      this.fields.address = value;
    },

    /**
     * Геттер поля типа жилья
     * @readonly
     */
    get type() {
      return this.fields.type;
    },

    /**
     * Сеттер поля типа жилья
     * @param {string} value Передаваемое значение
     */
    set type(value) {
      var validateType = window.validation.validateType;

      elements.type.value = value;
      this.fields.type = value;
      elements.type.setCustomValidity(validateType(this.type));
    },

    /**
     * Геттер поля цены
     * @readonly
     */
    get price() {
      return this.fields.price;
    },

    /**
     * Сеттер поля цены
     * @param {string} value Передаваемое значение
     */
    set price(value) {
      var validatePrice = window.validation.validatePrice;

      elements.price.value = value;
      this.fields.price = value;
      elements.price.setCustomValidity(validatePrice(this.price, this.type));
    },

    /**
     * Геттер поля времени заезда
     * @readonly
     */
    get timein() {
      return this.fields.timein;
    },

    /**
     * Сеттер поля времени заезда
     * @param {string} value Передаваемое значение
     */
    set timein(value) {
      elements.timein.value = value;
      this.fields.timein = value;
    },

    /**
     * Геттер поля времени выезда
     * @readonly
     */
    get timeout() {
      return this.fields.timeout;
    },

    /**
     * Сеттер поля времени выезда
     * @param {string} value Передаваемое значение
     */
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
      var value = evt.target.value;
      this.timeout = value;
      this.timein = value;
    },

    /**
     * Меняет плейсхолдер цены в зависимости от типа жилья
     */
    handleTypeChange: function () {
      var type = elements.type.value.toUpperCase();
      elements.price.placeholder = window.config.MinPrices[type];
    },

    /**
     * Добавляет обработчики на инпуты
     */
    addInputListeners: function () {
      elements.title.addEventListener('input', handleInputChange);
      elements.type.addEventListener('change', handleInputChange);
      elements.type.addEventListener('change', handleTypeChange);
      elements.price.addEventListener('input', handleInputChange);
      elements.timein.addEventListener('change', handleTimeChange);
      elements.timeout.addEventListener('change', handleTimeChange);
    },

    /**
     * Удаляет обработчики с инпутов
     */
    removeInputListeners: function () {
      elements.title.removeEventListener('input', handleInputChange);
      elements.type.removeEventListener('change', handleInputChange);
      elements.type.removeEventListener('change', handleTypeChange);
      elements.price.removeEventListener('input', handleInputChange);
      elements.timein.removeEventListener('change', handleTimeChange);
      elements.timeout.removeEventListener('change', handleTimeChange);
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

  var handleInputChange = form.handleInputChange.bind(form);
  var handleTypeChange = form.handleTypeChange.bind(form);
  var handleTimeChange = form.handleTimeChange.bind(form);

  window.form = form;
})();
