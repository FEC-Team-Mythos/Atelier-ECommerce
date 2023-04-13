import React from 'react';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import QuestionsAndAnswers from './QuestionsAndAnswers';

const mockQuestions = [
  { question_id: 1, question_body: 'Is this keto' },
  { question_id: 2, question_body: 'Will this fit my grandson Edwin?' },
  { question_id: 3, question_body: 'Is anyone answering these or are we just ghosts in a machine?' },
];

const mockRequest = jest.fn().mockResolvedValue({ data: { results: mockQuestions } });

describe('QuestionsAndAnswers', () => {
  beforeEach(() => {
    mockRequest.mockClear();
  });

  it('Renders without crashing', () => {
    render(
      <QuestionsAndAnswers
        request={mockRequest}
        productId={1}
        changeRequestHook={() => {}}
      />,
    );
  });

  it('Displays a "More Answered Questions" button if there are more than 2 questions', async () => {
    await act(async () => {
      render(
        <QuestionsAndAnswers
          request={mockRequest}
          productId={1}
          changeRequestHook={() => {}}
        />,
      );
    });

    const moreQuestionsButton = await screen.findByTestId('more-questions');
    expect(moreQuestionsButton).toBeInTheDocument();
  });
});
