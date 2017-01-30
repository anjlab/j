// @flow

const _ = require('lodash');

function _errorMessage(value: any, path:string[], type: string):string {
  return `Cant't cast '${ value }' at ${ path.join('.') } to ${ type }`
}

export class JRaw {
  _v: any;
  _path: string[]

  constructor(v: any, path:string[]) {
    this._v = v;
    this._path = path;
  }

  isEmpty(): boolean {
    return _.isEmpty(this._v);
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
    if (_.isString(this._v)) {
      return this._v;
    }
    throw new TypeError(_errorMessage(this._v, this._path, 'string'))
  }

  stringOrNull(): ?string {
    if (_.isString(this._v)) {
      return this._v;
    }
    return null;
  }

  toString(): string {
    return _.toString(this._v)
  }

  date(): Date {
    const v = this.dateOrNull()

    if (v == null) {
      throw new TypeError(_errorMessage(this._v, this._path, 'Date'))
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
    if (_.isInteger(this._v)) {
      return this._v;
    }

    throw new TypeError(_errorMessage(this._v, this._path, 'interger'))
  }

  integerOrNull(): ?number {
    if (_.isInteger(this._v)) {
      return this._v;
    }

    return null;
  }

  toInteger(): number {
    return _.toInteger(this._v);
  }

  number(): number {
    if (_.isNumber(this._v)) {
      return this._v;
    }

    throw new TypeError(_errorMessage(this._v, this._path, 'number'))
  }

  numberOrNull(): ?number {
    if (_.isNumber(this._v)) {
      return this._v;
    }

    return null;
  }

  toNumber(): number {
    return _.toNumber(this._v);
  }

  bool(): boolean {
    if (_.isBoolean(this._v)) {
      return this._v;
    }

    throw new TypeError(_errorMessage(this._v, this._path, 'boolean'))
  }

  boolOrNull(): ?boolean {
    if (_.isBoolean(this._v)) {
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
    if (_.isObject(this._v)){
      return this._v;
    }
    throw new TypeError(_errorMessage(this._v, this._path, 'Object'))
  }

  objectOrNull(): ?{} {
    if (_.isObject(this._v)){
      return this._v;
    }
    return null;
  }

  array(): [] {
    if (_.isArray(this._v)) {
      return this._v;
    }

    throw new TypeError(_errorMessage(this._v, this._path, 'Array'))
  }

  arrayOrNull(): ?[] {
    if (_.isArray(this._v)) {
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
    path = _.toPath(path);
  }
  const v = _.get(jsonLike, path)

  return new JValue(v, parentPath.concat(path));
}

