import createDragDropDispatcher from '../src/createDragDropDispatcher';

import { DROPPABLE_ROUTE_LIST } from '../src/constants';

const store = {
  dispatch: jest.fn()
};

describe('create drag & drop dispatcher', () => {
  let dispatcher;

  beforeEach(() => {
    dispatcher = createDragDropDispatcher(store);
  });

  it('drag is ended without destination', () => {
    dispatcher.onDragEnd({});
    expect(store.dispatch.mock.calls).toHaveLength(0);
  });

  it('drag is ended with different source and destination droppableIds', () => {
    dispatcher.onDragEnd({
      source: {
        droppableId: 'droppable-1'
      },
      destination: {
        droppableId: 'droppable-2'
      }
    });
    expect(store.dispatch.mock.calls).toHaveLength(0);
  });

  it('drag is ended with equal source and destination indexes', () => {
    dispatcher.onDragEnd({
      source: {
        droppableId: DROPPABLE_ROUTE_LIST,
        index: 1
      },
      destination: {
        droppableId: DROPPABLE_ROUTE_LIST,
        index: 1
      }
    });
    expect(store.dispatch.mock.calls).toHaveLength(0);
  });

  it('moveRoutePoint action is dispatched on drag end', () => {
    dispatcher.onDragEnd({
      source: {
        droppableId: DROPPABLE_ROUTE_LIST,
        index: 1
      },
      destination: {
        droppableId: DROPPABLE_ROUTE_LIST,
        index: 2
      }
    });
    expect(store.dispatch.mock.calls).toHaveLength(1);
  });
});
