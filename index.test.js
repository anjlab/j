//@flow

import jj from '.'

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
    }
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
