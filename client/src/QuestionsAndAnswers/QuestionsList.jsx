/* eslint-disable indent */
/* eslint-disable react/prop-types */
// client/src/QuestionsAndAnswers/QuestionsList.jsx
import React, { useEffect } from 'react';
import Question from './Question';

function QuestionsList({
  // eslint-disable-next-line no-unused-vars
  questions, productId, searchTerm, handleAddAnswerClick,
  visibleQuestionsCount, setMoreQuestionsAvailable, request,
}) {
  const filteredQuestions = questions
    .filter((question) => question.question_body
      .toLowerCase()
      .includes(searchTerm
        .toLowerCase()))
    .sort((a, b) => b.question_helpfulness - a.question_helpfulness);

  useEffect(() => {
    setMoreQuestionsAvailable(visibleQuestionsCount < filteredQuestions.length);
  }, [visibleQuestionsCount, filteredQuestions]);

  return (
    <div className="qa-question-list">
      {filteredQuestions.slice(0, visibleQuestionsCount).map((question) => (
        <Question
          key={question.question_id}
          question={question}
          handleAddAnswerClick={handleAddAnswerClick}
          request={request}
          visibleQuestionsCount={visibleQuestionsCount}
        />
      ))}
    </div>
  );
}

export default QuestionsList;
