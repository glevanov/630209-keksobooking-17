'use strict';

(function () {
  /**
   * Пороговое значение для добавления или недобавления ноля к числу
   * @readonly
   * @const {number}
   */
  var LIMIT = 10;

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
    return n >= LIMIT
      ? n.toString()
      : '0' + n.toString();
  };

  /**
   * Возвращает случайный тип из набора типов
   * @return {string}
   */
  var getType = function () {
    var length = window.config.TYPES.length;

    return window.config.TYPES[getRandomInteger(0, length - 1)];
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
      x: getRandomInteger(0, window.config.Map.WIDTH),
      y: getRandomInteger(window.config.Map.MIN_Y, window.config.Map.MAX_Y),
    };
  }

  /**
   * Возвращает массив тестовых данных
   * @return {array}
   */
  var getMockData = function () {
    var pins = [];
    for (var i = 0; i < window.config.PINS_QUANTITY; i++) {
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
    var elementX = data.location.x + window.config.Pin.X_OFFSET;
    var elementY = data.location.y + window.config.Pin.Y_OFFSET;

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
    window.form.activateForm();
    controls.forEach(function (control) {
      control.disabled = false;
    });
  };

  /**
   * Задает адрес в поле адреса
   */
  var setAddress = function () {
    var target = pin.getBoundingClientRect();
    var X = target.left + window.config.Pin.CENTER_OFFSET;
    var Y = target.top + window.config.Pin.CENTER_OFFSET;
    window.form.address = X + ', ' + Y;
  };

  /**
   * Обрабатывает клин на пин и активирует карту
   */
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
  var controls = Array.from(document.querySelectorAll('.map__filter, .map__features, .ad-form fieldset'));
  var isMapActive = false;

  window.map = {
    init: function () {
      pin.addEventListener('mouseup', onPinClick);
    }
  };
})();
