const config = require('./config.js')
const axios = require('axios');

const fetchData = (endpoint, params={}, method='get') => {
  return axios({
    method: method,
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp${endpoint}/`,
    headers: {
      Authorization: `${config.TOKEN}`
    },
    params: params
  })
}

module.exports = fetchData;