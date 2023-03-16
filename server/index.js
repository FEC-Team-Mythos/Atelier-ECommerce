const express = require('express')
const path = require('path');
const fetch = require('../fetchData')

const app = express()
const port = 3000

const statics = path.join(__dirname + '/../client/dist');

app.use(express.static(statics));
app.use(express.json());

// path for related products
app.get('/related', (req, res) => {
  getRelated(req, res, (relatedProducts) => {
    res.send(relatedProducts);
  });
});

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

//async function to get related products
var getRelated = async function(req, res, callback) {
  var related_ids = await fetch('/products/71697/related', {product_id: 71697}, 'get');
  var relatedProducts = [];
  for (var i = 0; i < related_ids.data.length; i++) {
    const product = await fetch('/products/' + related_ids.data[i], {product_id: related_ids.data[i]}, 'get');
    const styles = await fetch('/products/' + related_ids.data[i] + '/styles', {product_id: related_ids.data[i]}, 'get');
    relatedProducts.push(product.data);
    relatedProducts[i].styles = styles.data;
  }
  callback(relatedProducts);
}

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

app.listen(port, () => {
  console.log(`FEC Atelier App listening on port ${port}`)
})