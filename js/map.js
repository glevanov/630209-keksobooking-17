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

  var mapElement = document.querySelector('.map');
  var pin = mapElement.querySelector('.map__pin--main');
  var controls = Array.from(document.querySelectorAll('.map__filter, .map__features, .ad-form fieldset'));

  var map = {
    isMapActive: false,
    pinX: null,
    pinY: null,
    pinRelativeX: null,
    pinRelativeY: null,

    /**
     * Вставляет пины на карту
     */
    insertPins: function () {
      var container = mapElement.querySelector('.map__pins');
      container.appendChild(getTemplatePins(getMockData()));
    },

    /**
     * Активирует карту и форму
     */
    activateControls: function () {
      mapElement.classList.remove('map--faded');
      window.form.activateForm();
      controls.forEach(function (control) {
        control.disabled = false;
      });
    },

    /**
     * Валидирует координату X
     * @param {number} X Координата
     * @return {number}
     */
    validateX: function (X) {
      if (X < 0) {
        return 0;
      } else if (X > window.config.Map.WIDTH - window.config.MainPin.WIDTH) {
        return window.config.Map.WIDTH - window.config.MainPin.WIDTH;
      } else {
        return X;
      }
    },

    /**
     * Валидирует координату Y
     * @param {number} Y Координата
     * @return {number}
     */
    validateY: function (Y) {
      if (Y < window.config.Map.MIN_Y) {
        return window.config.Map.MIN_Y;
      } else if (Y > window.config.Map.MAX_Y) {
        return window.config.Map.MAX_Y;
      } else {
        return Y;
      }
    },

    /**
     * Рассчитывает новые координаты пина
     * @param {Object} evt Объект события
     */
    calculatePinPosition: function (evt) {
      var NEW_X = pin.offsetLeft - (this.pinX - evt.clientX);
      var NEW_Y = pin.offsetTop - (this.pinY - evt.clientY);

      this.pinRelativeX = this.validateX(NEW_X);
      this.pinRelativeY = this.validateY(NEW_Y);
      this.pinX = evt.clientX;
      this.pinY = evt.clientY;
    },

    /**
     * Отрисовывает текущее положение пина
     */
    renderSliderPosition: function () {
      pin.style.left = this.pinRelativeX + 'px';
      pin.style.top = this.pinRelativeY + 'px';
    },

    /**
     * Обрабатывает mousedown на пин
     * @param {Object} evt Объект события
     */
    onMouseDown: function (evt) {
      this.pinX = evt.clientX;
      this.pinY = evt.clientY;
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    },

    /**
     * Обрабатывает mousemove на пин
     * @param {Object} evt Объект события
     */
    onMouseMove: function (evt) {
      evt.preventDefault();
      this.calculatePinPosition(evt);
      this.renderSliderPosition();
      this.setAddress();
    },

    /**
     * Обрабатывает mouseup на пин
     * @param {Object} evt Объект события
     */
    onMouseUp: function (evt) {
      evt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      this.activateMap();
      this.setAddress();
    },

    /**
     * Задает адрес в поле адреса
     */
    setAddress: function () {
      var X = pin.offsetLeft + window.config.MainPin.X_OFFSET;
      var Y = pin.offsetTop + window.config.MainPin.Y_OFFSET;
      window.form.address = X + ', ' + Y;
    },

    /**
     * Активирует карту
     */
    activateMap: function () {
      if (!this.isMapActive) {
        this.activateControls();
        this.insertPins();
        this.setAddress();
        this.isMapActive = true;
      }
    },

    /**
     * Инициализирует карту
     */
    init: function () {
      pin.addEventListener('mousedown', this.onMouseDown.bind(this));
    },
  };

  var onMouseMove = map.onMouseMove.bind(map);
  var onMouseUp = map.onMouseUp.bind(map);

  window.map = map;
})();
