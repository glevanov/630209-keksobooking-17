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
   * Обрабатывает mousedown на пин
   */
  var onMouseDown = function (evt) {
    var pinX = evt.clientX;
    var pinY = evt.clientY;

    var MAP_RECT = map.getBoundingClientRect();
    var MapBoundaries = {
      TOP: MAP_RECT.top,
      RIGHT: MAP_RECT.right,
      BOTTOM: MAP_RECT.bottom,
      LEFT: MAP_RECT.left,
    };

    function onMouseMove(moveEvt) {
      moveEvt.preventDefault();

      var pinRelativeX;
      var pinRelativeY;

      function valiatePinCoordinates(coordinates) {
        var X = coordinates.X;
        var Y = coordinates.Y;

        var validatedCoordinates;

        if (X < 0) {
          validatedCoordinates.X = 0;
        } else if (X > window.config.Map.WIDTH) {
          validatedCoordinates.X = window.config.Map.WIDTH;
        } else {
          validatedCoordinates.X = X;
        }

        if (Y < window.config.Map.MIN_Y) {
          validatedCoordinates.Y = window.config.Map.MIN_Y;
        } else if (X > window.config.Map.MAX_Y) {
          validatedCoordinates.Y = window.config.Map.MAX_Y;
        } else {
          validatedCoordinates.Y = Y;
        }
        return validatedCoordinates;
      }

      function calculatePinPosition() {
        var horizontalShift = pinX - moveEvt.clientX;
        var verticalShift = pinY - moveEvt.clientY;
        // pinRelativePosition = valiatePinCoordinates(sliderPin.offsetLeft - horizontalShift);
        pinRelativeX = pin.offsetLeft - horizontalShift;
        pinRelativeY = pin.offsetTop - verticalShift;
        pinX = moveEvt.clientX;
        pinY = moveEvt.clientY;
      }

      function renderSliderPosition() {
        pin.style.left = pinRelativeX + 'px';
        pin.style.top = pinRelativeY + 'px'
      }

      calculatePinPosition();
      renderSliderPosition();

      // Вот это в самом конце
      // activateMap();
    }


    function onMouseUp(upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  /**
   * Активирует карту
   */
  var activateMap = function () {
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
      pin.addEventListener('mousedown', onMouseDown);
    }
  };
})();
