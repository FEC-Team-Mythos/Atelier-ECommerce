const config = require('./config.js')
const axios = require('axios');

const fetchData = (widget, method, params={}) => {
  axios({
    method: "get",
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/${widget}/`,
    headers: {
      Authorization: `${config.TOKEN}`,
    },
    params: params
  })
  .then((response) => {
    response.data.forEach((key) => {
      console.log(key);
    })
  })
  .catch((err) => {
    console.log(err);
  })
}