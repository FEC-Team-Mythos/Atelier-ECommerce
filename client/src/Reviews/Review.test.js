import React from 'react';
import axios from 'axios';
import '@testing-library/jest-dom';
import {
  render, fireEvent, waitFor, screen
} from '@testing-library/react';

import Reviews from './Reviews.jsx';
import ReviewList from './ReviewList.jsx';

jest.mock('axios');

const request = (endpoint, params = {}, method = 'get') => axios({
  method,
  url: endpoint,
  params,
});

const mockData = [
  {
    review_id: 1276368,
    rating: 5,
    summary: 'Best product',
    recommend: true,
    response: null,
    body: 'It did everything I wanted it to and it is super good quality!',
    date: '2022-09-03T00:00:00.000Z',
    reviewer_name: 'the man',
    helpfulness: 1,
    photos: [],
  },
  {
    review_id: 1276364,
    rating: 2,
    summary: 'hello world',
    recommend: true,
    response: null,
    body: 'I really enjoyed this product. It had everything I could have every wanted and wished for.',
    date: '2022-09-03T00:00:00.000Z',
    reviewer_name: 'morgan',
    helpfulness: 1,
    photos: [
      {
        id: 2455956,
        url: 'http://res.cloudinary.com/dzblbll9t/image/upload/v1662236386/xvdfovsxue47dieltrg7.jpg',
      },
    ],
  },
];

const mockDataWithMoreReviews = [
  {
    review_id: 1276234,
    rating: 5,
    summary: 'Great Product',
    recommend: true,
    response: null,
    body: "I would buy these again. But you shouldn't buy them because then there are more for me!",
    date: '2022-08-27T00:00:00.000Z',
    reviewer_name: 'guest',
    helpfulness: 1,
    photos: [],
  },
  {
    review_id: 1277043,
    rating: 4,
    summary: 'TESTING TESTING',
    recommend: true,
    response: null,
    body: "This product is acceptable. I wouldn't write home about it, but it's good enough for what you need it for.",
    date: '2022-10-22T00:00:00.000Z',
    reviewer_name: 'bubs',
    helpfulness: 1,
    photos: [],
  },
  {
    review_id: 1276844,
    rating: 5,
    summary: '',
    recommend: true,
    response: null,
    body: 'testing 123,....sfdaf adsfasdfasdfasdfxcxver 22131',
    date: '2022-10-15T00:00:00.000Z',
    reviewer_name: '123',
    helpfulness: 1,
    photos: [],
  },
  {
    review_id: 1276855,
    rating: 5,
    summary: 'My Summary',
    recommend: false,
    response: null,
    body: 'I liked it cause its great and this needs to be longer',
    date: '2022-10-15T00:00:00.000Z',
    reviewer_name: 'camer',
    helpfulness: 0,
    photos: [],
  },
];

xdescribe('Reviews', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  test('Reviews should render to page', async () => {
    axios.get.mockResolvedValue({ data: mockData });
    const widget = render(<Reviews request={request} />);
    const reviewDiv = widget.container.querySelector('#reviews');
    await waitFor(() => {
      expect(reviewDiv.id).toEqual('reviews');
    });
  });

  test('Reviews should render to 2 child components', async () => {
    axios.get.mockResolvedValue({ data: mockData });
    const widget = render(<Reviews request={request} />);
    const reviewDiv = widget.container.querySelector('#reviews');
    await waitFor(() => {
      expect(reviewDiv.children.length).toBe(2);
    });
  });
});

describe('Review List', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  test('Review List should render to page', () => {
    const data = axios.get.mockResolvedValue({ data: mockData });
    render(<ReviewList />);
    const reviewList = screen.getByTestId('reviewList');
    expect(reviewList).toBeInTheDocument();
  });

  test('If Total Reviews <= 2, review list should show 2 reviews and no button', () => {
    render(<ReviewList reviewList={mockData} />);
    const reviews = screen.getAllByTestId('reviews-individualReview');
    const moreReviewsButton = screen.queryByTestId('reviews-moreReviews-button');

    reviews.forEach((review) => {
      expect(review).toBeInTheDocument();
    });
    expect(reviews.length).toBe(2);
    expect(moreReviewsButton).not.toBeInTheDocument();
  });

  test('If Total Reviews > 2, review list should initially show 2 reviews and more reviews button', () => {
    render(<ReviewList reviewList={mockDataWithMoreReviews} />);
    const firstListOfReviews = screen.getAllByTestId('reviews-individualReview');
    const moreReviewsButton = screen.queryByTestId('reviews-moreReviews-button');
    expect(firstListOfReviews.length).toBe(2);
    expect(moreReviewsButton).toBeInTheDocument();
  });

  test('Clicking More Reviews Button should increment list by 2', () => {
    render(<ReviewList reviewList={mockDataWithMoreReviews} />);
    const firstListOfReviews = screen.getAllByTestId('reviews-individualReview');
    const moreReviewsButton = screen.queryByTestId('reviews-moreReviews-button');
    expect(firstListOfReviews.length).toBe(2);
    fireEvent.click(moreReviewsButton);
    const secondListOfReviews = screen.getAllByTestId('reviews-individualReview');
    expect(secondListOfReviews.length).toBe(4);
  });

  test('Button should dissappear if no more reviews are available to be shown', () => {
    render(<ReviewList reviewList={mockDataWithMoreReviews} />);
    const moreReviewsButton = screen.queryByTestId('reviews-moreReviews-button');
    expect(moreReviewsButton).toBeInTheDocument();
    fireEvent.click(moreReviewsButton);
    expect(moreReviewsButton).not.toBeInTheDocument();
  });
});
