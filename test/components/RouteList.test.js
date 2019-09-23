import React from 'react';
import Immutable from 'immutable';
import enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Provider } from 'react-redux';
import { DragDropContext } from 'react-beautiful-dnd';
import configureStore from 'redux-mock-store';

import RouteList from '../../src/components/RouteList';
import RouteListItem from '../../src/components/RouteListItem';

import { predefinedPoints } from '../constants';

enzyme.configure({ adapter: new Adapter() });
const mockStore = configureStore();
function onDragEnd() {}

function setup() {
  const store = mockStore(Immutable.fromJS({
    route: {
      points: predefinedPoints
    }
  }));

  const props = {
    pointIds: predefinedPoints.map(point => point.id)
  };

  const wrapper = mount(
    <Provider store={store}>
      <DragDropContext onDragEnd={onDragEnd}>
        <RouteList {...props} />
      </DragDropContext>
    </Provider>
  );

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
