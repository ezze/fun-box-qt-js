import { reducerMap } from '../../src/reducers';
import map from '../../src/reducers/map';
import route from '../../src/reducers/route';

describe('root reducer', () => {
  it('proper reducers are mapped', () => {
    expect(reducerMap.map).toEqual(map);
    expect(reducerMap.route).toEqual(route);
  });
});
