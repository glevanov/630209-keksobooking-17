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
  adForm.classList.remove('ad-form--disabled');
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
  addressInput.value = X + ', ' + Y;
};

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
var adForm = document.querySelector('.ad-form');
var controls = Array.from(document.querySelectorAll('.map__filter, .map__features, .ad-form fieldset'));
var addressInput = adForm.querySelector('#address');
var isMapActive = false;
var MinPrices = {
  bungalo: 0,
  flat: 1000,
  house: 5000,
  palace: 10000,
};

/**
 * Полностью описывает объект формы
 * @constructor
 */
var Form = function () {
  this.formElement = document.querySelector('.ad-form');
  this.elements = {
    title: this.formElement.querySelector('#title'),
    address: this.formElement.querySelector('#address'),
    type: this.formElement.querySelector('#type'),
    price: this.formElement.querySelector('#price'),
    timein: this.formElement.querySelector('#timein'),
    timeout: this.formElement.querySelector('#timeout'),
  };
  this.state = {
    values: {
      title: '',
      address: '',
      type: '',
      price: '',
      timein: '',
      timeout: '',
    },
    readyToSubmit: false,
  };
  /**
   * Геттер значений элемента формы
   * @param {string} key Название ключа с элементом формы
   * @return {string}
   */
  this.getValue = function (key) {
    return this.state.values[key];
  };
  /**
   * Сеттер значений элемента формы
   * @param {string} key Название ключа с элементом формы
   * @param {string} value Значение для записи в элемент формы
   */
  this.setValue = function (key, value) {
    this.state.values[key] = value;
  };
  /**
   * Геттер значения готовности формы к отправке
   * @return {boolean}
   */
  this.getReadyToSubmit = function () {
    return this.state.readyToSubmit;
  };
  /**
   * Сеттер значения готовности формы к отправке
   * @param {boolean} value Название элемента формы
   */
  this.setReadyToSubmit = function (value) {
    this.state.readyToSubmit = value;
  };
  /**
   * Обновляет значение элемента формы
   * @param {Object} input Элемент формы
   */
  this.updateInput = function (input) {
    input.value = this.getValue(input.id);
  };
  /**
   * Обработчик обновления значения элемента формы
   * @param {Object} evt Объект события
   */
  this.handleInputChange = function (evt) {
    var target = evt.target;
    var key = target.id;
    var value = target.value;
    this.setValue(key, value);
    this.updateInput(target);
  }.bind(this);
  /**
   * Задает одинаковое значение инпутам времени при их изменении
   * @param {Object} evt Объект события
   */
  this.handleTimeChange = function (evt) {
    var target = evt.target;
    var value = target.value;
    if (target === this.elements.timein) {
      this.elements.timeout.value = value;
    } else {
      this.elements.timein.value = value;
    }
  }.bind(this);
  /**
   * Добавляет обработчики на инпуты
   */
  this.addInputListeners = function () {
    for (var element in this.elements) {
      if (this.elements.hasOwnProperty(element)) {
        this.elements[element].addEventListener('change', this.handleInputChange);
      }
    }
    this.elements.timein.addEventListener('change', this.handleTimeChange);
    this.elements.timeout.addEventListener('change', this.handleTimeChange);
  };
  /**
   * Валидирует поле Адреса
   * @param {string} address Значение поля
   * @return {string}
   */
  this.validateAddress = function (address) {
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
  };
  /**
   * Валидирует поле Тип жилья
   * @param {string} type Значение поля
   * @return {string}
   */
  this.validateType = function (type) {
    if (VALID_TYPES.indexOf(type) === -1) {
      return 'Неверный Тип жилья';
    }
    return VALIDATION_SUCCESS_CODE;
  };
  /**
   * Валидирует поле Цена за ночь
   * @param {string} price Значение поля Цена за ночь
   * @param {string} type Значение поля Тип жилья
   * @return {string}
   */
  this.validatePrice = function (price, type) {
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
  };
  /**
   * Валидирует поля Времени заезда и Времени выезда
   * @param {string} timein Значение поля Время заезда
   * @param {string} timeout Значение поля Время выезда
   * @return {string}
   */
  this.validateTime = function (timein, timeout) {
    var timeinIndex = VALID_TIMES.indexOf(timein);
    var timeoutIndex = VALID_TIMES.indexOf(timeout);
    if (timeinIndex === -1 || timeoutIndex === -1) {
      return 'Неверное значение Времени заезда и Времени выезда';
    }
    if (timeinIndex !== timeoutIndex) {
      return 'Время заезда и Время выезда должны совпадать';
    }
    return VALIDATION_SUCCESS_CODE;
  };
  /**
   * Выводит результаты кастомной валидации
   */
  this.outputValidation = function () {
    this.elements.address.setCustomValidity(this.validateAddress(this.state.values.address));
    this.elements.type.setCustomValidity(this.validateType(this.state.values.type));
    this.elements.price.setCustomValidity(this.validatePrice(this.state.values.price, this.state.values.type));
    this.elements.timein.setCustomValidity(this.validateTime(this.state.values.timein, this.state.values.timeout));
    this.elements.timeout.setCustomValidity(this.validateTime(this.state.values.timein, this.state.values.timeout));
  };
  /**
   * Обработчик отправки формы
   * @param {Object} evt Объект события
   */
  this.handleSubmit = function (evt) {
    this.outputValidation();
    if (!this.getReadyToSubmit()) {
      evt.preventDefault();
    }
    // Почему-то ивент стартует только один раз
    console.log(this.state.values);
    console.log('fired');
  }.bind(this);
  /**
   * Собирает значения полей из разметки и записывает в стейт
   */
  this.setFieldsFromMarkup = function () {
    for (var element in this.elements) {
      if (this.elements.hasOwnProperty(element)) {
        this.setValue(this.elements[element].id, this.elements[element].value);
      }
    }
  };
  /**
   * Инициализирует форму
   */
  this.init = function () {
    this.addInputListeners();
    this.formElement.addEventListener('submit', this.handleSubmit);
    this.setFieldsFromMarkup();
  };
};

var form = new Form();

pin.addEventListener('mouseup', onPinClick);
onPinClick();
form.init();
