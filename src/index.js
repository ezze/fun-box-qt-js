import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { DragDropContext } from 'react-beautiful-dnd';

import './index.sass';

import { getStore } from './store';
import createDragDropDispatcher from './createDragDropDispatcher';
import App from './components/App';

document.addEventListener('DOMContentLoaded', async() => {
    const store = await getStore();
    const dragDropDispatcher = createDragDropDispatcher(store);
    render(
        <Provider store={store}>
            <DragDropContext onDragEnd={dragDropDispatcher.onDragEnd}>
                <App />
            </DragDropContext>
        </Provider>,
        document.querySelector('#root')
    );
});
