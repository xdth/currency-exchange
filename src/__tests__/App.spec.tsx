import React from 'react';
import { cleanup, render } from '@testing-library/react';
import App from '../App';

describe('App component', () => {

  afterEach(cleanup);

  it('sums numbers', () => {
    expect(1+2).toEqual(3);
    expect(2+2).toEqual(4);
  });
  it('should take a snapshot of App', () => {
    const { asFragment } = render(<App />);
    expect(asFragment(<App />)).toMatchSnapshot()
  });
});