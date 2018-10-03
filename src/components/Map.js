import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ymaps from 'ymaps';

import { mapControlMargin } from '../constants';

function ymapsReady() {
    return new Promise(resolve => ymaps.ready(resolve));
}

class Map extends Component {
    constructor(props) {
        super(props);
        this.mapContainer = React.createRef();
        this.map = null;
        this.routePolyline = null;
        this.placemarks = [];
        this.readyPromise = null;
    }

    componentDidMount() {
        this.readyPromise = ymapsReady().then(() => this.createMap());
    }

    componentDidUpdate(prevProps) {
        const { points } = this.props;
        if (points.length !== prevProps.points.length || JSON.stringify(points) !== JSON.stringify(prevProps.points)) {
            this.updateRoute(prevProps.points);
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
        const { points } = this.props;

        const routePolylineGeometry = [];
        for (let i = 0; i < points.length; i++) {
            const point = points[i];
            const { latitude, longitude } = point;
            routePolylineGeometry.push([latitude, longitude]);
            this.createPlacemark(point);
        }

        this.routePolyline = new ymaps.Polyline(routePolylineGeometry, {}, {
            strokeColor: '#aa0000',
            strokeWidth: 3,
        });
        this.map.geoObjects.add(this.routePolyline);
    }

    updateRoute(prevPoints) {
        const { points } = this.props;

        const routePolylineGeometry = [];

        for (let i = 0; i < prevPoints.length; i++) {
            const prevPoint = prevPoints[i];
            const { id } = prevPoint;
            const point = points.find(point => point.id === id);
            if (!point) {
                this.destroyPlacemark(id);
            }
        }

        for (let i = 0; i < points.length; i++) {
            const point = points[i];
            const { id, latitude, longitude } = point;
            routePolylineGeometry.push([latitude, longitude]);
            const prevPoint = prevPoints.find(point => point.id === id);
            if (!prevPoint) {
                this.createPlacemark(point);
            }
        }

        this.routePolyline.geometry.setCoordinates(routePolylineGeometry);
    }

    destroyRoute() {
        const { points } = this.props;
        for (let i = 0; i < points.length; i++) {
            const point = points[i];
            this.destroyPlacemark(point.id);
        }

        this.map.geoObjects.remove(this.routePolyline);
        this.routePolyline = null;
    }

    createPlacemark(point) {
        const { id, name, latitude, longitude } = point;
        const placemark = new ymaps.Placemark([latitude, longitude], {
            balloonContent: name
        }, {
            draggable: true
        });
        placemark.events.add('drag', () => {
            const coordinates = placemark.geometry.getCoordinates();
            const latitude = coordinates[0];
            const longitude = coordinates[1];
            this.props.relocatePoint(id, latitude, longitude);
        });
        this.placemarks.push({
            id,
            geoObject: placemark
        });
        this.map.geoObjects.add(placemark);
    }

    destroyPlacemark(id) {
        const index = this.placemarks.findIndex(placemark => placemark.id === id);
        const placemark = this.placemarks[index];
        if (!placemark) {
            return;
        }
        const { geoObject } = placemark;
        this.map.geoObjects.remove(geoObject);
        this.placemarks.splice(index, 1);
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
    points: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        latitude: PropTypes.number.isRequired,
        longitude: PropTypes.number.isRequired
    })).isRequired,
    setCenter: PropTypes.func.isRequired,
    setZoom: PropTypes.func.isRequired,
    relocatePoint: PropTypes.func.isRequired
};

Map.defaultProps = {
    id: 'map'
};

export default Map;
