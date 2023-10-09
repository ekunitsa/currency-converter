import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';

import ResultString from './index';

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

describe('ResultString component', () => {
    it('render with default props', () => {
        act(() => {
            render(<ResultString number="10" currency="UAH"/>, container);
        });

        expect(container.textContent).toBe('Result: 10 UAH');
    });


    it('render with empty prop number', () => {
        act(() => {
            render(<ResultString number="" currency="UAH"/>, container);
        });

        expect(container.textContent).toBeFalsy();
    });


    it('render with empty prop currency', () => {
        act(() => {
            render(<ResultString number="10" currency=""/>, container);
        });

        expect(container.textContent).toBeFalsy();
    });
});
