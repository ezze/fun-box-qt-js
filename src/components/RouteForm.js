import React, { Component } from 'react';
import PropTypes from 'prop-types';

class RouteForm extends Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.nameRef = React.createRef();
    }

    render() {
        return (
            <form className="route-form" onSubmit={this.onSubmit}>
                <input ref={this.nameRef} className="route-form-input" type="text" />
            </form>
        );
    }

    onSubmit(event) {
        event.preventDefault();
        const nameInput = this.nameRef.current;
        const name = nameInput.value;
        nameInput.value = '';
        const { addPoint, latitude, longitude } = this.props;
        addPoint(name, latitude, longitude);
    }
}

RouteForm.propTypes = {
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired,
    addPoint: PropTypes.func.isRequired
};

export default RouteForm;
