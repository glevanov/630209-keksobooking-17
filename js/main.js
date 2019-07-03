'use strict';

var MIN_Y = 130;
var MAX_Y = 630;
var MAP_WIDTH = 1200;
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
var PIN_CENTER_OFFSET = 26;
var PIN_X_OFFSET = -(PIN_WIDTH / 2);
var PIN_Y_OFFSET = -(PIN_HEIGHT);
var PINS_QUANTITY = 8;
var VALID_TYPES = [
  'palace',
  'flat',
  'house',
  'bungalo',
];
var VALID_TIMES = [
  '12:00',
  '13:00',
  '14:00',
];
var MAX_PRICE = 1000000;
var VALIDATION_SUCCESS_CODE = '';

/**
 * Возвращает случайное число в заданном диапазоне
 * @param {number} min Минимальное значение
 * @param {number} max Максимальное значение
 * @return {number}
 */
var getRandomInteger = function (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

/**
 * Переводит число в строку и добавляет ведущий ноль если нужно
 * @param {number} n Число
 * @return {string}
 */
var getLeadingZeroString = function (n) {
  return n >= 10
    ? n.toString()
    : '0' + n.toString();
};

/**
 * Возвращает случайный тип из набора типов
 * @return {string}
 */
var getType = function () {
  var types = [
    'palace',
    'flat',
    'house',
    'bungalo',
  ];

  return types[getRandomInteger(0, types.length - 1)];
};

/**
 * Описывает объект с тестовыми данными
 * @constructor
 */
function Item() {
  this.author = {
    avatar: 'img/avatars/user' + getLeadingZeroString(getRandomInteger(1, 8)) + '.png',
  };
  this.offer = {
    type: getType(),
  };
  this.location = {
    x: getRandomInteger(0, MAP_WIDTH),
    y: getRandomInteger(MIN_Y, MAX_Y),
  };
}

/**
 * Возвращает массив тестовых данных
 * @return {array}
 */
var getMockData = function () {
  var pins = [];
  for (var i = 0; i < PINS_QUANTITY; i++) {
    pins.push(new Item());
  }
  return pins;
};

/**
 * Задает необходимые пину параметры
 * @param {Node} template Шаблон пина
 * @param {object} data Данные для пина в виде объекта
 * @return {Node}
 */
var setPinProperties = function (template, data) {
  var pin = template.cloneNode(true).querySelector('.map__pin');
  var image = pin.querySelector('img');
  var elementX = data.location.x + PIN_X_OFFSET;
  var elementY = data.location.y + PIN_Y_OFFSET;

  pin.style = 'left: ' + elementX + 'px; top: ' + elementY + 'px;';
  image.src = data.author.avatar;
  image.alt = 'заголовок объявления';

  return pin;
};

/**
 * Возвращает NodeList пинов с данными в виде фрагмента
 * @param {array} data Массив данных меток
 * @return {Node}
 */
var getTemplatePins = function (data) {
  var fragment = document.createDocumentFragment();
  var template = document.querySelector('#pin').content;

  data.forEach(function (item) {
    fragment.appendChild(setPinProperties(template, item));
  });

  return fragment;
};

/**
 * Вставляет пины на карту
 */
var insertPins = function () {
  var container = map.querySelector('.map__pins');
  container.appendChild(getTemplatePins(getMockData()));
};

/**
 * Активирует карту и форму
 */
var activateControls = function () {
  map.classList.remove('map--faded');
  form.activateForm();
  controls.forEach(function (control) {
    control.disabled = false;
  });
};

/**
 * Задает адрес в поле адреса
 */
var setAddress = function () {
  var target = pin.getBoundingClientRect();
  var X = target.left + PIN_CENTER_OFFSET;
  var Y = target.top + PIN_CENTER_OFFSET;
  var result = X + ', ' + Y;
  form.updateAddress(result);
};

/**
 * Обрабатывает клин на пин и активирует карту
 */
var onPinClick = function () {
  if (!isMapActive) {
    activateControls();
    insertPins();
    setAddress();
    isMapActive = true;
  }
};

var map = document.querySelector('.map');
var pin = map.querySelector('.map__pin--main');
var controls = Array.from(document.querySelectorAll('.map__filter, .map__features, .ad-form fieldset'));
var isMapActive = false;
var MinPrices = {
  bungalo: 0,
  flat: 1000,
  house: 5000,
  palace: 10000,
};

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
  state: {
    values: {
      title: '',
      address: '',
      type: '',
      price: '',
      timein: '',
      timeout: '',
    },
    readyToSubmit: false,
  },
  /**
   * Геттер значений элемента формы
   * @param {string} key Название ключа с элементом формы
   * @return {string}
   */
  getValue: function (key) {
    return this.state.values[key];
  },
  /**
   * Сеттер значений элемента формы
   * @param {string} key Название ключа с элементом формы
   * @param {string} value Значение для записи в элемент формы
   */
  setValue: function (key, value) {
    this.state.values[key] = value;
  },
  /**
   * Геттер значения готовности формы к отправке
   * @return {boolean}
   */
  getReadyToSubmit: function () {
    return this.state.readyToSubmit;
  },
  /**
   * Сеттер значения готовности формы к отправке
   * @param {boolean} value Название элемента формы
   */
  setReadyToSubmit: function (value) {
    this.state.readyToSubmit = value;
  },
  /**
   * Обновляет значение элемента формы
   * @param {Object} input Элемент формы
   */
  updateInput: function (input) {
    input.value = this.getValue(input.id);
  },
  /**
   * Активирует форму
   */
  activateForm: function () {
    formElement.classList.remove('ad-form--disabled');
  },
  /**
   * Обновляет значение адреса
   * @param {string} value Значение адреса
   */
  updateAddress: function (value) {
    var key = 'address';
    elements[key].value = value;
    this.setValue(key, value);
  },
  /**
   * Обработчик обновления значения элемента формы
   * @param {Object} evt Объект события
   */
  handleInputChange: function (evt) {
    var target = evt.target;
    var key = target.id;
    var value = target.value;
    this.setValue(key, value);
    this.updateInput(target);
  },
  /**
   * Задает одинаковое значение инпутам времени при их изменении
   * @param {Object} evt Объект события
   */
  handleTimeChange: function (evt) {
    var target = evt.target;
    var value = target.value;
    if (target === elements.timein) {
      elements.timeout.value = value;
    } else {
      elements.timein.value = value;
    }
  },
  /**
   * Меняет плейсхолдер цены в зависимости от типа жилья
   */
  handleTypeChange: function () {
    switch (elements.type.value) {
      case 'palace':
        elements.price.placeholder = MinPrices['palace'];
        break;
      case 'flat':
        elements.price.placeholder = MinPrices['flat'];
        break;
      case 'house':
        elements.price.placeholder = MinPrices['house'];
        break;
      case 'bungalo':
        elements.price.placeholder = MinPrices['bungalo'];
        break;
    }
  },
  /**
   * Добавляет обработчики на инпуты
   */
  addInputListeners: function () {
    for (var element in elements) {
      if (elements.hasOwnProperty(element)) {
        elements[element].addEventListener('change', this.handleInputChange.bind(this));
      }
    }
    elements.timein.addEventListener('change', this.handleTimeChange.bind(this));
    elements.timeout.addEventListener('change', this.handleTimeChange.bind(this));
    elements.type.addEventListener('change', this.handleTypeChange.bind(this));
  },
  /**
   * Валидирует поле Адреса
   * @param {string} address Значение поля
   * @return {string}
   */
  validateAddress: function (address) {
    var coordinates = address.split(', ');
    var X = parseFloat(coordinates[0]);
    var Y = parseFloat(coordinates[1]);
    if (isNaN(X) || isNaN(Y)) {
      return 'Неверный формат адреса';
    }
    if (Y > MAX_Y || Y < MIN_Y) {
      return 'Неверное значение Y';
    }
    if (X > MAP_WIDTH || X < 0) {
      return 'Неверное значение Y';
    }
    return VALIDATION_SUCCESS_CODE;
  },
  /**
   * Валидирует поле Тип жилья
   * @param {string} type Значение поля
   * @return {string}
   */
  validateType: function (type) {
    if (VALID_TYPES.indexOf(type) === -1) {
      return 'Неверный Тип жилья';
    }
    return VALIDATION_SUCCESS_CODE;
  },
  /**
   * Валидирует поле Цена за ночь
   * @param {string} price Значение поля Цена за ночь
   * @param {string} type Значение поля Тип жилья
   * @return {string}
   */
  validatePrice: function (price, type) {
    if (price.trim().length === 0) {
      return 'Не указана Цена за ночь';
    }

    var priceAsNumber = parseFloat(price);
    if (isNaN(priceAsNumber)) {
      return 'Значение Цены за ночь не является числом';
    }
    if (priceAsNumber > MAX_PRICE) {
      return 'Значение Цены за ночь больше максимального';
    }
    if (priceAsNumber < MinPrices[type]) {
      return 'Значение Цены за ночь меньше минимального';
    }
    return VALIDATION_SUCCESS_CODE;
  },
  /**
   * Валидирует поля Времени заезда и Времени выезда
   * @param {string} timein Значение поля Время заезда
   * @param {string} timeout Значение поля Время выезда
   * @return {string}
   */
  validateTime: function (timein, timeout) {
    var timeinIndex = VALID_TIMES.indexOf(timein);
    var timeoutIndex = VALID_TIMES.indexOf(timeout);
    if (timeinIndex === -1 || timeoutIndex === -1) {
      return 'Неверное значение Времени заезда и Времени выезда';
    }
    if (timeinIndex !== timeoutIndex) {
      return 'Время заезда и Время выезда должны совпадать';
    }
    return VALIDATION_SUCCESS_CODE;
  },
  /**
   * Выводит результаты кастомной валидации
   */
  outputValidation: function () {
    elements.address.setCustomValidity(this.validateAddress(this.state.values.address));
    elements.type.setCustomValidity(this.validateType(this.state.values.type));
    elements.price.setCustomValidity(this.validatePrice(this.state.values.price, this.state.values.type));
    elements.timein.setCustomValidity(this.validateTime(this.state.values.timein, this.state.values.timeout));
    elements.timeout.setCustomValidity(this.validateTime(this.state.values.timein, this.state.values.timeout));
  },
  /**
   * Проверяет все ли поля валидны и делает отправку формы
   */
  switchSubmitFlag: function () {
    var fieldsValidity = [];
    for (var element in elements) {
      if (elements.hasOwnProperty(element)) {
        fieldsValidity.push(elements[element].validity.valid);
      }
    }
    var isEveryThingValid = fieldsValidity.every(function (item) {
      return item === true;
    });
    if (isEveryThingValid) {
      this.setReadyToSubmit(true);
    } else {
      this.setReadyToSubmit(false);
    }
  },
  /**
   * Обработчик отправки формы
   * @param {Object} evt Объект события
   */
  handleSubmit: function (evt) {
    this.outputValidation();
    this.switchSubmitFlag();
    if (!this.getReadyToSubmit()) {
      evt.preventDefault();
    }
  },
  /**
   * Собирает значения полей из разметки и записывает в стейт
   */
  setFieldsFromMarkup: function () {
    for (var element in elements) {
      if (elements.hasOwnProperty(element)) {
        this.setValue(elements[element].id, elements[element].value);
      }
    }
  },
  /**
   * Инициализирует форму
   */
  init: function () {
    this.addInputListeners();
    formElement.addEventListener('submit', this.handleSubmit.bind(this));
    this.setFieldsFromMarkup();
  },
};

pin.addEventListener('mouseup', onPinClick);
form.init();
