import * as React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import Form from './index';

jest.mock('react-redux', () => ({
    useDispatch: () => {},
    useSelector: () => ([
        {
            id: 'stringForm',
            text: '',
        }, {
            id: 'tableForm',
            text: 'USD',
        },
    ]),
}));

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

describe('Form component', () => {
    it('render with mandatory props', () => {
        const onSubmit = jest.fn();

        act(() => {
            render(<Form btnText="Button text" label="Label name" onSubmit={onSubmit} id="stringForm"/>, container);
        });

        expect(document.querySelector('#stringForm').getAttribute('id')).toBe('stringForm');
        expect(document.querySelector('label').textContent).toBe('Label name');
        expect(document.querySelector('input[type="submit"]').getAttribute('value')).toBe('Button text');
        expect(onSubmit).toBeDefined();
    });
});
