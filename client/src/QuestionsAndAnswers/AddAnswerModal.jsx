/* eslint-disable no-console */
/* eslint-disable no-alert */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/prop-types */
// client/src/QuestionsAndAnswers/AddAnswerModal.jsx
import React, { useState } from 'react';

function AddAnswerModal({
  questionId, showModal, handleClose, request, questionText,
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

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === 'answer') {
      setAnswer(value);
    } else if (name === 'nickname') {
      setNickname(value);
    } else if (name === 'email') {
      setEmail(value);
    }
  };

  return (
    showModal && (
      <div className="qa-modal-a-overlay">
        <div className="qa-modal-a">
          <div className="qa-modal-a-header">
            <h3 className="qa-modal-a-title">Submit Your Answer</h3>
            <button type="button" className="qa-modal-a-close" onClick={handleClose}>
              <span>[X]</span>
            </button>
          </div>
          <div className="qa-modal-a-body">
            <label className="qa-modal-a-question">
              Q:
              {' '}
              {questionText}
            </label>
            <label className="qa-modal-a-label">
              Your Answer*
            </label>
            <textarea
              className="qa-modal-a-textarea"
              name="answer"
              value={answer}
              onChange={handleInputChange}
              maxLength={1000}
              required
            />
            <br />
            <label className="qa-modal-a-label">
              What is your nickname*
            </label>
            <input
              className="qa-modal-a-input"
              type="text"
              name="nickname"
              value={nickname}
              onChange={handleInputChange}
              maxLength={60}
              placeholder="Example: jack543!"
              required
            />
            <small>For privacy reasons, do not use your full name or email address</small>
            <br />
            <label className="qa-modal-a-label">
              Your Email*
            </label>
            <input
              className="qa-modal-a-input"
              type="email"
              name="email"
              value={email}
              onChange={handleInputChange}
              maxLength={60}
              placeholder="jack@email.com"
              required
            />
            <small>For authentication reasons, you will not be emailed</small>
            <br />
            <button type="button" className="qa-modal-a-submit" onClick={handleSubmit}>Submit Answer</button>
            <button type="button" className="qa-modal-a-cancel" onClick={handleClose}>Cancel</button>
          </div>
        </div>
      </div>
    )
  );
}

export default AddAnswerModal;
