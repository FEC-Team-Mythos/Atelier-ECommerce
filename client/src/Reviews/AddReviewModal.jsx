import react from 'react';

const AddReviewModal = ({ addReviewState, toggleAddReviewState }) => {
  if (addReviewState) {
    return (
      <div id="popup">
        <div id="popup-inner">
          <form>
            <h3>Write Your Review</h3>
            <label>
              <div>
                Rating: 5 STAR ICONS HERE - Poor/Fair/Avg/Good/Great
              </div>
            </label>
            <label>
              <div>
                Do you recommend this product?
              <input type="checkbox" />
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