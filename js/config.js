'use strict';

(function () {
  window.config = {
    Pin: {
      WIDTH: 50,
      HEIGHT: 70,
      CENTER_OFFSET: 26,
      get X_OFFSET() {
        return -(this.WIDTH / 2);
      },
      get Y_OFFSET() {
        return -(this.HEIGHT);
      },
    },
    PINS_QUANTITY: 8,
    Map: {
      MIN_Y: 130,
      MAX_Y: 630,
      WIDTH: 1200,
    },
    MinPrices: {
      BUNGALO: 0,
      FLAT: 1000,
      HOUSE: 5000,
      PALACE: 10000,
    },
    MAX_PRICE: 1000000,
    TITLE_MIN_LENGTH: 30,
    TITLE_MAX_LENGTH: 100,
    AccommodationType: {
      PALACE: 'palace',
      FLAT: 'flat',
      HOUSE: 'house',
      BUNGALO: 'bungalo',
    },
    get TYPES() {
      return Object.values(this.AccommodationType);
    },
  };
})();
