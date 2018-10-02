import {
    defaultMapLatitude,
    defaultMapLongitude,
    defaultMapZoom
} from '../src/constants';

const ymaps = {
    ready: jest.fn(cb => setTimeout(cb, 500)),
    Map: jest.fn((container, options) => {
        options = options || {};

        const {
            center = [defaultMapLatitude, defaultMapLongitude],
            zoom = defaultMapZoom
        } = options;

        return {
            controls: {
                add: jest.fn()
            },
            events: {
                add: jest.fn()
            },
            geoObjects: {
                add: jest.fn(),
                remove: jest.fn()
            },
            getCenter: jest.fn(() => center),
            getZoom: jest.fn(() => zoom)
        };
    }),
    Polyline: jest.fn(() => {
        return {
            geometry: {
                setCoordinates: jest.fn()
            }
        };
    }),
    Placemark: jest.fn(() => {
        return {
            events: {
                add: jest.fn()
            }
        };
    })
};

export default ymaps;
