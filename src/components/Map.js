import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ymaps from 'ymaps';

import { mapControlMargin } from '../constants';

class Map extends Component {
    constructor(props) {
        super(props);
        this.mapContainer = React.createRef();
        this.map = null;
        this.routePolyline = null;
    }

    componentDidMount() {
        ymaps.ready(() => this.createMap());
    }

    componentDidUpdate(prevProps) {
        const { route } = this.props;
        if (route.length !== prevProps.route.length || JSON.stringify(route) !== JSON.stringify(prevProps.route)) {
            this.updateRoute();
        }
    }

    componentWillUnmount() {
        this.destroyMap();
    }

    createMap() {
        const { latitude, longitude, zoom } = this.props;

        const map = this.map = new ymaps.Map(this.mapContainer.current, {
            center: [latitude, longitude],
            zoom,
            controls: []
        });

        const { controls } = map;
        controls.add('typeSelector', {
            position: {
                top: mapControlMargin,
                right: mapControlMargin
            }
        });
        controls.add('zoomControl', {
            position: {
                top: mapControlMargin,
                left: mapControlMargin
            }
        });

        map.events.add('actionend', () => {
            const center = map.getCenter();
            const zoom = map.getZoom();
            this.props.setCenter(center[0], center[1]);
            this.props.setZoom(zoom);
        });

        this.createRoute();
    }

    destroyMap() {
        this.destroyRoute();
        this.map.destroy();
        this.map = null;
    }

    createRoute() {
        const { route } = this.props;
        this.routePolyline = new ymaps.Polyline(route.map(point => {
            return [point.latitude, point.longitude];
        }), {}, {
            strokeColor: '#aa0000',
            strokeWidth: 3,
        });
        this.map.geoObjects.add(this.routePolyline);
    }

    updateRoute() {
        this.routePolyline.geometry.setCoordinates(this.props.route.map(point => {
            return [point.latitude, point.longitude];
        }));
    }

    destroyRoute() {
        this.map.geoObjects.remove(this.routePolyline);
        this.routePolyline = null;
    }

    render() {
        const { id } = this.props;
        return (
            <div id={id} className="map" ref={this.mapContainer}></div>
        );
    }
}

Map.propTypes = {
    id: PropTypes.string.isRequired,
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired,
    zoom: PropTypes.number.isRequired,
    route: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        latitude: PropTypes.number.isRequired,
        longitude: PropTypes.number.isRequired
    })).isRequired,
    setCenter: PropTypes.func.isRequired,
    setZoom: PropTypes.func.isRequired
};

Map.defaultProps = {
    id: 'map'
};

export default Map;
