import react from 'react';
import {useState} from 'react'

const AddReviewModal = ({ addReviewState, toggleAddReviewState, setReviewToAdd }) => {
  const [formSummary, setFormSummary] = useState('');
  const [formBody, setFormBody] = useState('');
  const [formRecommend, setFormRecommend] = useState(false);
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formPhotos, setFormPhotos] = useState('');
  const [formCharacteristics, setFormCharacteristics] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    setReviewToAdd({
      product_id: 71697,
      rating: 5,
      summary: formSummary,
      body: formBody,
      recommend: formRecommend,
      name: formName,
      email: formEmail,
      formPhotos: formPhotos,
      characteristics: formCharacteristics
    })
    toggleAddReviewState(!addReviewState)
  }

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
              <div>
                Do you recommend this product?
              <input
              type="checkbox"
              value={formRecommend}
              onChange={(e) => setFormRecommend(e.target.value)}
              />
              </div>
            </label>
            <label>
              <div>
                Characteristics:
              </div>
            </label>
            <label>
              <div>
                Review Summary:
                <input
                type="text" maxLength={60}
                value={formSummary}
                onChange={(e) => setFormSummary(e.target.value)}/>
              </div>
            </label>
            <label>
              <div>
                Review Body:
                <input
                type="text" minLength={50} maxLength={1000}
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
                type="text" maxLength={60}
                value={formName}
                onChange={(e) => setFormName(e.target.value)}/>
              </div>
            </label>
            <label>
              <div>
                Email:
                <input
                type="text" maxLength={60}
                value={formEmail}
                onChange={(e) => setFormEmail(e.target.value)}/>
              </div>
            </label>
            <input type="submit" value="Submit" />
        </form>
          <button onClick={()=>toggleAddReviewState(!addReviewState)}>Close Form</button>
        </div>
      </div>
    )
  }
}

export default AddReviewModal;