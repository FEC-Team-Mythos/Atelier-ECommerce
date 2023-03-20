import React, { useState, useEffect } from 'react';
import axios from 'axios';
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

const QuestionsAndAnswers = ({ productId }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddQuestionModal, setShowAddQuestionModal] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [allQuestions, setAllQuestions] = useState([]);

  const getQuestionsData = async () => {
    try {
      var response = await axios.get('/qa/questions', { params: { product_id: productId } })
      // this is redundant now, but depending on how filtering is implemented we may want two
      setAllQuestions(response.data.results);
      setQuestions(response.data.results);
    } catch (err) {
      console.log(err);
    }
  }

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
      />
      <button className="qa-btn-add-question" onClick={handleAddQuestionClick}>
        Add a Question
      </button>
      <AddQuestionModal
        productId={productId}
        showModal={showAddQuestionModal}
        handleClose={handleModalClose}
      />
    </div>
  );
};

export default QuestionsAndAnswers;