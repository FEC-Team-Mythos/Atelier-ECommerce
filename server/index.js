require('dotenv').config();
const express = require('express');
const path = require('path');
const fetch = require('../fetchData');

const app = express();
const port = 3000;

const statics = path.join(`${__dirname}/../client/dist`);

app.use(express.static(statics));
app.use(express.json());

app.get('/product', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

// path for related products
app.get('/related/products', (req, res) => {
  getRelated(req.query.product_id, (relatedProducts) => {
    res.send(relatedProducts);
  });
});

app.get('/products', (req, res) => {
  getProducts(req.query.page, req.query.count, (products) => {
    res.send(products);
  });
});
//For routing
app.get('/checkout', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
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

var getProducts = async function (page, count, callback) {
  var products = await fetch('/products/', { page, count }, 'get');
  products = products.data;
  for (let i = 0; i < products.length; i++) {
    // const product = await fetch(`/products/${products.data[i].id}`, { product_id: products.data[i].id }, 'get');
    const styles = await fetch(`/products/${products[i].id}/styles`, { product_id: products[i].id }, 'get');
    products[i].styles = styles.data;
  }
  callback(products);
};

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

app.post('/reviews', (req, res) => {
  console.log('abc', req);
  fetch(req.url, req.body, req.method)
    .then(() => {
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log('Could not post data: ', err);
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
