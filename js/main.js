'use strict';

var MIN_Y = 130;
var MAX_Y = 630;

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
var getMockType = function () {
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
function MockItem() {
  this.author = {
    avatar: 'img/avatars/user' + getLeadingZeroString(getRandomInteger(1, 8)) + '.png',
  };
  this.offer = {
    type: getMockType(),
  };
  this.location = {
    x: getRandomInteger(0, mapWidth),
    y: getRandomInteger(MIN_Y, MAX_Y),
  };
}

/**
 * Возвращает массив тестовых данных
 * @return {array}
 */
var getMockData = function () {
  var arr = [];
  var SIZE_LIMIT = 8;
  for (var i = 0; i < SIZE_LIMIT; i++) {
    arr.push(new MockItem());
  }
  return arr;
};

/**
 * Задает необходимые пину параметры
 * @param {Node} pin DOM-элемент пина
 * @param {object} data Данные для пина в виде объекта
 * @return {Node}
 */
var setPinProperties = function (pin, data) {
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
  var X_OFFSET = -(PIN_WIDTH / 2);
  var Y_OFFSET = -(PIN_HEIGHT);

  var image = pin.querySelector('img');
  var elementX = data.location.x + X_OFFSET;
  var elementY = data.location.y + Y_OFFSET;

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
var getPins = function (data) {
  var fragment = document.createDocumentFragment();
  var template = document.querySelector('#pin').content;

  data.forEach(function (item) {
    var pin = template.cloneNode(true).querySelector('.map__pin');
    fragment.appendChild(setPinProperties(pin, item));
  });

  return fragment;
};

/**
 * Вставляет пины на карту
 */
var insertPins = function () {
  var container = map.querySelector('.map__pins');
  container.appendChild(getPins(pinData));
};

var map = document.querySelector('.map');
var mapWidth = map.clientWidth;
var pinData = getMockData();

map.classList.remove('map--faded');
insertPins();
