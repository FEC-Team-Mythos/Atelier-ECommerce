// client/src/QuestionsAndAnswers/QuestionsList.jsx
import React from 'react';
import Question from './Question.jsx';

const QuestionsList = ({ questions, productId, searchTerm, handleAddAnswerClick }) => {
  const filteredQuestions = questions.filter((question) => {
    // for case-insensitive search, we just convert to lowercase
    return question.question_body.toLowerCase().includes(searchTerm.toLowerCase());
  }).sort((a, b) => b.question_helpfulness - a.question_helpfulness);

  return (
    <div>
      {filteredQuestions.slice(0, 4).map((question) => {
        return (
          <Question
            key={question.question_id}
            question={question}
            handleAddAnswerClick={handleAddAnswerClick}
          />
        );
      })}
    </div>
  );
};

export default QuestionsList;