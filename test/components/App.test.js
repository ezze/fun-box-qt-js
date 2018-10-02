import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import App from '../../src/components/App';

describe('application component', () => {
    it('rendering', () => {
        const renderer = new ShallowRenderer();
        renderer.render(<App />);
        const tree = renderer.getRenderOutput();
        expect(tree).toMatchSnapshot();
    });
});
