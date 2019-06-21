'use strict';

var MIN_Y = 130;
var MAX_Y = 630;
var MAP_WIDTH = 1200;
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
var PIN_CENTER_OFFSET = 52 / 2;
var PIN_X_OFFSET = -(PIN_WIDTH / 2);
var PIN_Y_OFFSET = -(PIN_HEIGHT);
var PINS_QUANTITY = 8;

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
var controls = [].concat(
    Array.from(map.querySelectorAll('.map__filter')),
    map.querySelector('.map__features'),
    Array.from(adForm.querySelectorAll('.ad-form fieldset'))
);
var addressInput = adForm.querySelector('#address');
var isMapActive = false;

pin.addEventListener('mouseup', onPinClick);
