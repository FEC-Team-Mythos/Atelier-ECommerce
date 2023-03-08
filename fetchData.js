const config = require('./config.js')
const axios = require('axios');

const fetchData = (endpoint, params={}, method='get') => {
  axios({
    method: method,
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp${endpoint}/`,
    headers: {
      Authorization: `${config.TOKEN}`,
    },
    params: params
  })
  .then((response) => {
    console.log(response.data);
    for (var i = 0; i < response.data.length; i++) {
      console.log(response.data[i]);
    }
  })
  .catch((err) => {
    console.log(err);
  })
}

module.exports = fetchData;