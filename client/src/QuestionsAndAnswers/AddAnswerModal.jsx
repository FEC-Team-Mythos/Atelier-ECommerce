/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';

function AddAnswerModal({ question, closeModal, addAnswer }) {
  const [answer, setAnswer] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    addAnswer(question.id, answer);
    closeModal();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      closeModal();
    }
  };

  return (
    <div className="qa-modal-a">
      <div className="qa-modal-a-header">
        <h2>Add an answer</h2>
        <span
          className="qa-modal-a-close"
          onClick={closeModal}
          onKeyDown={handleKeyDown}
          tabIndex="0"
          role="button"
        >
          &times;
        </span>
      </div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="answer">Answer</label>
        <textarea
          id="answer"
          className="qa-modal-a-textarea"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
        />
        <button type="submit" className="qa-modal-a-submit">
          Submit
        </button>
        <button type="button" className="qa-modal-a-cancel" onClick={closeModal}>
          Cancel
        </button>
      </form>
    </div>
  );
}

export default AddAnswerModal;
