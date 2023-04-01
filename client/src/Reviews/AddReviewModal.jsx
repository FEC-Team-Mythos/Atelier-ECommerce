import { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faStar } from '@fortawesome/free-solid-svg-icons';

library.add(faStar);

function AddReviewModal({ addReviewState, toggleAddReviewState, characteristics }) {
  const [formSummary, setFormSummary] = useState('');
  const [formBody, setFormBody] = useState('');
  const [formRecommend, setFormRecommend] = useState(false);
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formPhotos, setFormPhotos] = useState([]);
  const [formCharacteristics, setFormCharacteristics] = useState({});
  const [checkedFormChar, setCheckedFormChar] = useState({});

  const [formRating, setFormRating] = useState(0);
  const [hover, setHover] = useState(0);

  const starText = ['Poor', 'Fair', 'Average', 'Good', 'Great'];

  const charLabels = {
    Size: ['A size too small', '1/2 a size too small', 'Perfect', '1/2 a size too big', 'Too Big'],
    Width: ['Too Narrow', 'Slightly Narrow', 'Perfect', 'Slightly Wide', 'Too Wide'],
    Comfort: ['Uncomfortable', 'Slightly Uncomfortable', 'Ok', 'Comfortable', 'Perfect'],
    Quality: ['Poor', 'Below Average', 'What I expected', 'Pretty Great', 'Perfect'],
    Length: ['Runs Short', 'Runs slightly short', 'Perfect', 'Runs slightly long', 'Runs Long'],
    Fit: ['Runs Tight', 'Runs slightly tight', 'Perfect', 'Runs slightly long', 'Runs Long'],
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const charObj = {};
    for (var key in formCharacteristics) {
      key === 'Size' ? charObj['10'] = formCharacteristics[key] : null;
      key === 'Width' ? charObj['11'] = formCharacteristics[key] : null;
      key === 'Comfort' ? charObj['12'] = formCharacteristics[key] : null;
      key === 'Quality' ? charObj['13'] = formCharacteristics[key] : null;
      key === 'Length' ? charObj['14'] = formCharacteristics[key] : null;
      key === 'Fit' ? charObj['15'] = formCharacteristics[key] : null;
    }

    const data = {
      product_id: 71697,
      rating: formRating,
      summary: formSummary,
      body: formBody,
      recommend: formRecommend,
      name: formName,
      email: formEmail,
      photos: formPhotos,
      characteristics: charObj,
    };

    await axios.post('/reviews', data);
    toggleAddReviewState(!addReviewState);
  };

  const handleRecommendChange = (e) => {
    if (e.target.value === 'true') {
      setFormRecommend(true);
    } else {
      setFormRecommend(false);
    }
  };

  function DisplayRadioButtons(input, checked) {
    const radioButtons = [];

    const trackRadioValues = (key, value) => {
      const newRadioValues = { ...formCharacteristics };
      newRadioValues[key.input] = value;
      setFormCharacteristics(newRadioValues);
    };

    for (let i = 1; i <= 5; i++) {
      const radioButton = (
        <label key={i}>
          <input
            type="radio"
            name={input}
            value={i}
            checked={checked === i}
            onChange={() => {
              trackRadioValues(input, i);
            }}
          />
          {i}
        </label>
      );
      radioButtons.push(radioButton);
    }
    return (
      <div>
        {radioButtons}
      </div>
    );
  }

  const formStars = () => (
    <div id="review-addReview-starRating">
      {[...Array(5)].map((star, index) => {
        index += 1;
        return (
          <button
            id="reviews-formStarButton"
            data-testId={`reviews-addReviewStars${index}`}
            type="button"
            key={index}
            className={index <= (hover || formRating) ? 'on' : 'off'}
            onClick={() => setFormRating(index)}
            onMouseEnter={() => setHover(index)}
            onMouseLeave={() => setHover(formRating)}
          >
            <span className="star"><FontAwesomeIcon icon="fa-solid fa-star" /></span>
          </button>
        );
      })}
    </div>
  );

  const displayCharacterRadio = () => {
    if (characteristics) {
      const charKeys = Object.keys(characteristics);

      return (
        <>
          {charKeys.map((key) => (
            <div key={key} id="reviews-addReviewCharacteristicIndividual">
              {key}
              <DisplayRadioButtons input={key} checked={formCharacteristics[key]}/>
              <span className="reviews-addReviewCharacteristicIndividualDisc">{charLabels[key][formCharacteristics[key] - 1]}</span>
            </div>
          ))}
        </>
      );
    }
  };

  const formBodyCounter = () => {
    if (formBody.length < 50) {
      return `Minimum required characters left: ${50 - formBody.length}`;
    }
    return 'Minimum reached';
  };

  if (addReviewState) {
    return (
      <div id="reviews-addReviewPopup" onClick={() => toggleAddReviewState(false)}>
        <div id="reviews-addReviewPopupInner" onClick={(e) => e.stopPropagation()}>
          <form onSubmit={handleSubmit}>
            <h3>Write Your Review</h3>
            <label>
              <div id="reviews-addReviewStars">
                {formStars()}
                {starText[formRating - 1]}
              </div>
            </label>
            <div id="reviews-addReviewRecommend">
              <label>
                Do you recommend this product?
                <input
                  type="radio"
                  data-testid="reviews-addReviewRecYes"
                  name="yes"
                  value="true"
                  checked={formRecommend === true}
                  onChange={handleRecommendChange}
                />
                Yes
              </label>
              <label>
                <input
                  type="radio"
                  data-testid="reviews-addReviewRecNo"
                  name="no"
                  value="false"
                  checked={formRecommend === false}
                  onChange={handleRecommendChange}
                />
                No
              </label>
            </div>
            <label>
              <div id="reviews-addReviewCharacteristics">
                {displayCharacterRadio()}
              </div>
            </label>
            <label>
              <div id="reviews-addReviewSummary">
                <span>Review Summary:</span>
                <input
                  id="reviews-addReviewSummaryText"
                  data-testid="reviews-addReviewSummaryText"
                  type="text"
                  maxLength={60}
                  value={formSummary}
                  onChange={(e) => setFormSummary(e.target.value)}
                  placeholder="Best purchase ever!"
                />
              </div>
            </label>
            <label>
              <div id="reviews-addReviewBody">
                Review Body:
                <input
                  type="text"
                  id="reviews-addReviewBodyText"
                  data-testid="reviews-addReviewBodyText"
                  minLength={50}
                  maxLength={1000}
                  value={formBody}
                  onChange={(e) => setFormBody(e.target.value)}
                  placeholder="Why did you like the product or not?"
                />
                <div id="reviews-addReviewSubtext">{formBodyCounter()}</div>
              </div>
              <div id="reviews-addReviewPhotos">
                Photos: PLACEHOLDER
              </div>
            </label>
            <label>
              <div id="reviews-addReviewNameEmail">
                Nickname:
                <input
                  type="text"
                  data-testid="reviews-addReviewName"
                  maxLength={60}
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="jackson11"
                />
                <div id="reviews-addReviewSubtext">
                  For privacy reasons, do not use your full name or email address.
                </div>
              </div>
            </label>
            <label>
              <div id="reviews-addReviewNameEmail">
                Email:
                <input
                  type="text"
                  data-testid="reviews-addReviewEmail"
                  maxLength={60}
                  value={formEmail}
                  onChange={(e) => setFormEmail(e.target.value)}
                  placeholder="jackson11@gmail.com"
                />
                <div id="reviews-addReviewSubtext">
                  For authentication reasons, you will not be emailed.
                </div>
              </div>
            </label>
            <input type="submit" value="Submit" />
          </form>
          <button
            onClick={() => toggleAddReviewState(!addReviewState)}
            id="reviews-addFormCloseBtn"
          >
            X
          </button>
        </div>
      </div>
    );
  }
}

export default AddReviewModal;
