import * as React from 'react';
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import {BrowserRouter as Router} from "react-router-dom";

import Menu from "./index";

let container = null;
let arr;
let activeClassName;
let defaultClassName;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
  arr = [{
    id: '1',
    link: '/',
    text: 'Converter'
  },{
    id: '2',
    link: '/list',
    text: 'Corrency list'
  }]
  activeClassName = ['bg-orange-500', 'inline-block', 'font-semibold', 'text-white', 'py-2', 'px-4', 'border', 'border-transparent', 'rounded', 'mr-2', 'sm:mr-0', 'ml-2', 'sm:ml-4'];
  defaultClassName = ['bg-transparent', 'hover:bg-orange-500', 'inline-block', 'text-white', 'font-semibold', 'py-2', 'px-4', 'border', 'border-orange-500', 'hover:border-transparent', 'rounded', 'mr-2', 'sm:mr-0', 'ml-2', 'sm:ml-4'];
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

describe('Menu component', () => {
  it("counts of elements", () => {
    act(() => {
      render(<Router><Menu data={arr}/></Router>, container);
    });

    expect(document.querySelectorAll("a").length).toBe(2);
  });


  it("check menu item text", () => {
    act(() => {
      render(<Router><Menu data={arr}/></Router>, container);
    });

    expect(document.querySelectorAll("a")[0].textContent).toBe('Converter');
    expect(document.querySelectorAll("a")[1].textContent).toBe('Corrency list');
  });

  it("check menu active classes", () => {
    act(() => {
      render(<Router><Menu data={arr}/></Router>, container);
    });

    for (let i = 0; i < activeClassName.length; i++) {
      expect(document.querySelectorAll("a")[0].classList.item(i)).toBe(activeClassName[i]);
    }
  });

  it("check menu unactive classes", () => {
    act(() => {
      render(<Router><Menu data={arr}/></Router>, container);
    });

    for (let i = 0; i < defaultClassName.length; i++) {
      expect(document.querySelectorAll("a")[1].classList.item(i)).toBe(defaultClassName[i]);
    }
  });
});