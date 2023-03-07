const express = require('express')
const path = require('path');
const axios = require('axios');
require('dotenv').config();

const app = express()
const port = 3000

axios.get('https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/products', {
  headers: {
    Authorization: process.env.API_KEY
  },
  params: {
    count: 100
    // product_id: 71701
  }
})
.then(data => {
  console.log(data.data);
})
.catch(err => {
  console.log(err, ' ERROR')
})

const statics = path.join(__dirname + '/../client/dist');

app.use(express.static(statics));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`FEC Atelier App listening on port ${port}`)
})