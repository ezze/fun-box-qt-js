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
            const map = this.map = new ymaps.Map(this.mapContainer.current, {
                center: [57.6261, 39.8845],
                zoom: 13,
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
    id: PropTypes.string.isRequired
};

Map.defaultProps = {
    id: 'map'
};

export default Map;
