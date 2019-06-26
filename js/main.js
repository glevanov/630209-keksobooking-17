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
  this.state = {
    fields: {
      title: {
        value: '',
        validityMessage: null,
      },
      address: {
        value: '',
        validityMessage: null,
      },
      type: {
        value: '',
        validityMessage: null,
      },
      price: {
        value: '',
        validityMessage: null,
      },
      timein: {
        value: '',
        validityMessage: null,
      },
      timeout: {
        value: '',
        validityMessage: null,
      },
    },
    readyToSubmit: false,
  };
  this.formElement = document.querySelector('.ad-form');
  this.fields = Object.keys(this.state.fields);
  this.inputs = Array.from(this.formElement.querySelectorAll('#' + this.fields.join(', #')));
  /**
   * Геттер значений ключей в объекте элемента формы
   * @param {string} field Название элемента формы
   * @param {string} key Название ключа, из которого нужно достать данные
   * @return {string|boolean|null}
   */
  this.getField = function (field, key) {
    return this.state.fields[field][key];
  };
  /**
   * Сеттер значений ключей в объекте элемента формы
   * @param {string} field Название элемента формы
   * @param {string} key Название ключа, в который нужно сохранить данные
   * @param {string} value Значение, которое нужно сохранить в ключ
   */
  this.setField = function (field, key, value) {
    this.state.fields[field][key] = value;
  }.bind(this);
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
   * @param {string} key Название ключа, в который нужно сохранить данные
   */
  this.updateInput = function (input, key) {
    input.value = this.getField(input.id, key);
  };
  /**
   * Обработчик обновления значения элемента формы
   * @param {Object} evt Объект события
   */
  this.handleInputChange = function (evt) {
    var target = evt.target;
    var key = target.id;
    var value = target.value;
    this.setField(key, 'value', value);
    this.updateInput(target, 'value');
  }.bind(this);
  /**
   * Добавляет обработчики на инпуты
   * @param {function} handler Функция-обработчик
   */
  this.addInputListeners = function (handler) {
    this.inputs.forEach(function (input) {
      input.addEventListener('change', handler);
    });
  };
  /**
   * Валидирует поле Заголовка
   * @param {string} title Значение поля
   * @return {string}
   */
  this.validateTitle = function (title) {
    if (title.trim().length > 100) {
      return 'Длина заголовка не может быть больше 100 символов';
    }
    if (title.trim().length <= 30) {
      return 'Длина заголовка не может быть меньше 30 символов';
    }
    return VALIDATION_SUCCESS_CODE;
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
   * Возвращает значение функции валидации в зависимости от переданного поля
   * @param {string} field Название элемента формы
   * @return {string}
   */
  this.dispatchValidator = function (field) {
    switch (field) {
      case 'title':
        return this.validateTitle(this.state.fields.title.value);
      case 'address':
        return this.validateAddress(this.state.fields.address.value);
      case 'type':
        return this.validateType(this.state.fields.type.value);
      case 'price':
        return this.validatePrice(this.state.fields.price.value, this.state.fields.type.value);
      case 'timein':
        return this.validateTime(this.state.fields.timein.value, this.state.fields.timeout.value);
      case 'timeout':
        return this.validateTime(this.state.fields.timein.value, this.state.fields.timeout.value);
    }
    return undefined;
  }.bind(this);
  /**
   * Задает сообщение о валидации всем полям формы
   * @param {function} setter Функция для записи значения валидации
   * @param {function} dispatcher Функция получения значения валидации по типу поля
   */
  this.setValidity = function (setter, dispatcher) {
    var key = 'validityMessage';
    this.fields.forEach(function (field) {
      setter(field, key, dispatcher(field));
    });
  };
  /**
   * Выполняет все проверки валидности и задает значение флагу readyToSubmit
   */
  this.checkValidity = function () {
    this.setValidity(this.setField, this.dispatchValidator);
    var validityMessages = [];
    for (var key in this.state.fields) {
      if (this.state.fields.hasOwnProperty(key)) {
        validityMessages.push(this.state.fields[key]['validityMessage']);
      }
    }
    console.log(validityMessages);
    // TODO Написать функцию установки дефолтных значений в стейт
    // TODO Написать функцию вывода ошибок
    // TODO Проверить адрес отправки формы
    var isEverythingValid = validityMessages.every(function (message) {
      return (message === VALIDATION_SUCCESS_CODE);
    });
    this.setReadyToSubmit(isEverythingValid);
  };
  /**
   * Обработчик отправки формы
   * @param {Object} evt Объект события
   */
  this.handleSubmit = function (evt) {
    this.checkValidity();
    if (!this.getReadyToSubmit()) {
      evt.preventDefault();
    }
  }.bind(this);
  /**
   * Инициализирует форму
   */
  this.init = function () {
    this.addInputListeners(this.handleInputChange);
    this.formElement.addEventListener('submit', this.handleSubmit);
  };
};

var form = new Form();

pin.addEventListener('mouseup', onPinClick);
onPinClick();
form.init();
