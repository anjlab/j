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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _ = require('lodash');

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
      return _.isEmpty(this._v);
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
      if (_.isString(this._v)) {
        return this._v;
      }
      throw new TypeError(_errorMessage(this._v, this._path, 'string'));
    }
  }, {
    key: 'stringOrNull',
    value: function stringOrNull() {
      if (_.isString(this._v)) {
        return this._v;
      }
      return null;
    }
  }, {
    key: 'toString',
    value: function toString() {
      return _.toString(this._v);
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
      var dateString = this.stringOrNull();
      var v = Date.parse(dateString || '');
      if (isNaN(v)) {
        return null;
      }

      return new Date(v);
    }
  }, {
    key: 'integer',
    value: function integer() {
      if (_.isInteger(this._v)) {
        return this._v;
      }

      throw new TypeError(_errorMessage(this._v, this._path, 'interger'));
    }
  }, {
    key: 'integerOrNull',
    value: function integerOrNull() {
      if (_.isInteger(this._v)) {
        return this._v;
      }

      return null;
    }
  }, {
    key: 'toInteger',
    value: function toInteger() {
      return _.toInteger(this._v);
    }
  }, {
    key: 'number',
    value: function number() {
      if (_.isNumber(this._v)) {
        return this._v;
      }

      throw new TypeError(_errorMessage(this._v, this._path, 'number'));
    }
  }, {
    key: 'numberOrNull',
    value: function numberOrNull() {
      if (_.isNumber(this._v)) {
        return this._v;
      }

      return null;
    }
  }, {
    key: 'toNumber',
    value: function toNumber() {
      return _.toNumber(this._v);
    }
  }, {
    key: 'bool',
    value: function bool() {
      if (_.isBoolean(this._v)) {
        return this._v;
      }

      throw new TypeError(_errorMessage(this._v, this._path, 'boolean'));
    }
  }, {
    key: 'boolOrNull',
    value: function boolOrNull() {
      if (_.isBoolean(this._v)) {
        return this._v;
      }

      return null;
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
    key: 'object',
    value: function object() {
      if (_.isObject(this._v)) {
        return this._v;
      }
      throw new TypeError(_errorMessage(this._v, this._path, 'Object'));
    }
  }, {
    key: 'objectOrNull',
    value: function objectOrNull() {
      if (_.isObject(this._v)) {
        return this._v;
      }
      return null;
    }
  }, {
    key: 'array',
    value: function array() {
      if (_.isArray(this._v)) {
        return this._v;
      }

      throw new TypeError(_errorMessage(this._v, this._path, 'Array'));
    }
  }, {
    key: 'arrayOrNull',
    value: function arrayOrNull() {
      if (_.isArray(this._v)) {
        return this._v;
      }

      return null;
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
    path = _.toPath(path);
  }
  var v = _.get(jsonLike, path);

  return new JValue(v, parentPath.concat(path));
}