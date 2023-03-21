const express = require('express')
const path = require('path');
const fetch = require('../fetchData')

const app = express()
const port = 3000

const statics = path.join(__dirname + '/../client/dist');

app.use(express.static(statics));
app.use(express.json());

app.get('*', (req, res) => {
  fetch(req.url, req.body.params, req.method)
    .then(data => {
      res.send(data.data);
    })
    .catch(err => {
      console.log('Could not get data: ', err);
      res.sendStatus(404);
    })
})

app.post('*', (req, res) => {
  fetch(req.url, req.body.params, req.method)
    .then(data => {
      res.sendStatus(201);
    })
    .catch(err => {
      console.log('Could not post data: ', err);
      res.sendStatus(501);
    })
})

app.put('*', (req, res) => {
  console.log(req.url);
  console.log(req.body);
  console.log(req.method);

  fetch(req.url, req.body.params, req.method)
    .then(data => {
      res.sendStatus(201);
    })
    .catch(err => {
      console.log('Could not post data: ', err);
      res.sendStatus(501);
    })
})

app.listen(port, () => {
  console.log(`FEC Atelier App listening on port ${port}`)
})