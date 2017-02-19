//@flow

import jj, { JObj } from '../src'

test('json utitity', () => {
  let jsonObj = {
    stringValue: 'yury',
    boolValue: true,
    boolFalseValue: false,

    nested: {
      integer: 1,
      bool: 1,
      boolFalse: 0,
      array: [1, 2, 3],
      createdAt: '2017-01-21T12:45:55.000Z'
    },
  }

  const stringValue = jj(jsonObj, 'stringValue').string()

  expect(stringValue).toEqual('yury');

  const boolValue = jj(jsonObj, 'boolValue').bool()
  expect(boolValue).toEqual(true);
  expect(jj(jsonObj, 'boolValue').boolOrNull() ).toBe(true);

  const boolFalseValue = jj(jsonObj, 'boolFalseValue').bool()
  expect(boolFalseValue).toEqual(false);

  const nestedIntValue = jj(jsonObj, 'nested.integer').integer()
  expect(nestedIntValue).toEqual(1);

  const nested = jj(jsonObj, 'nested').obj()
  expect(nestedIntValue).toEqual(1);

  const nestedInteger = nested.get('integer').integer()
  expect(nestedInteger).toEqual(1)

  const nestedNumber = nested.get('integer').numberOrNull()
  expect(nestedNumber).toEqual(1)

  const nestedArray = nested.get('array').array()
  expect(nestedArray).toEqual([1, 2, 3])
  const nestedArrayOrNull = nested.get('array').arrayOrNull()
  expect(nestedArrayOrNull).toEqual([1, 2, 3]);

  const nestedDate = nested.get('createdAt').date()
  expect(nestedDate.getUTCDate()).toEqual(21)
  expect(nestedDate.getUTCMonth()).toEqual(0)
  expect(nestedDate.getUTCFullYear()).toEqual(2017)
  expect(nestedDate.getUTCMinutes()).toEqual(45)
  expect(nestedDate.getUTCHours()).toEqual(12)

  expect(nested.get('bool').toBool()).toBe(true)
  expect(nested.get('boolFalse').toBool()).toBe(false)
  expect(nested.get('bool').boolOrNull()).toBe(null)
});

test('json default values', () => {
  const jsonObject = {
    emptyString: '',
    zeroNumber: 0,
    falseBool: false,
  };

  const defaultString = jj(jsonObject, 'someKey1').stringOrDefault('value');
  expect(defaultString).toEqual('value');
  expect(jj(jsonObject, 'emptyString').stringOrDefault('value')).toEqual('');

  const defaultValueOfDate = new Date();
  const defaultDate = jj(jsonObject, 'someKey2').dateOrDefault(defaultValueOfDate);

  expect(defaultDate.getUTCDate()).toEqual(defaultValueOfDate.getUTCDate());
  expect(defaultDate.getUTCMonth()).toEqual(defaultValueOfDate.getUTCMonth());
  expect(defaultDate.getUTCFullYear()).toEqual(defaultValueOfDate.getUTCFullYear());
  expect(defaultDate.getUTCMinutes()).toEqual(defaultValueOfDate.getUTCMinutes());
  expect(defaultDate.getUTCHours()).toEqual(defaultValueOfDate.getUTCHours());

  const defaultInteger = jj(jsonObject, 'someKey3').integerOrDefault(999);
  expect(defaultInteger).toEqual(999);
  expect(jj(jsonObject, 'zeroNumber').integerOrDefault(1)).toEqual(0);

  const defaultNumber = jj(jsonObject, 'someKey4').numberOrDefault(998);
  expect(defaultNumber).toEqual(998);
  expect(jj(jsonObject, 'zeroNumber').numberOrDefault(1)).toEqual(0);

  const defaultBool = jj(jsonObject, 'someKey5').boolOrDefault(true);
  expect(defaultBool).toBe(true);
  expect(jj(jsonObject, 'falseBool').boolOrDefault(true)).toBe(false);

  const defaultValueOfJObj = new JObj({}, ['somePath']);
  const defaultObj = jj(jsonObject, 'someKey6').objOrDefault(defaultValueOfJObj);

  expect(defaultObj instanceof JObj).toBe(true);
  expect(defaultObj.isEmpty()).toEqual(defaultValueOfJObj.isEmpty());
  expect(defaultObj.raw()).toEqual(defaultValueOfJObj.raw());

  const defaultValueOfObject = { key: 'a' };
  const defaultObject = jj(jsonObject, 'someKey7').objectOrDefault(defaultValueOfObject);

  expect(Object.keys(defaultObject)).toEqual(Object.keys(defaultValueOfObject));
  expect(Object.values(defaultObject)).toEqual(Object.values(defaultValueOfObject));

  const defaultArray = jj(jsonObject, 'someKey8').arrayOrDefault([1, 2, 'abc']);
  expect(defaultArray).toEqual([1, 2, 'abc']);
});

test('json utitity errors', () => {
  let jsonObj = {
    stringValue: 'yury',
    boolValue: true,
    boolFalseValue: false,

    nested: {
      integer: 1,
      array: [1, 2, 3]
    }
  }
});
