import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import './index.sass';

import { getStore } from './store';
import App from './components/App';

document.addEventListener('DOMContentLoaded', async() => {
    const store = await getStore();
    render(
        <Provider store={store}>
            <App />
        </Provider>,
        document.querySelector('#root')
    );
});
