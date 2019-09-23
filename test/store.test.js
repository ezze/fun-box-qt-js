import { getStore } from '../src/store';

describe('store', () => {
  ['development', 'production'].forEach((mode, i) => {
    it(`create and access store in ${mode} mode`, async() => {
      const recreate = i > 0;
      global.NODE_ENV = mode;
      const store = await getStore(recreate);
      expect(store).toBeInstanceOf(Object);
      expect(store.dispatch).toBeInstanceOf(Function);
      expect(store.getState).toBeInstanceOf(Function);
      expect(store.subscribe).toBeInstanceOf(Function);
      expect(store).toEqual(await getStore());
      return Promise.resolve();
    });
  });
});
