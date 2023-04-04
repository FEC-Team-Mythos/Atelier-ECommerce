const axios = require('axios');

const fetchData = (endpoint, params = {}, method = 'get') => {
  const requestData = {
    method,
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp${endpoint}`,
    headers: {
      Authorization: process.env.API_KEY,
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
