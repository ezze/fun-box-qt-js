import React from 'react';
import enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import RouteForm from '../../src/components/RouteForm';

enzyme.configure({ adapter: new Adapter() });

function setup() {
    const props = {
        latitude: 30.0,
        longitude: 45.0,
        pointsCount: 4,
        error: '',
        addPoint: jest.fn()
    };

    const wrapper = mount(<RouteForm {...props} />);

    return {
        wrapper,
        props
    };
}

describe('route form component', () => {
    it('render', () => {
        const { wrapper } = setup();
        expect(wrapper.exists('form')).toBeTruthy();
        expect(wrapper.exists('input')).toBeTruthy();
        expect(wrapper.find('form').hasClass('route-form')).toBeTruthy();
        expect(wrapper.find('input').hasClass('route-form-input')).toBeTruthy();
        expect(wrapper.find('.route-form-error')).toHaveLength(0);
    });

    it('call addPoint function on form submit', () => {
        const { wrapper, props } = setup();
        const name = 'My point';
        wrapper.find('input').instance().value = name;
        wrapper.find('form').simulate('submit', {
            preventDefault: jest.fn()
        });
        expect(props.addPoint.mock.calls).toHaveLength(1);
        expect(props.addPoint.mock.calls[0][0]).toEqual(name);
        expect(props.addPoint.mock.calls[0][1]).toEqual(props.latitude);
        expect(props.addPoint.mock.calls[0][2]).toEqual(props.longitude);
    });

    it('clear input on point add', done => {
        const { wrapper, props } = setup();
        wrapper.setProps({ pointsCount: props.pointsCount + 1 }, () => {
            expect(wrapper.find('input').instance().value).toEqual('');
            done();
        });
    });

    it('show error', done => {
        const { wrapper } = setup();
        const error = 'Some error occurred';
        wrapper.setProps({ error }, () => {
            expect(wrapper.find('.route-form-error')).toHaveLength(1);
            expect(wrapper.find('.route-form-error').text()).toEqual(error);
            done();
        });
    });
});
