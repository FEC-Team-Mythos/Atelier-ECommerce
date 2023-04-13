import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import QuestionsAndAnswers from './QuestionsAndAnswers';

const mockQuestions = [
  { question_id: 1, question_body: 'What material is it made of?' },
  { question_id: 2, question_body: 'Is it true to size?' },
  { question_id: 3, question_body: 'What colors are available?' },
];

jest.mock('axios');

describe('QuestionsAndAnswers', () => {
  beforeEach(() => {
    axios.get.mockResolvedValue({ data: { results: mockQuestions } });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('Renders without crashing', () => {
    render(
      <QuestionsAndAnswers
        request={axios.get}
        productId={1}
        changeRequestHook={() => {}}
      />,
    );
  });

  it('Displays a "More Answered Questions" button if there are more than 2 questions', async () => {
    render(
      <QuestionsAndAnswers
        request={axios.get}
        productId={1}
        changeRequestHook={() => {}}
      />,
    );

    // const moreQuestionsButton = await screen.findByTestId('more-questions');
    const moreQuestionsButton = screen.getByTestId('more-questions');
    expect(moreQuestionsButton).toBeInTheDocument();
  });
});
