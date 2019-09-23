import {
  defaultMapLatitude,
  defaultMapLongitude,
  defaultMapZoom
} from '../src/constants';

const ymaps = {
  ready: jest.fn(cb => setTimeout(cb, 200)),
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
      events: createEvents(),
      geoObjects: {
        add: jest.fn(),
        remove: jest.fn()
      },
      getCenter: jest.fn(() => center),
      getZoom: jest.fn(() => zoom),
      destroy: jest.fn()
    };
  }),
  Polyline: jest.fn(() => {
    return {
      geometry: {
        getCoordinates: jest.fn(),
        setCoordinates: jest.fn()
      }
    };
  }),
  Placemark: jest.fn(() => {
    return {
      events: createEvents(),
      geometry: {
        getCoordinates: jest.fn(),
        setCoordinates: jest.fn()
      }
    };
  })
};

function createEvents() {
  const listeners = {};
  return {
    add: jest.fn((event, listener) => {
      if (!Array.isArray(listeners[event])) {
        listeners[event] = [];
      }
      listeners[event].push(listener);
    }),
    trigger(event) {
      const eventListeners = listeners[event] || [];
      for (let i = 0; i < eventListeners.length; i++) {
        eventListeners[i]();
      }
    }
  };
}

export default ymaps;
