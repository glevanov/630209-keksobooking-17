'use strict';

(function () {
  var VALIDATION_SUCCESS_CODE = '';
  var VALID_TYPES = [
    'palace',
    'flat',
    'house',
    'bungalo',
  ];
  var MAX_PRICE = 1000000;

  window.validation = {
    /**
     * Валидирует поле Заголовок объявления
     * @param {string} title Значение поля Цена за ночь
     * @return {string}
     */
    validateTitle: function (title) {
      var length = title.length;
      if (length < 30) {
        return 'Длина адреса не может быть меньше 30 символов. Сейчас - ' + length + ' символов';
      }
      if (length > 100) {
        return 'Длина адреса не может быть больше 100 символов. Сейчас - ' + length + ' символов';
      }

      return VALIDATION_SUCCESS_CODE;
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
      if (Y > window.config.MAX_Y || Y < window.config.MIN_Y) {
        return 'Неверное значение Y';
      }
      if (X > window.config.MAP_WIDTH || X < 0) {
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
      if (priceAsNumber < window.config.MinPrices[type]) {
        return 'Значение Цены за ночь меньше минимального';
      }
      return VALIDATION_SUCCESS_CODE;
    },
  };
})();
