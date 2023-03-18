import React from 'react'
import axios from 'axios'
import '@testing-library/jest-dom'
import {render, fireEvent, waitFor, screen} from '@testing-library/react'

import Reviews from './Reviews.jsx';

const request = async (endpoint, params={}, method='get') => {
  return axios({
    method: method,
    url: endpoint,
    params: params
  }).then((response) => response.data)
}

describe('Reviews', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  test('Reviews should render to page', async () => {
      const widget = render(<Reviews request={request}/>)
      const reviewDiv = widget.container.querySelector('#reviews');
      await waitFor(() => {
        expect(reviewDiv.id).toEqual('reviews');
      })
  });

  test('Reviews should render to 2 child components', async () => {
      const widget = render(<Reviews request={request}/>)
      const reviewDiv = widget.container.querySelector('#reviews');
      await waitFor(() => {
        expect(reviewDiv.children.length).toBe(2);
      })
  });
})