'use strict';

(function () {
  /**
   * @readonly
   * @enum {number}
   */
  var AccommodationType = {
    PALACE: 'palace',
    FLAT: 'flat',
    HOUSE: 'house',
    BUNGALO: 'bungalo',
  };

  /**
   * @readonly
   * @const {array}
   */
  var ACCOMODATION_TYPES = Object.values(AccommodationType);

  /**
   * @namespace
   * @property {object} MainPin Перечисление для главного пина
   * @property {object} MainPin.X_OFFSET Смещение указателя пина по оси X
   * @property {number} MainPin.Y_OFFSET Смещение указателя пина по оси Y
   * @property {number} MainPin.WIDTH Ширина пина
   * @property {object} Pin Перечисление для остальных пинов
   * @property {object} Pin.X_OFFSET Смещение указателя пина по оси X
   * @property {number} Pin.Y_OFFSET Смещение указателя пина по оси Y
   * @property {number} PINS_QUANTITY Максимальное количество пинов на карте
   * @property {object} Map Перечисление для карты
   * @property {number} Map.MIN_Y Минимальное значение координаты Y
   * @property {number} Map.MAX_Y Максимальное значение координаты Y
   * @property {number} Map.WIDTH Ширина карты
   * @property {object} MinPrices Перечисление для минимальных цен жилья
   * @property {number} MinPrices.BUNGALO Цена для бунгало
   * @property {number} MinPrices.FLAT Цена для квартиры
   * @property {number} MinPrices.HOUSE Цена для дома
   * @property {number} MinPrices.PALACE Цена для дворца
   * @property {number} MAX_PRICE Максимальное значение цены
   * @property {number} TITLE_MIN_LENGTH Минимальная длина заголовка
   * @property {number} TITLE_MAX_LENGTH Максимальная длина заголовка
   * @property {object} AccommodationType Перечисление для типов жилья
   * @property {string} AccommodationType.PALACE Дворец
   * @property {string} AccommodationType.FLAT Квартира
   * @property {string} AccommodationType.HOUSE Дом
   * @property {string} AccommodationType.BUNGALO Бунгало
   * @property {array}  TYPES Массив значений для типов жилья
   */
  window.config = {
    /**
     * @readonly
     * @enum {number}
     */
    MainPin: {
      X_OFFSET: 32.5,
      Y_OFFSET: 84,
      WIDTH: 65,
    },

    /**
     * @readonly
     * @enum {number}
     */
    Pin: {
      X_OFFSET: 25.5,
      Y_OFFSET: 70,
    },

    /**
     * @readonly
     * @const {number}
     */
    PINS_QUANTITY: 8,

    /**
     * @readonly
     * @enum {number}
     */
    Map: {
      MIN_Y: 130,
      MAX_Y: 630,
      WIDTH: 1200,
    },

    /**
     * @readonly
     * @enum {number}
     */
    MinPrices: {
      BUNGALO: 0,
      FLAT: 1000,
      HOUSE: 5000,
      PALACE: 10000,
    },

    /**
     * @readonly
     * @const {number}
     */
    MAX_PRICE: 1000000,

    /**
     * @readonly
     * @const {number}
     */
    TITLE_MIN_LENGTH: 30,

    /**
     * @readonly
     * @const {number}
     */
    TITLE_MAX_LENGTH: 100,
    AccommodationType: AccommodationType,
    TYPES: ACCOMODATION_TYPES,

    /**
     * @readonly
     * @enum {number | string}
     */
    Backend: {
      TIMEOUT: 10000,
      URL_SEND: 'https://js.dump.academy/keksobooking',
      URL_GET: 'https://js.dump.academy/keksobooking/data',
    }
  };
})();
