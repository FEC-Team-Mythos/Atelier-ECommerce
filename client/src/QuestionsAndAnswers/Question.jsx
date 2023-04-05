// client/src/QuestionsAndAnswers/Question.jsx
import React, { useState } from 'react';
import AddAnswerModal from './AddAnswerModal.jsx';

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString('en-US', options);
};

const Question = ({ question, request }) => {
  //console.log(question);
  const [showModal, setShowModal] = useState(false);
  const [helpful, setHelpful] = useState(parseInt(question.question_helpfulness));
  const [reported, setReported] = useState(false);
  const [reportedAnswers, setReportedAnswers] = useState([]);
  const [helpfulAnswers, setHelpfulAnswers] = useState([]);
  const [questionHelpfulClicked, setQuestionHelpfulClicked] = useState(false);
  const [answerHelpfulness, setAnswerHelpfulness] = useState(
    Object.fromEntries(
      Object.values(question.answers).map((answer) => [
        answer.id,
        answer.helpfulness,
      ])
    )
  );

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleAddAnswerClick = (questionId) => {
    setShowModal(true);
  };

  const markQuestionHelpful = async (questionId) => {
    if (!questionHelpfulClicked) {
      try {
        await request(`/qa/questions/${questionId}/helpful`, {}, 'put');
        setHelpful((prevHelpful) => prevHelpful + 1);
        setQuestionHelpfulClicked(true);
      } catch (error) {
        console.error('Error marking question as helpful:', error);
      }
    }
  };

  const reportQuestion = async (questionId) => {
    await request(`/qa/questions/${questionId}/report`, {}, 'put');
  };

  const markAnswerHelpful = async (answerId) => {
    await request(`/qa/answers/${answerId}/helpful`, {}, 'put');
  };

  const reportAnswer = async (answerId) => {
    await request(`/qa/answers/${answerId}/report`, {}, 'put');
  };

  const sortedAnswers = Object.values(question.answers)
    .filter((answer) => !reportedAnswers.includes(answer.id))
    .sort((a, b) => b.helpfulness - a.helpfulness);
  const bestAnswers = sortedAnswers.slice(0, 2);

  const handleMarkHelpful = async () => {
    await markQuestionHelpful(question.question_id);
  };

  const handleReport = () => {
    reportQuestion(question.question_id);
    setReported(true);
  };

  const handleAnswerHelpful = async (answerId) => {
    if (!helpfulAnswers.includes(answerId)) {
      try {
        await request(`/qa/answers/${answerId}/helpful`, {}, 'put');
        setAnswerHelpfulness({
          ...answerHelpfulness,
          [answerId]: answerHelpfulness[answerId] + 1,
        });
        setHelpfulAnswers([...helpfulAnswers, answerId]);
      } catch (error) {
        console.error('Error marking answer as helpful:', error);
      }
    } else {
      console.log('Error: user should not mark same answer helpful twice');
    }
  };

  const handleAnswerReport = async (answerId) => {
    if (!reportedAnswers.includes(answerId)) {
      setReportedAnswers([...reportedAnswers, answerId]);
    } else {
      console.log('error: somehow user has reported twice');
    }
  };

  if (reported) {
    return null;
  }
  return (
    <div className="qa-question-container">
      <div className="qa-question-heading">
        <h4 className="qa-question-body">Q: {question.question_body}</h4>
        <div className="qa-question-info">
          <div className="qa-question-helpful">
            Helpful? &nbsp;&nbsp;
            <button
              className="qa-btn-helpful"
              onClick={handleMarkHelpful}
              disabled={questionHelpfulClicked}
            >
              Yes
            </button>
            &nbsp;({helpful})&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
          </div>
          <button className="qa-btn-add-answer" onClick={() => handleAddAnswerClick(question.question_id)}>
            Add Answer
          </button>
        </div>
      </div>
      {bestAnswers.map((answer) => (
        <div key={answer.id} className="qa-answer">
          <p className="qa-answer-body">
            <span className="qa-answer-label">
              A: &nbsp;
            </span>
            {answer.body}
          </p>
          <div className="qa-answer-info">
            <span className="qa-answerer-name">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              by {answer.answerer_name}, {formatDate(answer.date)}&nbsp;</span>
              &nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
            <div className="qa-answer-helpful">
              Helpful? <button className="qa-btn-helpful" onClick={() => handleAnswerHelpful(answer.id)} disabled={helpfulAnswers.includes(answer.id)}>Yes</button> ({answer.helpfulness})
              &nbsp;&nbsp;|&nbsp;&nbsp;
            </div>
            <button className="qa-btn-report" onClick={() => handleAnswerReport(answer.id)} disabled={reportedAnswers.includes(answer.id)}>Report</button>
          </div>
        </div>
      ))}
      <AddAnswerModal
        questionId={question.question_id}
        showModal={showModal}
        handleClose={handleCloseModal}
        request={request}
      />
    </div>
  );
};

export default Question;