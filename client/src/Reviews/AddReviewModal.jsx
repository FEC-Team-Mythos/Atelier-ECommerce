import { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faStar } from '@fortawesome/free-solid-svg-icons';

import CharRadioBtns from './CharRadioBtns.jsx';

library.add(faStar);

function AddReviewModal({ addReviewState, toggleAddReviewState, characteristics }) {
  const [formSummary, setFormSummary] = useState('');
  const [formBody, setFormBody] = useState('');
  const [formRecommend, setFormRecommend] = useState(false);
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formPhotos, setFormPhotos] = useState([]);
  const [formCharacteristics, setFormCharacteristics] = useState({});

  const [formRating, setFormRating] = useState(0);
  const [hover, setHover] = useState(0);

  const starText = ['Poor', 'Fair', 'Average', 'Good', 'Great'];

  const handleSubmit = async (e) => {
    e.preventDefault();
    const charObj = {};

    for (const key in formCharacteristics) {
      key === 'Size' ? charObj['10'] = formCharacteristics[key] : null;
      key === 'Width' ? charObj['11'] = formCharacteristics[key] : null;
      key === 'Comfort' ? charObj['12'] = formCharacteristics[key] : null;
      key === 'Quality' ? charObj['13'] = formCharacteristics[key] : null;
      key === 'Length' ? charObj['14'] = formCharacteristics[key] : null;
      key === 'Fit' ? charObj['15'] = formCharacteristics[key] : null;
    }

    const data = new FormData();

    data.append('product_id', 71697);
    data.append('rating', formRating);
    data.append('summary', formSummary);
    data.append('body', formBody);
    data.append('recommend', formRecommend);
    data.append('name', formName);
    data.append('email', formEmail);

    formPhotos.forEach((photo) => {
      data.append('file', photo);
    });

    data.append('characteristics', JSON.stringify(charObj));

    axios.post('/reviews', data, { headers: { 'Content-Type': 'multipart/form-data' } })
      .then((postReview) => {
        console.log('success');
        toggleAddReviewState(!addReviewState);
      })
      .catch((e) => {
        console.log(e);
        toggleAddReviewState(!addReviewState);
      });
  };

  const handleRecommendChange = (e) => {
    if (e.target.value === 'true') {
      setFormRecommend(true);
    } else {
      setFormRecommend(false);
    }
  };

  const handlePhotoUploadChange = (event) => {
    const { files } = event.target;
    if (files.length <= 5) {
      setFormPhotos([...formPhotos, ...files]);
    }
  };

  const formStars = () => (
    <div id="review-addReview-starRating">
      {[...Array(5)].map((star, index) => {
        index += 1;
        return (
          <button
            id="reviews-formStarButton"
            data-testId={`reviews-addReviewStars${index}`}
            aria-label="Choose Star Rating for New Review"
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
    const trackRadioValues = (key, value) => {
      const newRadioValues = { ...formCharacteristics };
      newRadioValues[key] = value;
      setFormCharacteristics(newRadioValues);
    };

    if (characteristics) {
      const charKeys = Object.keys(characteristics);

      return (
        <>
          {charKeys.map((key) => (
            <div key={key} id="reviews-addReviewCharacteristicIndividual">
              {key}
              <CharRadioBtns
                id={key}
                trackRadioValues={trackRadioValues}
              />
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
          <form encType="multipart/form-data" onSubmit={handleSubmit}>
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
                  aria-label="Recommend Product"
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
                  aria-label="Do Not Recommend Product"
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
                  aria-label='New Review Summary Text'
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
                  aria-label='New Review Body Text'
                  minLength={50}
                  maxLength={1000}
                  value={formBody}
                  onChange={(e) => setFormBody(e.target.value)}
                  placeholder="Why did you like the product or not?"
                />
                <div id="reviews-addReviewSubtext">{formBodyCounter()}</div>
              </div>
              <div id="reviews-addReviewPhotos">
                <label htmlFor="fileInput">Select up to 5 image files:</label>
                <input
                  type="file"
                  aria-label='New Review Photo File'
                  id="fileInput"
                  accept="image/*"
                  multiple
                  onChange={handlePhotoUploadChange}
                />
              </div>
            </label>
            <label>
              <div id="reviews-addReviewNameEmail">
                Nickname:
                <input
                  type="text"
                  data-testid="reviews-addReviewName"
                  aria-label='New Review Nickname'
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
                  aria-label='New Review Email'
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
            <input type="submit" value="Submit" aria-label="Submit New Review"/>
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
