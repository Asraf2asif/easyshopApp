import 'react-app-polyfill/ie11';
import 'react-app-polyfill/ie9';
import 'react-app-polyfill/stable';
import './localStoragePolyfils';

// eslint-disable-next-line
String.prototype.capitalize = function () {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

// eslint-disable-next-line
if (typeof String.prototype.replaceAll === 'undefined') {
  String.prototype.replaceAll = function (search, replace) {
    return this.split(search).join(replace);
  };
}
