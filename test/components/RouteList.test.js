import React from 'react';
import enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { DragDropContext } from 'react-beautiful-dnd';

import RouteList from '../../src/components/RouteList';
import RouteListItem from '../../src/components/RouteListItem';

import { predefinedPoints } from '../constants';

enzyme.configure({ adapter: new Adapter() });

function onDragEnd() {}

function setup() {
    const props = {
        points: predefinedPoints,
        removePoint: jest.fn()
    };

    const wrapper = mount(
        <DragDropContext onDragEnd={onDragEnd}>
            <RouteList {...props} />
        </DragDropContext>
    );
    const routeListComponent = wrapper.instance();

    return {
        wrapper,
        props,
        routeListComponent
    };
}

describe('route list component', () => {
    it('render', () => {
        const { wrapper, props } = setup();
        const { points, removePoint } = props;
        expect(wrapper.find('ul').first().hasClass('route-list')).toBeTruthy();
        const routeListItemComponents = wrapper.find(RouteListItem);
        expect(routeListItemComponents).toHaveLength(points.length);
        for (let i = 0; i < points.length; i++) {
            const point = points[i];
            const routeListItemComponent = routeListItemComponents.at(i);
            for (const name in point) {
                if (!point.hasOwnProperty(name)) {
                    continue;
                }
                expect(routeListItemComponent.props()[name]).toEqual(point[name]);
            }
            expect(routeListItemComponent.props().removePoint).toEqual(removePoint);
        }
    });
});
