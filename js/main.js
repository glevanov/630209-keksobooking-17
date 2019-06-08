'use strict';

var MIN_Y = 130;
var MAX_Y = 630;

/**
 * Возвращает случайное число в заданном диапазоне
 * @param {number} min минимальное значение
 * @param {number} max максимальное значение
 * @return {number}
 */
var getRandomInteger = function (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

/**
 * Переводит число в строку и добавляет ведущий ноль если нужно
 * @param {number} n число
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
  var Types = [
    'palace',
    'flat',
    'house',
    'bungalo',
  ];

  return Types[getRandomInteger(0, Types.length - 1)];
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

var map = document.querySelector('.map');
var mapWidth = map.clientWidth;

map.classList.remove('map--faded');
