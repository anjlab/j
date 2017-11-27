// @flow

import get from 'lodash/get';
import isArray from 'lodash/isArray';
import isBoolean from 'lodash/isBoolean';
import isEmpty from 'lodash/isEmpty';
import isInteger from 'lodash/isInteger';
import isNumber from 'lodash/isNumber';
import isObject from 'lodash/isObject';
import isString from 'lodash/isString';
import toInteger from 'lodash/toInteger';
import toNumber from 'lodash/toNumber';
import toPath from 'lodash/toPath';
import toString from 'lodash/toString';

function _errorMessage(value: any, path: string[], type: string): string {
  return `Cant't cast '${value}' at ${path.join('.')} to ${type}`;
}

export class JRaw {
  _v: any;
  _path: string[];

  constructor(v: any, path: string[]) {
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
  _v: {};
  _path: string[];

  get(path: string | string[] | null): JValue {
    return jj(this._v, path, this._path);
  }
}

export class JValue extends JRaw {
  _v: any;
  _path: string[];

  string(): string {
    if (isString(this._v)) {
      return this._v;
    }
    throw new TypeError(_errorMessage(this._v, this._path, 'string'));
  }

  stringOrNull(): ?string {
    if (isString(this._v)) {
      return this._v;
    }
    return null;
  }

  stringOrDefault(defaultValue: string): string {
    const value = this.stringOrNull();
    return value == null ? defaultValue : value;
  }

  toString(): string {
    return toString(this._v);
  }

  date(): Date {
    const v = this.dateOrNull();

    if (v == null) {
      throw new TypeError(_errorMessage(this._v, this._path, 'Date'));
    }
    return v;
  }

  dateOrNull(): ?Date {
    const v = this.timestampOrNull();
    if (v == null) {
      return null;
    }

    return new Date(v);
  }

  dateOrDefault(defaultValue: Date): Date {
    return this.dateOrNull() || defaultValue;
  }

  timestamp(): number {
    const v = this.timestampOrNull();
    if (v == null) {
      throw new TypeError(_errorMessage(this._v, this._path, 'Date timestamp'));
    }

    return v;
  }

  timestampOrNull(): ?number {
    const dateString = this.stringOrNull();
    const v = Date.parse(dateString || '');
    if (isNaN(v)) {
      return null;
    }

    return v;
  }

  timestampOrDefault(defaultValue: number): number {
    const v = this.timestampOrNull();
    if (v == null) {
      return defaultValue;
    }

    return v;
  }

  integer(): number {
    if (isInteger(this._v)) {
      return this._v;
    }

    throw new TypeError(_errorMessage(this._v, this._path, 'interger'));
  }

  integerOrNull(): ?number {
    if (isInteger(this._v)) {
      return this._v;
    }

    return null;
  }

  integerOrDefault(defaultValue: number): number {
    const value = this.integerOrNull();
    return value == null ? defaultValue : value;
  }

  toInteger(): number {
    return toInteger(this._v);
  }

  number(): number {
    if (isNumber(this._v)) {
      return this._v;
    }

    throw new TypeError(_errorMessage(this._v, this._path, 'number'));
  }

  numberOrNull(): ?number {
    if (isNumber(this._v)) {
      return this._v;
    }

    return null;
  }

  numberOrDefault(defaultValue: number): number {
    const value = this.numberOrNull();
    return value == null ? defaultValue : value;
  }

  toNumber(): number {
    return toNumber(this._v);
  }

  bool(): boolean {
    if (isBoolean(this._v)) {
      return this._v;
    }

    throw new TypeError(_errorMessage(this._v, this._path, 'boolean'));
  }

  boolOrNull(): ?boolean {
    if (isBoolean(this._v)) {
      return this._v;
    }

    return null;
  }

  boolOrDefault(defaultValue: boolean): boolean {
    const value = this.boolOrNull();
    return value == null ? defaultValue : value;
  }

  toBool(): boolean {
    if (
      this._v == null ||
      this._v === false ||
      this._v === 0 ||
      this._v === 'false'
    ) {
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

  objOrDefault(defaultValue: JObj): JObj {
    return this.objOrNull() || defaultValue;
  }

  object(): {} {
    if (isObject(this._v)) {
      return this._v;
    }
    throw new TypeError(_errorMessage(this._v, this._path, 'Object'));
  }

  objectOrNull(): ?{} {
    if (isObject(this._v)) {
      return this._v;
    }
    return null;
  }

  objectOrDefault(defaultObject: Object): {} {
    return this.objectOrNull() || defaultObject;
  }

  array(): Array<*> {
    if (isArray(this._v)) {
      return this._v;
    }

    throw new TypeError(_errorMessage(this._v, this._path, 'Array'));
  }

  arrayOrNull(): ?Array<*> {
    if (isArray(this._v)) {
      return this._v;
    }

    return null;
  }

  arrayOrDefault(defaultValue: Array<*>): Array<*> {
    return this.arrayOrNull() || defaultValue;
  }
}

export default function jj(
  jsonLike: any,
  path: string | string[] | null = null,
  parentPath: string[] = ['<root>'],
): JValue {
  if (path == null) {
    return new JValue(jsonLike, parentPath);
  }
  if (typeof path == 'string') {
    path = toPath(path);
  }
  const v = get(jsonLike, path);

  return new JValue(v, parentPath.concat(path));
}
