import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

import Map from '../../src/components/Map';

function setup() {
    const props = {
        latitude: 30.0,
        longitude: 45.0,
        zoom: 9,
        points: [
            { id: 1, name: 'Yaroslavl', latitude: 57.6261, longitude: 39.8845 },
            { id: 2, name: 'Tver', latitude: 56.8587, longitude: 35.9176 },
            { id: 3, name: 'Moscow', latitude: 55.7558, longitude: 37.6173 },
            { id: 4, name: 'Sochi', latitude: 43.6028, longitude: 39.7342 }
        ],
        setCenter: jest.fn(),
        setZoom: jest.fn(),
        relocatePoint: jest.fn()
    };

    const wrapper = mount(<Map {...props} />);

    return {
        props,
        wrapper
    };
}

describe('map component', () => {
    it('rendering & map initialization', done => {
        const { wrapper, props } = setup();
        const mapComponent = wrapper.instance();

        const mapElement = wrapper.find('div').first();
        expect(mapElement.hasClass('map')).toBeTruthy();

        const { readyPromise } = mapComponent;
        readyPromise.then(() => {
            const { map } = mapComponent;
            expect(map.controls.add.mock.calls).toHaveLength(2);
            expect(map.events.add.mock.calls).toHaveLength(1);
            expect(map.geoObjects.add.mock.calls).toHaveLength(props.points.length + 1);
            done();
        });
    });
});
