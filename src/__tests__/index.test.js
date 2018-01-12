import Store from '../index';
import parseDate from '../parseDate';
import * as utils from '../utils';

describe('store', () => {
  const KEY = 'test';
  const DATES = '1h1m';
  const VALUE = { name: 'store name' };
  const PARAMS = { id: 123 };

  test('store set', () => {
    const store = new Store(KEY, DATES);

    store.set(VALUE);
    expect(JSON.parse(store.store[`NG__${KEY}`]).value).toEqual(VALUE);
    expect(JSON.parse(store.store[`NG__${KEY}`]).expire).toBeLessThan((utils.timeNow() + parseDate(DATES)));
    store.delete();
    expect(store.store[`NG__${KEY}`]).toBeUndefined();
    store.set(VALUE, PARAMS);
    expect(JSON.parse(store.store[`NG__${KEY}`]).params).toEqual(PARAMS);
    store.delete();
    expect(store.store[`NG__${KEY}`]).toBeUndefined();
  });

  test('store get', () => {
    const store = new Store(KEY, DATES);

    store.set(VALUE);
    expect(store.get()).toEqual(VALUE);
    store.delete();
    expect(store.get()).toEqual({});
  });

  test('store has', () => {
    const store = new Store(KEY, DATES);

    store.set(VALUE);
    expect(store.has()).toBeTruthy();
    store.delete();
    expect(store.has()).toBeFalsy();
  });

  test('store clear', () => {
    const store = new Store(KEY, DATES);

    store.set(VALUE);
    store.clear();
    expect(store.has()).toBeFalsy();
  });

  test('store clearAll', () => {
    const store = new Store(KEY, DATES);

    store.set(VALUE);
    store.clearAll();
    expect(store.has()).toBeFalsy();
  });
});
