import React, { useState, useEffect } from 'react';
import QuestionsList from './QuestionsList.jsx';
import AddQuestionModal from './AddQuestionModal.jsx';
import SearchBar from './SearchBar.jsx';

// component tree for reference:
//  QuestionsAndAnswers.jsx
//  |- QuestionsList.jsx
//  |--- Question.jsx
//  |- SearchBar.jsx
//  |- AddAnswerModal.jsx
//  |- AddQuestionModal.jsx

const QuestionsAndAnswers = ({ request, productId, changeRequestHook }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddQuestionModal, setShowAddQuestionModal] = useState(false);
  const [questions, setQuestions] = useState([]);

  const getQuestionsData = async () => {
    try {
      const response = await request('/qa/questions', { product_id: productId }, 'get');
      setQuestions(response.data.results);
    } catch (err) {
      console.log(err);
    }
  };


  useEffect(() => {
    getQuestionsData();
  }, [productId]);

  const handleSearch = (term) => {
    console.log('Searching for: ', term);
    setSearchTerm(term);
  };

  const handleAddQuestionClick = () => {
    setShowAddQuestionModal(true);
  };

  const handleModalClose = () => {
    setShowAddQuestionModal(false);
  };

  const markQuestionHelpful = async (questionId) => {
    try {
      await request(`/qa/questions/${questionId}/helpful`, {}, 'put');
      console.log('Marked question as helpful: ', questionId);
    } catch (err) {
      console.log('Error marking question as helpful: ', err);
    }
  };

  const reportQuestion = async (questionId) => {
    try {
      await request(`/qa/questions/${questionId}/report`, {}, 'put');
      console.log('Reported question: ', questionId);
    } catch (err) {
      console.log('Error reporting question: ', err);
    }
  };

  const markAnswerHelpful = async (answerId) => {
    try {
      await request(`/qa/answers/${answerId}/helpful`, {}, 'put');
      console.log('Marked answer as helpful: ', answerId);
    } catch (err) {
      console.log('Error marking answer as helpful: ', err);
    }
  };

  const reportAnswer = async (answerId) => {
    try {
      await request(`/qa/answers/${answerId}/report`, {}, 'put');
      console.log('Reported answer: ', answerId);
    } catch (err) {
      console.log('Error reporting answer: ', err);
    }
  };


  return (
    <div>
      <SearchBar handleSearch={handleSearch} />
      <QuestionsList
        questions={questions}
        productId={productId}
        searchTerm={searchTerm}
        request={request}
        markQuestionHelpful={markQuestionHelpful}
        reportQuestion={reportQuestion}
        markAnswerHelpful={markAnswerHelpful}
        reportAnswer={reportAnswer}
      />
      <button className="qa-btn-add-question" onClick={handleAddQuestionClick}>
        Add a Question
      </button>
      {showAddQuestionModal && (
      <AddQuestionModal
        productId={productId}
        showModal={showAddQuestionModal}
        handleClose={handleModalClose}
        request={request}
      />
    )}
    </div>
  );
};

export default QuestionsAndAnswers;
