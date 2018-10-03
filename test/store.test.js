import { getStore, getStorePersistor } from '../src/store';

describe('store', () => {
    it('create and access store', async() => {
        global.NODE_ENV = 'production';
        const store = await getStore();
        expect(store).toBeInstanceOf(Object);
        expect(store.dispatch).toBeInstanceOf(Function);
        expect(store.getState).toBeInstanceOf(Function);
        expect(store.subscribe).toBeInstanceOf(Function);
        return Promise.resolve();
    });

    it('access store persistor', async() => {
        global.NODE_ENV = '';
        const storePersistor = await getStorePersistor();
        expect(storePersistor).toBeInstanceOf(Object);
        return Promise.resolve();
    });
});
