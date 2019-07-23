'use strict';

(function () {
  /**
   * Ширина пина
   * @readonly
   * @const {number}
   */
  var PIN_WIDTH = 50;

  /**
   * Высота пина
   * @readonly
   * @const {number}
   */
  var PIN_HEIGHT = 70;

  /**
   * Смещение центра пинов по оси X
   * @readonly
   * @const {number}
   */
  var PIN_X_OFFSET = -(PIN_WIDTH / 2);

  /**
   * Смещение центра пинов по оси Y
   * @readonly
   * @const {number}
   */
  var PIN_Y_OFFSET = -(PIN_HEIGHT);

  /**
   * Перечисление для типов жилья
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
   * Массив значений для типов жилья
   * @readonly
   * @const {array}
   */
  var ACCOMODATION_TYPES = Object.values(AccommodationType);

  /**
   * @namespace
   * @property {object} Pin Перечисление для пина
   * @property {number} Pin.WIDTH Ширина пина
   * @property {string} Pin.HEIGHT Высота пина
   * @property {object} Pin.CENTER_OFFSET Смещение центра большого пина для расчета координаты адреса
   * @property {number} Pin.X_OFFSET Смещение центра пинов по оси X
   * @property {number} Pin.Y_OFFSET Смещение центра пинов по оси Y
   * @property {number} PINS_QUANTITY Максимальное количество пинов на карте
   * @property {object} Map
   * @property {number} Map.MIN_Y: 130,
   * @property {number} Map.MAX_Y: 630,
   * @property {number} Map.WIDTH: 1200,
   * @property {object} MinPrices
   * @property {number} MinPrices.BUNGALO
   * @property {number} MinPrices.FLAT
   * @property {number} MinPrices.HOUSE
   * @property {number} MinPrices.PALACE
   * @property {number} MAX_PRICE
   * @property {number} TITLE_MIN_LENGTH
   * @property {number} TITLE_MAX_LENGTH
   * @property {object} AccommodationType
   * @property {string} AccommodationType.PALACE
   * @property {string} AccommodationType.FLAT
   * @property {string} AccommodationType.HOUSE
   * @property {string} AccommodationType.BUNGALO
   * @property {array}  TYPES
   */
  window.config = {
    /**
     * Перечисление для пина
     * @readonly
     * @enum {number}
     */
    Pin: {
      WIDTH: PIN_WIDTH,
      HEIGHT: PIN_HEIGHT,
      CENTER_OFFSET: 26,
      X_OFFSET: PIN_X_OFFSET,
      Y_OFFSET: PIN_Y_OFFSET,
    },

    /**
     * Максимальное количество пинов на карте
     * @readonly
     * @const {number}
     */
    PINS_QUANTITY: 8,

    /**
     * Перечисление для карты
     * @readonly
     * @enum {number}
     */
    Map: {
      MIN_Y: 130,
      MAX_Y: 630,
      WIDTH: 1200,
    },

    /**
     * Перечисление для минимальных цен жилья
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
     * Максимальное значение цены
     * @readonly
     * @const {number}
     */
    MAX_PRICE: 1000000,

    /**
     * Минимальная длина заголовка
     * @readonly
     * @const {number}
     */
    TITLE_MIN_LENGTH: 30,

    /**
     * Максимальная длина заголовка
     * @readonly
     * @const {number}
     */
    TITLE_MAX_LENGTH: 100,
    AccommodationType: AccommodationType,
    TYPES: ACCOMODATION_TYPES,
  };
})();
