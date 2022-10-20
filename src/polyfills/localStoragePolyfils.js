/**
 * @description Check for localStorage support and fall back to simple session storage.
 * At time of writing 89% of browsers support localStorage so falling back to cookie is unnecessary.
 * @author <a href="mailto:paul.massey@scriptwerx.io?subject=localStorage%20polyfill">Paul Massey</a>
 */
(function () {
  //'use strict';

  var supported;

  if (window.hasOwnProperty('localStorage') && window.localStorage !== null) {
    supported = true;

    // Some browsers will return true when in private browsing mode so test to make sure it's functional.
    try {
      var key = 'swxTest_' + Math.round(Math.random() * 1e7);
      window.localStorage.setItem(key, 'test');
      window.localStorage.removeItem(key);
      console.info('localStorage is functional.');
    } catch (e) {
      console.warn(
        'localStorage not functional, falling back to session Object.'
      );
      supported = false;
    }
  }

  if (!supported) {
    var data = {};

    window.localStorage = {
      setItem: function (key, value) {
        data[key] = value;
        return data[key];
      },
      getItem: function (key) {
        return key in data ? data[key] : undefined;
      },
      removeItem: function (key) {
        delete data[key];
        return undefined;
      },
      clear: function () {
        data = {};
        return data;
      },
    };
  }
})();
