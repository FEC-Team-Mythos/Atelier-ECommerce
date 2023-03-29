const { FontAwesomeIcon } = require('@fortawesome/react-fontawesome');
const { library } = require('@fortawesome/fontawesome-svg-core');
const { faStar } = require('@fortawesome/free-solid-svg-icons');

const fetch = require('./fetchData');

library.add(faStar);

//NOT WORKING AS OF 3/29

function calcRatingAndStars() {
  const stars = [];
  const avgRating = 0;

  const starCount = (avgProductRating) => {
    let roundToNearestQuarter = Math.round(avgProductRating * 4) / 4;
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (roundToNearestQuarter > 1) {
        stars.push(<FontAwesomeIcon icon="fa-solid fa-star" />);
        roundToNearestQuarter--;
      } else if (roundToNearestQuarter < 1 && roundToNearestQuarter >= 0.75) {
        stars.push(<span className="threeQ"><FontAwesomeIcon icon="fa-solid fa-star" /></span>);
        roundToNearestQuarter--;
      } else if (roundToNearestQuarter < 0.75 && roundToNearestQuarter >= 0.5) {
        stars.push(<span className="oneHalf"><FontAwesomeIcon icon="fa-solid fa-star" /></span>);
        roundToNearestQuarter--;
      } else if (roundToNearestQuarter < 0.5 && roundToNearestQuarter >= 0.25) {
        stars.push(<span className="oneQuarter"><FontAwesomeIcon icon="fa-solid fa-star" /></span>);
        roundToNearestQuarter--;
      }
    }
  };

  const calcAvgRating = (metaDataRatings, avg = 0, total = 0) => {
    for (const rating in metaDataRatings) {
      avg += (rating * metaData.ratings[rating]);
      total += Number(metaData.ratings[rating]);
    }
    avgRating = (Number((avg / total).toFixed(1)));
  };

  fetch('/reviews/meta', { product_id: 71697 })
    .then((metaData) => {
      calcAvgRating(metaData.ratings);
      return starCount(avgRating);
    })
    .then(() => {
      console.log(avgRating);
      console.log(stars);
    })
    .catch((e) => {
      console.log(e);
    });
}
