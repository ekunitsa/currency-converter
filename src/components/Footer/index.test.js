import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';

import Footer from './index';

let container = null;

beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
});

afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});

describe('Footer component', () => {
    it('render with default props', () => {
        act(() => {
            render(<Footer/>, container);
        });

        expect(container.textContent).toBe('Copyright');
    });

    it('render with "msg" props', () => {
        act(() => {
            render(<Footer copy='Some copyright text'/>, container);
        });

        expect(container.textContent).toBe('Some copyright text');
    });
});
