// client/src/QuestionsAndAnswers/Question.jsx
import React, { useState } from 'react';
import AddAnswerModal from './AddAnswerModal.jsx';

const Question = ({ question }) => {
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleAddAnswerClick = (questionId) => {
    setShowModal(true);
  };

  return (
    <div className="qa-question-container">
      <h4 className="qa-question-body">{question.question_body}</h4>
      <div className="qa-question-info">
        <span className="qa-question-asker">by {question.asker_name},</span>
        <span className="qa-question-date">{question.question_date}</span>
        <button className="qa-btn-add-answer" onClick={() => handleAddAnswerClick(question.question_id)}>
          Add Answer
        </button>
      </div>
      <AddAnswerModal
        questionId={question.question_id}
        showModal={showModal}
        handleClose={handleCloseModal}
      />
    </div>
  );
};

export default Question;