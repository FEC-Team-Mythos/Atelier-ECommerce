require('dotenv').config();
const express = require('express');
const path = require('path');
const fetch = require('../fetchData');

const app = express();
const port = 3000;

const multer = require('multer');
const upload = multer();

const statics = path.join(`${__dirname}/../client/dist`);

app.use(express.static(statics));
app.use(express.json());

// path for related products
app.get('/related/products', (req, res) => {
  getRelated(req.query.product_id, (relatedProducts) => {
    res.send(relatedProducts);
  });
});

app.get('*', (req, res) => {
  fetch(req.url, req.body.params, req.method)
    .then((data) => {
      res.send(data.data);
    })
    .catch((err) => {
      console.log('Could not get data: ', err);
      res.sendStatus(404);
    });
});

// async function to get related products
var getRelated = async function (product_id, callback) {
  const related_ids = await fetch(`/products/${product_id}/related`, { product_id }, 'get');
  const relatedProducts = [];
  for (let i = 0; i < related_ids.data.length; i++) {
    const product = await fetch(`/products/${related_ids.data[i]}`, { product_id: related_ids.data[i] }, 'get');
    const styles = await fetch(`/products/${related_ids.data[i]}/styles`, { product_id: related_ids.data[i] }, 'get');
    relatedProducts.push(product.data);
    relatedProducts[i].styles = styles.data;
  }
  callback(relatedProducts);
};

app.post('/reviews', upload.any(), (req, res) => {
  const { body, files } = req;

  console.log(body);
  console.log(files);

  fetch(req.url, req.body, req.method)
    .then(() => {
      res.sendStatus(201);
    })
    .catch((err) => {
      // console.log('Could not post data: ', err);
      res.sendStatus(501);
    });
});

app.post('*', (req, res) => {
  fetch(req.url, req.body.params, req.method)
    .then(() => {
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log('Could not post data: ', err);
      res.sendStatus(501);
    });
});

app.put('*', (req, res) => {
  fetch(req.url, req.body.params, req.method)
    .then(() => {
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log('Could not post data: ', err);
      res.sendStatus(501);
    });
});

app.listen(port, () => {
  console.log(`FEC Atelier App listening on port ${port}`);
});
