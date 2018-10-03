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
    const mapComponent = wrapper.instance();
    const { readyPromise } = mapComponent;

    return {
        wrapper,
        props,
        mapComponent,
        readyPromise
    };
}

describe('map component', () => {
    it('render and initialize map', done => {
        const { wrapper, props, mapComponent, readyPromise } = setup();

        const mapElement = wrapper.find('div').first();
        expect(mapElement.hasClass('map')).toBeTruthy();

        readyPromise.then(() => {
            const { map } = mapComponent;
            expect(map).toBeTruthy();
            expect(map.controls.add.mock.calls).toHaveLength(2);
            expect(map.controls.add.mock.calls[0][0]).toEqual('typeSelector');
            expect(map.controls.add.mock.calls[1][0]).toEqual('zoomControl');
            expect(map.events.add.mock.calls).toHaveLength(1);
            expect(map.events.add.mock.calls[0][0]).toEqual('actionend');
            expect(map.geoObjects.add.mock.calls).toHaveLength(props.points.length + 1);
            expect(mapComponent.routePolyline).toBeTruthy();
            expect(mapComponent.placemarks).toHaveLength(props.points.length);
            done();
        });
    });

    it('handle actionend event of the map', done => {
        const { props, mapComponent, readyPromise } = setup();

        readyPromise.then(() => {
            const { map } = mapComponent;
            const latitude = 32.0;
            const longitude = 44.0;
            const zoom = 10;
            map.getCenter.mockReturnValueOnce([latitude, longitude]);
            map.getZoom.mockReturnValueOnce(zoom);
            map.events.trigger('actionend');
            expect(props.setCenter.mock.calls).toHaveLength(1);
            expect(props.setCenter.mock.calls[0][0]).toEqual(latitude);
            expect(props.setCenter.mock.calls[0][1]).toEqual(longitude);
            expect(props.setZoom.mock.calls).toHaveLength(1);
            expect(props.setZoom.mock.calls[0][0]).toEqual(zoom);
            done();
        });
    });

    it('handle update on point add', done => {
        const { wrapper, props, mapComponent, readyPromise } = setup();

        readyPromise.then(() => {
            const { map } = mapComponent;
            mapComponent.routePolyline.geometry.setCoordinates.mockClear();
            map.geoObjects.add.mockClear();
            const points = props.points.concat({ id: 5, name: 'My point', latitude: 30.0, longitude: 45.0 });
            wrapper.setProps({ points }, () => {
                expect(mapComponent.routePolyline.geometry.setCoordinates.mock.calls).toHaveLength(1);
                expect(mapComponent.placemarks).toHaveLength(points.length);
                expect(map.geoObjects.add.mock.calls).toHaveLength(1);
                done();
            });
        });
    });

    it('handle update on point remove', done => {
        const { wrapper, props, mapComponent, readyPromise } = setup();

        readyPromise.then(() => {
            const { map } = mapComponent;
            mapComponent.routePolyline.geometry.setCoordinates.mockClear();
            map.geoObjects.remove.mockClear();
            const removeId = 2;
            const points = props.points.filter(point => point.id !== removeId);
            wrapper.setProps({ points }, () => {
                expect(mapComponent.routePolyline.geometry.setCoordinates.mock.calls).toHaveLength(1);
                expect(mapComponent.placemarks).toHaveLength(points.length);
                expect(map.geoObjects.remove.mock.calls).toHaveLength(1);
                done();
            });
        });
    });

    it('destroy map', done => {
        const { props, mapComponent, readyPromise } = setup();

        readyPromise.then(() => {
            const { map } = mapComponent;
            mapComponent.componentWillUnmount();
            expect(map.geoObjects.remove.mock.calls).toHaveLength(props.points.length + 1);
            expect(map.destroy.mock.calls).toHaveLength(1);
            expect(mapComponent.routePolyline).toBeFalsy();
            expect(mapComponent.placemarks).toHaveLength(0);
            done();
        });
    });
});
