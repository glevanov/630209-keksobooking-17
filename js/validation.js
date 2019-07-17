'use strict';

(function () {
  var VALIDATION_SUCCESS_CODE = '';
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

  var MinPrices = {
    bungalo: 0,
    flat: 1000,
    house: 5000,
    palace: 10000,
  };
})();
