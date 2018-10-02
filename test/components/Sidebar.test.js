import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import Sidebar from '../../src/components/Sidebar';

describe('sidebar component', () => {
    it('rendering', () => {
        const renderer = new ShallowRenderer();
        renderer.render(<Sidebar />);
        const tree = renderer.getRenderOutput();
        expect(tree).toMatchSnapshot();
    });
});
