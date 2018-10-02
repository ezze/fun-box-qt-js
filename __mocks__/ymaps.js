const ymaps = {
    ready: jest.fn(cb => setTimeout(cb, 500)),
    Map: jest.fn(() => {
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
            getCenter: jest.fn(),
            getZoom: jest.fn()
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
