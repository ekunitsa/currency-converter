import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';

import Error from './index';

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

describe('Error component', () => {
    it('render with default props', () => {
        act(() => {
            render(<Error/>, container);
        });

        expect(container.textContent).toBe('Error');
    });

    it('render with "msg" props', () => {
        act(() => {
            render(<Error msg='Invalid data in input'/>, container);
        });

        expect(container.textContent).toBe('Invalid data in input');
    });
});
