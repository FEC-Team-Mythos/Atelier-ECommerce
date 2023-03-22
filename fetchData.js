const axios = require('axios');
const config = require('./config.js');

const fetchData = (endpoint, params = {}, method = 'get') => {
  const requestData = {
    method,
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp${endpoint}`,
    headers: {
      Authorization: `${config.TOKEN}`,
    },
  };

  if (method === 'get') {
    requestData.params = params;
  } else {
    requestData.data = params;
  }

  return axios(requestData);
};

module.exports = fetchData;