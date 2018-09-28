import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ymaps from 'ymaps';

import { mapControlMargin } from '../constants';

class Map extends Component {
    constructor(props) {
        super(props);
        this.mapContainer = React.createRef();
        this.map = null;
    }

    componentDidMount() {
        ymaps.ready(() => {
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
        });
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
