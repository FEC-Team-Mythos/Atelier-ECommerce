/* eslint-disable no-console */
/* eslint-disable no-alert */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/prop-types */
// client/src/QuestionsAndAnswers/AddAnswerModal.jsx
import React, { useState } from 'react';

function AddAnswerModal({
  questionId, showModal, handleClose, request,
}) {
  const [answer, setAnswer] = useState('');
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');

  const validEmail = (checkEmail) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(checkEmail);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // validate input fields & alert error if invalid
    let errorMessage = '';
    if (!answer) {
      errorMessage = 'Answer is required';
    } else if (!nickname) {
      errorMessage = 'Nickname is required';
    } else if (!email || !validEmail(email)) {
      errorMessage = 'Email is required and must be valid';
    }

    if (errorMessage) {
      alert(errorMessage);
      return;
    }

    // if valid, submit form data to server
    const formData = {
      body: answer,
      name: nickname,
      email,
    };

    // POST answer to API
    const answerEndpoint = `/qa/questions/${questionId}/answers`;
    request(answerEndpoint, formData, 'post')
      .then((response) => {
        console.log('Success, answer submitted: ', response);
      })
      .catch((error) => {
        console.log('Error submitting answer: ', error);
      });

    // finally, clear form fields & close modal
    setAnswer('');
    setNickname('');
    setEmail('');
    handleClose();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleClose();
    }
  };

  if (!showModal) return null;

  return (
    <div className="qa-modal-a">
      <div className="qa-modal-a-header">
        <h2>Add an answer</h2>
        <span
          className="qa-modal-a-close"
          onClick={handleClose}
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
        <button type="button" className="qa-modal-a-cancel" onClick={handleClose}>
          Cancel
        </button>
      </form>
    </div>
  );
}

export default AddAnswerModal;
