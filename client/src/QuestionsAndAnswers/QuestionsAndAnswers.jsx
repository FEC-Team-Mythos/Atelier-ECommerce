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
    console.log('Searching for:', term);
    setSearchTerm(term);
  };

  const handleAddQuestionClick = () => {
    setShowAddQuestionModal(true);
  };

  const handleModalClose = () => {
    setShowAddQuestionModal(false);
  };

  return (
    <div>
      <SearchBar handleSearch={handleSearch} />
      <QuestionsList
        questions={questions}
        productId={productId}
        searchTerm={searchTerm}
        request={request}
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
