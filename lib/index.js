'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.JValue = exports.JObj = exports.JRaw = undefined;

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

exports.default = jj;

var _get = require('lodash/get');

var _get2 = _interopRequireDefault(_get);

var _isArray = require('lodash/isArray');

var _isArray2 = _interopRequireDefault(_isArray);

var _isBoolean = require('lodash/isBoolean');

var _isBoolean2 = _interopRequireDefault(_isBoolean);

var _isEmpty2 = require('lodash/isEmpty');

var _isEmpty3 = _interopRequireDefault(_isEmpty2);

var _isInteger = require('lodash/isInteger');

var _isInteger2 = _interopRequireDefault(_isInteger);

var _isNumber = require('lodash/isNumber');

var _isNumber2 = _interopRequireDefault(_isNumber);

var _isObject = require('lodash/isObject');

var _isObject2 = _interopRequireDefault(_isObject);

var _isString = require('lodash/isString');

var _isString2 = _interopRequireDefault(_isString);

var _toInteger2 = require('lodash/toInteger');

var _toInteger3 = _interopRequireDefault(_toInteger2);

var _toNumber2 = require('lodash/toNumber');

var _toNumber3 = _interopRequireDefault(_toNumber2);

var _toPath = require('lodash/toPath');

var _toPath2 = _interopRequireDefault(_toPath);

var _toString2 = require('lodash/toString');

var _toString3 = _interopRequireDefault(_toString2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _errorMessage(value, path, type) {
  return 'Cant\'t cast \'' + value + '\' at ' + path.join('.') + ' to ' + type;
}

var JRaw = exports.JRaw = function () {
  function JRaw(v, path) {
    (0, _classCallCheck3.default)(this, JRaw);

    this._v = v;
    this._path = path;
  }

  (0, _createClass3.default)(JRaw, [{
    key: 'isEmpty',
    value: function isEmpty() {
      return (0, _isEmpty3.default)(this._v);
    }
  }, {
    key: 'raw',
    value: function raw() {
      return this._v;
    }
  }]);
  return JRaw;
}();

var JObj = exports.JObj = function (_JRaw) {
  (0, _inherits3.default)(JObj, _JRaw);

  function JObj() {
    (0, _classCallCheck3.default)(this, JObj);
    return (0, _possibleConstructorReturn3.default)(this, (JObj.__proto__ || (0, _getPrototypeOf2.default)(JObj)).apply(this, arguments));
  }

  (0, _createClass3.default)(JObj, [{
    key: 'get',
    value: function get(path) {
      return jj(this._v, path, this._path);
    }
  }]);
  return JObj;
}(JRaw);

var JValue = exports.JValue = function (_JRaw2) {
  (0, _inherits3.default)(JValue, _JRaw2);

  function JValue() {
    (0, _classCallCheck3.default)(this, JValue);
    return (0, _possibleConstructorReturn3.default)(this, (JValue.__proto__ || (0, _getPrototypeOf2.default)(JValue)).apply(this, arguments));
  }

  (0, _createClass3.default)(JValue, [{
    key: 'string',
    value: function string() {
      if ((0, _isString2.default)(this._v)) {
        return this._v;
      }
      throw new TypeError(_errorMessage(this._v, this._path, 'string'));
    }
  }, {
    key: 'stringOrNull',
    value: function stringOrNull() {
      if ((0, _isString2.default)(this._v)) {
        return this._v;
      }
      return null;
    }
  }, {
    key: 'stringOrDefault',
    value: function stringOrDefault(defaultValue) {
      var value = this.stringOrNull();
      return value == null ? defaultValue : value;
    }
  }, {
    key: 'toString',
    value: function toString() {
      return (0, _toString3.default)(this._v);
    }
  }, {
    key: 'date',
    value: function date() {
      var v = this.dateOrNull();

      if (v == null) {
        throw new TypeError(_errorMessage(this._v, this._path, 'Date'));
      }
      return v;
    }
  }, {
    key: 'dateOrNull',
    value: function dateOrNull() {
      var v = this.timestampOrNull();
      if (v == null) {
        return null;
      }

      return new Date(v);
    }
  }, {
    key: 'dateOrDefault',
    value: function dateOrDefault(defaultValue) {
      return this.dateOrNull() || defaultValue;
    }
  }, {
    key: 'timestamp',
    value: function timestamp() {
      var v = this.timestampOrNull();
      if (v == null) {
        throw new TypeError(_errorMessage(this._v, this._path, 'Date timestamp'));
      }

      return v;
    }
  }, {
    key: 'timestampOrNull',
    value: function timestampOrNull() {
      var dateString = this.stringOrNull();
      var v = Date.parse(dateString || '');
      if (isNaN(v)) {
        return null;
      }

      return v;
    }
  }, {
    key: 'timestampOrDefault',
    value: function timestampOrDefault(defaultValue) {
      var v = this.timestampOrNull();
      if (v == null) {
        return defaultValue;
      }

      return v;
    }
  }, {
    key: 'integer',
    value: function integer() {
      if ((0, _isInteger2.default)(this._v)) {
        return this._v;
      }

      throw new TypeError(_errorMessage(this._v, this._path, 'interger'));
    }
  }, {
    key: 'integerOrNull',
    value: function integerOrNull() {
      if ((0, _isInteger2.default)(this._v)) {
        return this._v;
      }

      return null;
    }
  }, {
    key: 'integerOrDefault',
    value: function integerOrDefault(defaultValue) {
      var value = this.integerOrNull();
      return value == null ? defaultValue : value;
    }
  }, {
    key: 'toInteger',
    value: function toInteger() {
      return (0, _toInteger3.default)(this._v);
    }
  }, {
    key: 'number',
    value: function number() {
      if ((0, _isNumber2.default)(this._v)) {
        return this._v;
      }

      throw new TypeError(_errorMessage(this._v, this._path, 'number'));
    }
  }, {
    key: 'numberOrNull',
    value: function numberOrNull() {
      if ((0, _isNumber2.default)(this._v)) {
        return this._v;
      }

      return null;
    }
  }, {
    key: 'numberOrDefault',
    value: function numberOrDefault(defaultValue) {
      var value = this.numberOrNull();
      return value == null ? defaultValue : value;
    }
  }, {
    key: 'toNumber',
    value: function toNumber() {
      return (0, _toNumber3.default)(this._v);
    }
  }, {
    key: 'bool',
    value: function bool() {
      if ((0, _isBoolean2.default)(this._v)) {
        return this._v;
      }

      throw new TypeError(_errorMessage(this._v, this._path, 'boolean'));
    }
  }, {
    key: 'boolOrNull',
    value: function boolOrNull() {
      if ((0, _isBoolean2.default)(this._v)) {
        return this._v;
      }

      return null;
    }
  }, {
    key: 'boolOrDefault',
    value: function boolOrDefault(defaultValue) {
      var value = this.boolOrNull();
      return value == null ? defaultValue : value;
    }
  }, {
    key: 'toBool',
    value: function toBool() {
      if (this._v == null || this._v === false || this._v === 0 || this._v === 'false') {
        return false;
      }

      return true;
    }
  }, {
    key: 'obj',
    value: function obj() {
      return new JObj(this.object(), this._path);
    }
  }, {
    key: 'objOrNull',
    value: function objOrNull() {
      var v = this.objectOrNull();

      if (v != null) {
        return new JObj(v, this._path);
      }

      return null;
    }
  }, {
    key: 'objOrDefault',
    value: function objOrDefault(defaultValue) {
      return this.objOrNull() || defaultValue;
    }
  }, {
    key: 'object',
    value: function object() {
      if ((0, _isObject2.default)(this._v)) {
        return this._v;
      }
      throw new TypeError(_errorMessage(this._v, this._path, 'Object'));
    }
  }, {
    key: 'objectOrNull',
    value: function objectOrNull() {
      if ((0, _isObject2.default)(this._v)) {
        return this._v;
      }
      return null;
    }
  }, {
    key: 'objectOrDefault',
    value: function objectOrDefault(defaultObject) {
      return this.objectOrNull() || defaultObject;
    }
  }, {
    key: 'array',
    value: function array() {
      if ((0, _isArray2.default)(this._v)) {
        return this._v;
      }

      throw new TypeError(_errorMessage(this._v, this._path, 'Array'));
    }
  }, {
    key: 'arrayOrNull',
    value: function arrayOrNull() {
      if ((0, _isArray2.default)(this._v)) {
        return this._v;
      }

      return null;
    }
  }, {
    key: 'arrayOrDefault',
    value: function arrayOrDefault(defaultValue) {
      return this.arrayOrNull() || defaultValue;
    }
  }]);
  return JValue;
}(JRaw);

function jj(jsonLike) {
  var path = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  var parentPath = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : ['<root>'];

  if (path == null) {
    return new JValue(jsonLike, parentPath);
  }
  if (typeof path == 'string') {
    path = (0, _toPath2.default)(path);
  }
  var v = (0, _get2.default)(jsonLike, path);

  return new JValue(v, parentPath.concat(path));
}