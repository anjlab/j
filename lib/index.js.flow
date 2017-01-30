// @flow

const isString = require('lodash/isString');
const toString = require('lodash/toString');
const isInteger = require('lodash/isInteger');
const toInteger = require('lodash/toInteger');
const isEmpty = require('lodash/isEmpty');
const isNumber = require('lodash/isNumber');
const toNumber = require('lodash/toNumber');
const isBoolean = require('lodash/isBoolean');
const isArray = require('lodash/isArray');
const isObject = require('lodash/isObject');
const get = require('lodash/get');
const toPath = require('lodash/toPath');

function _errorMessage(value: any, path:string[], type: string):string {
  return `Cant't cast '${value}' at ${toString(path.join('.'))} to ${type}`
}

export class JRaw {
  _v: any;
  _path: string[]

  constructor(v: any, path:string[]) {
    this._v = v;
    this._path = path;
  }

  isEmpty(): boolean {
    return isEmpty(this._v);
  }

  raw(): {} {
    return this._v;
  }
}

export class JObj extends JRaw {
  _v: {}
  _path: string[]

  get(path: string | string[] | null): JValue {
    return jj(this._v, path, this._path)
  }
}

export class JValue extends JRaw {
  _v: any;
  _path: string[]

  string(): string {
    if (isString(this._v)) {
      return this._v;
    }
    throw new Error(_errorMessage(this._v, this._path, 'string'))
  }

  stringOrNull(): ?string {
    if (isString(this._v)) {
      return this._v;
    }
    return null;
  }

  toString(): string {
    return toString(this._v)
  }

  date(): Date {
    const v = this.dateOrNull()

    if (v == null) {
      throw new Error(_errorMessage(this._v, this._path, 'Date'))
    }
    return v;
  }

  dateOrNull(): ?Date {
    const dateString = this.stringOrNull();
    const v = Date.parse(dateString || '');
    if (isNaN(v)) {
      return null;
    }

    return new Date(v);
  }

  integer(): number {
    if (isInteger(this._v)) {
      return this._v;
    }

    throw new Error(_errorMessage(this._v, this._path, 'interger'))
  }

  integerOrNull(): ?number {
    if (isInteger(this._v)) {
      return this._v;
    }

    return null;
  }

  toInteger(): number {
    return toInteger(this._v);
  }

  number(): number {
    if (isNumber(this._v)) {
      return this._v;
    }

    throw new Error(_errorMessage(this._v, this._path, 'number'))
  }

  numberOrNull(): ?number {
    if (isNumber(this._v)) {
      return this._v;
    }

    return null;
  }

  toNumber(): number {
    return toNumber(this._v);
  }

  bool(): boolean {
    if (isBoolean(this._v)) {
      return this._v;
    }

    throw new Error(_errorMessage(this._v, this._path, 'boolean'))
  }

  boolOrNull(): ?boolean {
    if (isBoolean(this._v)) {
      return this._v;
    }

    return null;
  }

  toBool(): boolean {
    if (this._v === false || this._v === 0) {
      return false;
    }

    return true;
  }

  obj(): JObj {
    return new JObj(this.object(), this._path);
  }

  objOrNull(): ?JObj {
    let v = this.objectOrNull();

    if (v != null) {
      return new JObj(v, this._path);
    }

    return null;
  }

  object(): {} {
    if (isObject(this._v)){
      return this._v;
    }
    throw new Error(_errorMessage(this._v, this._path, 'Object'))
  }

  objectOrNull(): ?{} {
    if (isObject(this._v)){
      return this._v;
    }
    return null;
  }

  array(): [] {
    if (isArray(this._v)) {
      return this._v;
    }

    throw new Error(_errorMessage(this._v, this._path, 'Array'))
  }

  arrayOrNull(): ?[] {
    if (isArray(this._v)) {
      return this._v;
    }

    return null;
  }
}

export default function jj(jsonLike: any, path: string | string[] | null = null, parentPath:string[] = ['<root>']): JValue {
  if (path == null) {
    return new JValue(jsonLike, parentPath)
  }
  if (typeof path == 'string') {
    path = toPath(path);
  }
  const v = get(jsonLike, path)

  return new JValue(v, parentPath.concat(path));
}

