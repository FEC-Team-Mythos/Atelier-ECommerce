const express = require('express')
const path = require('path');
const fetch = require('../fetchData')

const app = express()
const port = 3000

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