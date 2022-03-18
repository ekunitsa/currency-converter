import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import ResultTable from "./index";

let container = null;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

describe('ResultTable component', () => {
  it("render with default props", () => {
    act(() => {
      const data = [{
        //to do )
      }]
      render(<ResultTable data={}/>, container);
    });
    expect(container.textContent).toBe("Result: 10 UAH");
  });
});