import React from 'react';
import axios from 'axios';
import '@testing-library/jest-dom';
import {
  render, fireEvent, waitFor, screen,
} from '@testing-library/react';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faStar, faCheck } from '@fortawesome/free-solid-svg-icons';
import { expect, jest, test } from '@jest/globals';

import Reviews from './Reviews.jsx';
import ReviewList from './ReviewList.jsx';
import ReviewTile from './ReviewTile.jsx';
import Filter from './Filter.jsx';
import NewBreakdown from './NewBreakdown.jsx';
import Characteristics from './Characteristics.jsx';

library.add(faStar);
library.add(faCheck);

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
    helpfulness: 2,
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
    helpfulness: 10,
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
    helpfulness: 5,
    photos: [],
  },
];

const mockMetaData = {
  product_id: '71697',
  ratings: {
    1: '56',
    2: '22',
    3: '41',
    4: '66',
    5: '165',
  },
  recommended: {
    false: '74',
    true: '276',
  },
  characteristics: {
    Fit: {
      id: 240582,
      value: '3.5714285714285714',
    },
    Length: {
      id: 240583,
      value: '3.1346153846153846',
    },
    Comfort: {
      id: 240584,
      value: '3.3346007604562738',
    },
    Quality: {
      id: 240585,
      value: '3.5077519379844961',
    },
  },
};

xdescribe('Reviews', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  test('Reviews should render to page', async () => {
    const changeRequestHook = jest.fn();
    axios.get.mockResolvedValue({ data: mockData });
    const widget = render(<Reviews request={request} changeRequestHook={changeRequestHook} />);
    const reviewDiv = widget.container.querySelector('#reviews');
    await waitFor(() => {
      expect(reviewDiv.id).toEqual('reviews');
    });
  });

  test('Reviews should render to 2 child components', async () => {
    const changeRequestHook = jest.fn();
    axios.get.mockResolvedValue({ data: mockData });
    const widget = render(<Reviews request={request} changeRequestHook={changeRequestHook} />);
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

describe('Review Tile', () => {
  const review = {
    review_id: 1276368,
    rating: 4,
    summary: 'Best product',
    recommend: true,
    response: null,
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est',
    date: '2022-09-03T00:00:00.000Z',
    reviewer_name: 'the man',
    helpfulness: 15,
    photos: [
      {
        id: 2455956,
        url: 'http://res.cloudinary.com/dzblbll9t/image/upload/v1662236386/xvdfovsxue47dieltrg7.jpg',
      },
    ],
  };

  beforeEach(() => {
    jest.resetModules();
  });

  test('Review Tile should render rating with correct amount of star icons', () => {
    render(<ReviewTile review={review} />);
    const reviewStars = screen.getAllByTestId('star');
    expect(reviewStars.length).toBe(4);
  });

  test('Summary and Body should be standard lengths', () => {
    render(<ReviewTile review={review} />);
    const reviewBody = screen.getByTestId('reviews-individualReview-body');
    // 250 Character Body + 6 Characters from Button
    expect(reviewBody.textContent.length).toBe(256);
    const reviewBodyButton = screen.getByTestId('reviews-individualReview-bodyBtn');
    fireEvent.click(reviewBodyButton);
    const newReviewBody = screen.getByTestId('reviews-individualReview-body');
    expect(newReviewBody.textContent.length).toBe(444);
  });

  test('Clicking Image should expand resolution', () => {
    render(<ReviewTile review={review} />);
    const photo = screen.getByTestId('review-photo');
    const stylePreClick = getComputedStyle(photo);
    expect(stylePreClick._values['max-width']).toBe('100px');
    fireEvent.click(photo);
    const stylePostClick = getComputedStyle(photo);
    expect(stylePostClick._values['max-width']).toBe('300px');
  });

  test('Marking a review helpful should increment Helpfulness in API', async () => {
    axios.put.mockResolvedValueOnce({ data: { success: true } });
    render(<ReviewTile review={review} />);
    const helpfulButton = screen.getByTestId('reviewHelpBtn');
    fireEvent.click(helpfulButton);
    await waitFor(() => expect(axios.put).toHaveBeenCalledTimes(1));
    expect(axios.put).toHaveBeenCalledWith('/reviews/1276368/helpful');
  });
});

describe('Sorting', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  test('Should display dropdown with 3 sorting options', () => {
    const sortingOptions = ['Relevance', 'Helpful', 'Newest'];
    render(<ReviewList reviewList={mockDataWithMoreReviews} />);
    const filterDropdown = screen.queryByTestId('reviews-sorting');
    fireEvent.click(filterDropdown);
    sortingOptions.forEach((option) => {
      expect(screen.getByText(option)).toBeInTheDocument();
    });
  });

  test('Displays selected sorting option correctly', () => {
    const sortParam = 'helpful';
    render(<Filter sortParam={sortParam} />);
    const filter = screen.getByTestId('reviews-sorting');
    expect(filter).toHaveValue('helpful');
  });

  test('Changes sorting option when new option is selected from dropdown', () => {
    const setSortParam = jest.fn();
    render(<Filter setSortParam={setSortParam} />);
    const filter = screen.getByTestId('reviews-sorting');
    fireEvent.change(filter, { target: { value: 'helpful' } });
    expect(setSortParam).toHaveBeenCalledWith('helpful');
  });

  test('Displays total number of reviews', () => {
    render(<Filter allReviews={mockDataWithMoreReviews} />);
    const filter = screen.getByTestId('reviews-filter');
    expect(filter).toHaveTextContent('4 Total Reviews');
  });
});

describe('Rating Graph', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  test('Should display correct average rating based on metadata', async () => {
    const ratings = {
      1: '56',
      2: '22',
      3: '41',
      4: '66',
      5: '165',
    };
    const setFilterParams = jest.fn();
    render(<NewBreakdown metaData={mockMetaData} filterParams={[]} setFilterParams={setFilterParams} />);
    const totalRatings = Object.keys(ratings).reduce((acc, rating) => acc + (rating * ratings[rating]), 0);
    const avgRating = (totalRatings / 350).toFixed(2);
    const graph = screen.getByTestId('reviews-breakdown');
    expect(graph).toHaveTextContent(avgRating);
  });

  test('Should display correct recommended percentage', () => {
    const recommended = {
      false: 74,
      true: 276,
    };
    const setFilterParams = jest.fn();
    render(<NewBreakdown metaData={mockMetaData} filterParams={[]} setFilterParams={setFilterParams} />);
    const totalRecommend = Math.round(recommended.true / (recommended.true + recommended.false));
    const graph = screen.getByTestId('reviews-breakdown');
    expect(graph).toHaveTextContent(totalRecommend);
  });

  test('Should render ratings graph', () => {
    const setFilterParams = jest.fn();
    render(<NewBreakdown metaData={mockMetaData} filterParams={[]} setFilterParams={setFilterParams} />);
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  test('Should filter review list by clicking on graph', () => {
    const setFilterParams = jest.fn();
    render(<NewBreakdown metaData={mockMetaData} filterParams={[5]} setFilterParams={setFilterParams} />);
    const ratingFilter4 = screen.getByText('4');
    const ratingFilter3 = screen.getByText('3');
    fireEvent.click(ratingFilter4);
    expect(setFilterParams).toHaveBeenCalledWith([5, 4]);
    fireEvent.click(ratingFilter4);
    fireEvent.click(ratingFilter3);
    expect(setFilterParams).toHaveBeenCalledWith([5, 3]);
  });
});
