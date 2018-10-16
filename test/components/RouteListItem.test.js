import React from 'react';
import enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { formatLatitude, formatLongitude } from 'latlon-formatter';

import RouteListItem from '../../src/components/RouteListItem';

import { predefinedPoints } from '../constants';
import { DROPPABLE_ROUTE_LIST } from '../../src/constants';

enzyme.configure({ adapter: new Adapter() });

function onDragEnd() {}

function setup() {
    const index = 0;
    const props = Object.assign({
        index,
        removePoint: jest.fn()
    }, predefinedPoints[index]);
    const wrapper = mount(
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId={DROPPABLE_ROUTE_LIST} direction="vertical">
                {provided => (
                    <ul ref={provided.innerRef} {...provided.droppableProps}>
                        <RouteListItem {...props} />
                    </ul>
                )}
            </Droppable>
        </DragDropContext>
    );

    return {
        wrapper,
        props
    };
}

describe('route list item component', () => {
    it('render', () => {
        const { wrapper, props } = setup();
        const { name, latitude, longitude } = props;
        const formattedLatitude = formatLatitude(latitude, { degrees: true });
        const formattedLongitude = formatLongitude(longitude, { degrees: true });
        expect(wrapper.find('li').hasClass('route-list-item')).toBeTruthy();
        expect(wrapper.find('.route-list-item-name').text()).toEqual(name);
        const coordinateElements = wrapper.find('.route-list-item-coordinates span');
        expect(coordinateElements).toHaveLength(2);
        expect(coordinateElements.at(0).text()).toEqual(formattedLatitude);
        expect(coordinateElements.at(1).text()).toEqual(formattedLongitude);
        expect(wrapper.find('.route-list-item-remove')).toHaveLength(1);
    });

    it('call removePoint function on remove button click', () => {
        const { wrapper, props } = setup();
        const { id, removePoint } = props;
        wrapper.find('.route-list-item-remove').simulate('click');
        expect(removePoint.mock.calls).toHaveLength(1);
        expect(removePoint.mock.calls[0][0]).toEqual(id);
    });
});
