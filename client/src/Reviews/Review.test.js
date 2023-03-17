import React from 'react'
import axios from 'axios'
import '@testing-library/jest-dom'
import {render, fireEvent, waitFor, screen} from '@testing-library/react'

import Reviews from './Reviews.jsx';

jest.mock('axios');

const request = (endpoint, params={}, method='get') => {
  return axios({
    method: method,
    url: endpoint,
    params: params
  })
}

const mockData = [
  {
      "review_id": 1276368,
      "rating": 5,
      "summary": "Best product",
      "recommend": true,
      "response": null,
      "body": "It did everything I wanted it to and it is super good quality!",
      "date": "2022-09-03T00:00:00.000Z",
      "reviewer_name": "the man",
      "helpfulness": 1,
      "photos": []
  },
  {
      "review_id": 1276364,
      "rating": 2,
      "summary": "hello world",
      "recommend": true,
      "response": null,
      "body": "I really enjoyed this product. It had everything I could have every wanted and wished for.",
      "date": "2022-09-03T00:00:00.000Z",
      "reviewer_name": "morgan",
      "helpfulness": 1,
      "photos": [
          {
              "id": 2455956,
              "url": "http://res.cloudinary.com/dzblbll9t/image/upload/v1662236386/xvdfovsxue47dieltrg7.jpg"
          }
      ]
    }
  ]

describe('Reviews', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  test('Reviews should render to page', async () => {
      axios.get.mockResolvedValue({ data: mockData });
      const widget = render(<Reviews request={request}/>)
      const reviewDiv = widget.container.querySelector('#reviews');
      await waitFor(() => {
        expect(reviewDiv.id).toEqual('reviews');
      })
  });

  test('Reviews should render to 2 child components', async () => {
      axios.get.mockResolvedValue({ data: mockData });
      const widget = render(<Reviews request={request}/>)
      const reviewDiv = widget.container.querySelector('#reviews');
      await waitFor(() => {
        expect(reviewDiv.children.length).toBe(2);
      })
  });
})