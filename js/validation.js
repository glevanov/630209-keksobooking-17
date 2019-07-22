'use strict';

(function () {
  window.validation = {
    /**
     * Валидирует поле Заголовок объявления
     * @param {string} title Значение поля Цена за ночь
     * @return {string}
     */
    validateTitle: function (title) {
      var length = title.length;
      if (length < window.config.TITLE_MIN_LENGTH) {
        return 'Длина адреса не может быть меньше ' + window.config.TITLE_MIN_LENGTH + ' символов. Сейчас - ' + length + ' символов';
      }
      if (length > window.config.TITLE_MAX_LENGTH) {
        return 'Длина адреса не может быть больше ' + window.config.TITLE_MAX_LENGTH + ' символов. Сейчас - ' + length + ' символов';
      }

      return '';
    },

    /**
     * Валидирует поле Тип жилья
     * @param {string} type Значение поля
     * @return {string}
     */
    validateType: function (type) {
      if (window.config.TYPES.indexOf(type) === -1) {
        return 'Неверный Тип жилья';
      }
      return '';
    },

    /**
     * Валидирует поле Цена за ночь
     * @param {string} price Значение поля Цена за ночь
     * @param {string} type Значение поля Тип жилья
     * @return {string}
     */
    validatePrice: function (price, type) {
      if (!price.trim().length) {
        return 'Не указана Цена за ночь';
      }

      var priceAsNumber = parseFloat(price);
      if (isNaN(priceAsNumber)) {
        return 'Значение Цены за ночь не является числом';
      }
      if (priceAsNumber > window.config.MAX_PRICE) {
        return 'Значение Цены за ночь больше максимального';
      }
      if (priceAsNumber < window.config.MinPrices[type.toUpperCase()]) {
        return 'Значение Цены за ночь меньше минимального';
      }
      return '';
    },
  };
})();
