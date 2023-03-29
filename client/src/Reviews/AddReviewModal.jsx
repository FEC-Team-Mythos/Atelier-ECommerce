import react, { useState, useEffect } from 'react';
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
    const formatCharacteristics = () => {

      for (key in formCharacteristics) {
        key === "Size" ? charObj["10"] = formCharacteristics[key] : null;
        key === "Width" ? charObj["10"] = formCharacteristics[key] : null;
        key === "Comfort" ? charObj["10"] = formCharacteristics[key] : null;
        key === "Quality" ? charObj["10"] = formCharacteristics[key] : null;
        key === "Length" ? charObj["10"] = formCharacteristics[key] : null;
        key === "Fit" ? charObj["10"] = formCharacteristics[key] : null;
      }
    };

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

  function DisplayRadioButtons(input) {
    const radioButtons = [];

    const trackRadioValues = (key, value) => {
      const newRadioValues = { ...formCharacteristics }; // Create a copy of the existing radioValues object
      newRadioValues[key.input] = value; // Update the value for the input key
      setFormCharacteristics(newRadioValues);
    };

    for (let i = 1; i <= 5; i++) {
      const radioButton = (
        <label key={i}>
          <input
            type="radio"
            name={input}
            value={i}
            checked={formCharacteristics[input] === i}
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
            <div key={key}>
              {key}
              <DisplayRadioButtons input={key} />
              {charLabels[key][formCharacteristics[key] - 1]}
            </div>
          ))}
        </>
      );
    }
  };

  const formBodyCounter = () => {
    if (formBody.length < 50) {
      return 50 - formBody.length;
    } else {
      return 0;
    }
  }


  if (addReviewState) {
    return (
      <div id="popup">
        <div id="popup-inner">
          <form onSubmit={handleSubmit}>
            <h3>Write Your Review</h3>
            <label>
              <div>
                {formStars()}
                {starText[formRating - 1]}
              </div>
            </label>
            <label>
              Do you recommend this product?
              <input
                type="radio"
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
                name="no"
                value="false"
                checked={formRecommend === false}
                onChange={handleRecommendChange}
              />
              No
            </label>
            <label>
              <div>
                {displayCharacterRadio()}
              </div>
            </label>
            <label>
              <div>
                <span id="reviews-addReviewSummary">Review Summary:</span>
                <input
                  type="text"
                  maxLength={60}
                  value={formSummary}
                  onChange={(e) => setFormSummary(e.target.value)}
                  placeholder="Best purchase ever!"
                />
              </div>
            </label>
            <label>
              <div>
                Review Body:
                <input
                  type="text"
                  minLength={50}
                  maxLength={1000}
                  value={formBody}
                  onChange={(e) => setFormBody(e.target.value)}
                  placeholder="Why did you like the product or not?"
                />
                {formBodyCounter()}
              </div>
              <div>
                Photos:
              </div>
            </label>
            <label>
              <div>
                Nickname:
                <input
                  type="text"
                  maxLength={60}
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="jackson11"
                />
              </div>
            </label>
            <label>
              <div>
                Email:
                <input
                  type="text"
                  maxLength={60}
                  value={formEmail}
                  onChange={(e) => setFormEmail(e.target.value)}
                  placeholder="jackson11@gmail.com"
                />
              </div>
            </label>
            <input type="submit" value="Submit" />
          </form>
          <button onClick={() => toggleAddReviewState(!addReviewState)}>Close Form</button>
        </div>
      </div>
    );
  }
}

export default AddReviewModal;
