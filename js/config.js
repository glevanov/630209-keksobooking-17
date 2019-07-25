'use strict';

(function () {
  /**
   * @readonly
   * @const {number}
   */
  var PIN_WIDTH = 50;

  /**
   * @readonly
   * @const {number}
   */
  var PIN_HEIGHT = 70;

  /**
   * @readonly
   * @const {number}
   */
  var PIN_X_OFFSET = -(PIN_WIDTH / 2);

  /**
   * @readonly
   * @const {number}
   */
  var PIN_Y_OFFSET = -(PIN_HEIGHT);

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
   * @property {object} Pin Перечисление для пина
   * @property {number} Pin.WIDTH Ширина пина
   * @property {string} Pin.HEIGHT Высота пина
   * @property {object} Pin.CENTER_OFFSET Смещение центра большого пина для расчета координаты адреса
   * @property {number} Pin.X_OFFSET Смещение центра пинов по оси X
   * @property {number} Pin.Y_OFFSET Смещение центра пинов по оси Y
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
    Pin: {
      WIDTH: PIN_WIDTH,
      HEIGHT: PIN_HEIGHT,
      CENTER_OFFSET: 26,
      RIGHT_OFFSET: 65,
      X_OFFSET: PIN_X_OFFSET,
      Y_OFFSET: PIN_Y_OFFSET,
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
  };
})();
