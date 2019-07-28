'use strict';
(function () {
  var SUCCESS_CODE = 200;

  window.backend = {
    /**
     * Функция получения данных с сервера
     * @param {string} url Адрес для запроса
     * @param {function} onSuccess Функция, выполнеяемая при успешном запросе
     * @param {function} onError Функция, выполнеяемая в случае ошибки
     */
    getData: function (url, onSuccess, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        if (xhr.status === SUCCESS_CODE) {
          onSuccess(xhr.response);
        } else {
          onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
        }
      });

      xhr.addEventListener('error', function () {
        onError('Произошла ошибка соединения');
      });

      xhr.addEventListener('timeout', function () {
        onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
      });

      xhr.timeout = window.config.Backend.TIMEOUT;

      xhr.open('GET', url);
      xhr.send();
    },

    /**
     * Функция получения данных с сервера
     * @param {string} url Адрес для запроса
     * @param {object} data Объект данных для отправки
     * @param {function} onLoad Функция, выполнеяемая при успешном запросе
     * @param {function} onError Функция, выполнеяемая в случае ошибки
     */
    sendData: function (url, data, onLoad, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        if (xhr.status === SUCCESS_CODE) {
          onLoad();
        } else {
          onError(xhr.response[0].errorMessage);
        }
      });

      xhr.open('POST', url);
      xhr.send(data);
    }
  };
})();
