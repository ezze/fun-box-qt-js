import React from 'react';
import { render } from 'react-dom';

import './index.sass';
import App from './components/App';

document.addEventListener('DOMContentLoaded', () => {
    render(<App />, document.querySelector('#root'));
});
