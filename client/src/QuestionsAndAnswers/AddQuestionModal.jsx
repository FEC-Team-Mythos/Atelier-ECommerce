/* eslint-disable no-console */
/* eslint-disable no-alert */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/prop-types */
// client/src/QuestionsAndAnswers/AddQuestionModal.jsx
import React, { useState } from 'react';

function AddQuestionModal({
  productId, showModal, handleClose, request,
}) {
  const [question, setQuestion] = useState('');
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if any mandatory fields are missing
    if (!question || !nickname || !email) {
      alert('You must enter the following: \n- Your Question \n- Your Nickname \n- Your Email');
      return;
    }

    // Validate email using regex & test()
    // todo: investigate whether it's really bad to do this?
    /** regular expression breakdown:
     *    /^        {email starts at the beginning of the string}
     *    [^\s@]+   {handle has no whitespace or @ char}
     *    @         {email has one @ char between handle and domain}
     *    [^\s@]+   {domain has no whitespace or @ char}
     *    \.        {domain and TLD separated by .(dot) char, escaped}
     *    [^\s@]+   {domain has no whitespace or @ char}
     *    $         {email ends at the end of the string}
     */
    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!validEmail) {
      alert('Please enter a valid email address');
      return;
    }

    // if form data is valid...
    const formData = {
      body: question,
      name: nickname,
      email: email,
      product_id: productId,
    };

    // POST question to API
    console.log(`Submitting q: "${question}" n: "${nickname}"  e: "${email}" p: ${productId}`);
    request('/qa/questions', formData, 'post')
      .then((response) => {
        console.log('Success, question submitted: ', response);
      })
      .catch((error) => {
        console.error('Error submitting question: ', error);
      });
    handleClose();
  };

  const modalClassName = showModal ? 'qa-modal-visible' : 'qa-modal-hidden';

  return (
    <div className={modalClassName}>
      <section className="qa-modal-q-main">
        <h2>Add a Question</h2>
        <h4>{`Product ID: ${productId}`}</h4>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Your Question*</label>
            <textarea
              id="qa-question-input"
              required
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="What question do you have about the product?"
              rows="3"
            />
          </div>
          <div>
            <label htmlFor="qa-nickname-input">Nickname*</label>
            <input
              id="qa-nickname-input"
              required
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="Example: jackson11!"
              maxLength="60"
            />
            <small>For privacy reasons, do not use your full name or email address.</small>
            <br />
            <br />
          </div>
          <div>
            <label htmlFor="qa-email-input">Email*</label>
            <input
              id="qa-email-input"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="jack@example.com"
            />
            <small>For authentication reasons, you will not be emailed.</small>
            <br />
          </div>
          <button type="button" onClick={handleSubmit}>Submit</button>
          <button type="button" onClick={handleClose}>Cancel</button>
        </form>
      </section>
    </div>
  );
}

export default AddQuestionModal;
