import react, { useState, useEffect } from 'react';
import axios from 'axios';

function AddReviewModal({ addReviewState, toggleAddReviewState, characteristics }) {
  const [formSummary, setFormSummary] = useState('');
  const [formBody, setFormBody] = useState('');
  const [formRecommend, setFormRecommend] = useState(false);
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formPhotos, setFormPhotos] = useState([]);
  const [formCharacteristics, setFormCharacteristics] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      product_id: 71697,
      rating: 5,
      summary: formSummary,
      body: formBody,
      recommend: formRecommend,
      name: formName,
      email: formEmail,
      photos: formPhotos,
      characteristics: formCharacteristics,
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

  const DisplayRadioButtons = (input) =>{
    const radioButtons = [];
    for (let i = 1; i <= 5; i++) {
      const radioButton = (
        <label key={i}>
          <input type="radio" name={input} value={i} />
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

  const displayCharacterRadio = () => {
    if (characteristics) {
      const charKeys = Object.keys(characteristics);
      return (
        <>
          {charKeys.map((key) => (
            <div key={key}>
              {key}
              <DisplayRadioButtons input={key} />
            </div>
          ))}
        </>
      );
    }
  };

  if (addReviewState) {
    return (
      <div id="popup">
        <div id="popup-inner">
          <form onSubmit={handleSubmit}>
            <h3>Write Your Review</h3>
            <label>
              <div>
                Rating: 5 STAR ICONS HERE - Poor/Fair/Avg/Good/Great
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
                Review Summary:
                <input
                  type="text"
                  maxLength={60}
                  value={formSummary}
                  onChange={(e) => setFormSummary(e.target.value)}
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
                />
              </div>
            </label>
            <label>
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
