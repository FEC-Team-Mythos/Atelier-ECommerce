const express = require('express')
const path = require('path');
const fetch = require('../fetchData')

const app = express()
const port = 3000

app.get('/specificProduct', (req, res) => {
  fetch('/products/71701', {product_id:71701})
  .then((data) => {
    console.log('hey');
  })
})
// axios.get('https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/products/71701', {
//   headers: {
//     Authorization: process.env.API_KEY
//   },
//   params: {
//     // count: 100
//     product_id: 71701
//   }
// })
// .then(data => {
//   console.log(data.data);
// })
// .catch(err => {
//   console.log(err, ' ERROR')
// })

const statics = path.join(__dirname + '/../client/dist');

app.use(express.static(statics));
app.use(express.json());

/* EXAMPLE OF GET REQUEST USING FETCH HELPER FUNCTION
-------------------------------------------------------
app.get('/products', (req, res) => {
  fetch(req.url, {count: 100})
    .then(data => {
      res.send(data.data);
    })
    .catch(err => {
      console.log('Could not get data: ', err);
    })
}) */

app.listen(port, () => {
  console.log(`FEC Atelier App listening on port ${port}`)
})