import * as React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import { BrowserRouter as Router } from 'react-router-dom';

import Menu from './index';

let container = null;
let arr;
let buttonState = {
    active: '',
    default: '',
};

beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
    arr = [{
        id: '1',
        link: '/',
        text: 'Converter',
    }, {
        id: '2',
        link: '/list',
        text: 'Corrency list',
    }];
});

afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});

describe('Menu component', () => {
    it('counts of elements', () => {
        act(() => {
            render(<Router><Menu data={ arr }/></Router>, container);
        });

        expect(document.querySelectorAll('a').length).toBe(2);
    });


    it('check menu item text', () => {
        act(() => {
            render(<Router><Menu data={ arr }/></Router>, container);
        });

        expect(document.querySelectorAll('a')[0].textContent).toBe('Converter');
        expect(document.querySelectorAll('a')[1].textContent).toBe('Corrency list');
    });
});
