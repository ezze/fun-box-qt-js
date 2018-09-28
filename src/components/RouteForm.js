import React, { Component } from 'react';
import PropTypes from 'prop-types';

class RouteForm extends Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.nameRef = React.createRef();
    }

    componentDidUpdate(prevProps) {
        if (this.props.pointsCount > prevProps.pointsCount) {
            this.nameRef.current.value = '';
        }
    }

    render() {
        const { error } = this.props;
        const errorBlock = error ? (
            <div className="route-form-error">{error}</div>
        ) : '';

        return (
            <form className="route-form" onSubmit={this.onSubmit}>
                <input ref={this.nameRef} className="route-form-input" type="text" />
                {errorBlock}
            </form>
        );
    }

    onSubmit(event) {
        event.preventDefault();
        const nameInput = this.nameRef.current;
        const name = nameInput.value;
        const { addPoint, latitude, longitude } = this.props;
        addPoint(name, latitude, longitude);
    }
}

RouteForm.propTypes = {
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired,
    pointsCount: PropTypes.number.isRequired,
    error: PropTypes.string,
    addPoint: PropTypes.func.isRequired
};

export default RouteForm;
