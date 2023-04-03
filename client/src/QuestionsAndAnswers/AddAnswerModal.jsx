// client/src/QuestionsAndAnswers/AddAnswerModal.jsx
import React, { useState } from 'react';

const AddAnswerModal = ({ question, questionId, showModal, handleClose }) => {
  const [answer, setAnswer] = useState('');
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    // validate input fields & alert error if invalid
    var errorMessage = '';
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

    // TODO: post request to server/API
    console.log(`[POST/todo] Submitting answer "${formData.body}" for question ${questionId}...`);
    console.log(`...with nickname "${formData.name}" and email "${formData.email}"`);

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

  const validEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  return (
    <>
      {showModal ? (
        <div className="qa-modal-a-overlay">
          <div className="qa-modal-a">
            <div className="qa-modal-a-header">
              <h3 className="qa-modal-a-title">Submit Your Answer</h3>
              <button type="button" className="qa-modal-a-close" onClick={handleClose}>
                <span>[X]</span>
              </button>
            </div>
            <div className="qa-modal-a-body">
              <p className="qa-modal-a-question">{question}</p>
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
              <button className="qa-modal-a-submit" onClick={handleSubmit}>Submit Answer</button>
              <button className="qa-modal-a-cancel" onClick={handleClose}>Cancel</button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );

};

export default AddAnswerModal;