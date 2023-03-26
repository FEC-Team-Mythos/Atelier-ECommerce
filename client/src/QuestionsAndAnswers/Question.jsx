// client/src/QuestionsAndAnswers/Question.jsx
import React, { useState } from 'react';
import AddAnswerModal from './AddAnswerModal.jsx';

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString('en-US', options);
};

const Question = ({ question }) => {
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleAddAnswerClick = (questionId) => {
    setShowModal(true);
  };

  const sortedAnswers = Object.values(question.answers).sort((a, b) => b.helpfulness - a.helpfulness);
  const bestAnswers = sortedAnswers.slice(0, 2);

  return (
    <div className="qa-question-container">
      <h4 className="qa-question-body">{question.question_body}</h4>
      <div className="qa-question-helpful">
        Helpful? <button className="qa-btn-helpful">Yes</button> ({question.question_helpfulness})
      </div>
      <div className="qa-question-info">
        <span className="qa-question-asker">by {question.asker_name},</span>
        <span className="qa-question-date">{formatDate(question.question_date)}</span>
        <button className="qa-btn-add-answer" onClick={() => handleAddAnswerClick(question.question_id)}>
          Add Answer
        </button>
      </div>
      {bestAnswers.map((answer) => (
        <div key={answer.id} className="qa-answer">
          <p className="qa-answer-body">{answer.body}</p>
          <div className="qa-answer-info">
            <span className="qa-answerer-name">by {answer.answerer_name},</span>
            <span className="qa-answer-date">{formatDate(answer.date)}</span>
          </div>
        </div>
      ))}
      <AddAnswerModal
        questionId={question.question_id}
        showModal={showModal}
        handleClose={handleCloseModal}
      />
    </div>
  );
};

export default Question;