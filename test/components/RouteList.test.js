import React from 'react';
import enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { DragDropContext } from 'react-beautiful-dnd';

import RouteList from '../../src/components/RouteList';
import RouteListItem from '../../src/components/RouteListItem';

import { predefinedPoints } from '../constants';

enzyme.configure({ adapter: new Adapter() });

function onDragEnd() {}

function setup() {
  const props = {
    pointIds: predefinedPoints.map(point => point.id)
  };

  const wrapper = shallow(
    <DragDropContext onDragEnd={onDragEnd}>
      <RouteList {...props} />
    </DragDropContext>
  );

  console.log(wrapper);

  return {
    wrapper,
    props
  };
}

describe('route list component', () => {
  it('render', () => {
    const { wrapper, props } = setup();
    const { pointIds } = props;

    expect(wrapper.find('ul').first().hasClass('route-list')).toBeTruthy();
    const routeListItemComponents = wrapper.find(RouteListItem);
    expect(routeListItemComponents).toHaveLength(pointIds.length);
    for (let i = 0; i < pointIds.length; i++) {
      const id = pointIds[i];
      const routeListItemComponent = routeListItemComponents.at(i);
      expect(routeListItemComponent.props().id).toEqual(id);
    }
  });
});
