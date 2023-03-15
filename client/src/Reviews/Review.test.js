import React from 'react'
import axios from 'axios'
import '@testing-library/jest-dom'
import {render, fireEvent, waitFor, screen} from '@testing-library/react'
import Reviews from './Reviews.jsx';

const request = (endpoint, params={}, method='get') => {
  return axios({
    method: method,
    url: endpoint,
    params: params
  })
}

describe('Reviews', () => {
  test('Review List should render to page', () => {
    const { getByText } = render(<Reviews request={request}/>)
    expect(getByText('Review Widget')).toBeInTheDocument();
  });
})