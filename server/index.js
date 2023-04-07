/* eslint-disable no-var */
/* eslint-disable vars-on-top */
/* eslint-disable max-len */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-console */
require('dotenv').config();

const express = require('express');
const path = require('path');
// eslint-disable-next-line import/no-extraneous-dependencies
const multer = require('multer');
const axios = require('axios');

// eslint-disable-next-line import/no-extraneous-dependencies
const { S3Client, PutObjectCommand, GetObjectCommand } = require('@aws-sdk/client-s3');
// eslint-disable-next-line import/no-extraneous-dependencies
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');

const fetch = require('../fetchData');

const app = express();
const port = 3000;

const upload = multer();

const statics = path.join(`${__dirname}/../client/dist`);

app.use(express.static(statics));
app.use(express.json());

app.get('/product', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

const bucketName = process.env.BUCKET_NAME;
const region = process.env.BUCKET_REGION;
const accessKeyId = process.env.ACCESS_KEY;
const secretAccessKey = process.env.SECRET_ACCESS_KEY;

const s3Client = new S3Client({
  region,
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
});

const uploadPhoto = async (fileBuffer, fileName, ContentType) => {
  const uploadParams = {
    Bucket: bucketName,
    Body: fileBuffer,
    Key: fileName,
    ContentType,
  };

  // eslint-disable-next-line no-unused-vars
  const getParams = {
    Bucket: bucketName,
    Key: fileName,
  };

  const getCommand = new GetObjectCommand({ Bucket: bucketName, Key: fileName });

  // eslint-disable-next-line no-unused-vars
  const photoPost = await s3Client.send(new PutObjectCommand(uploadParams));
  const photoURL = await getSignedUrl(s3Client, getCommand);
  const shortURL = await axios.post('https://tinyurl.com/api-create.php', {
    url: photoURL,
  }, {
    headers: {
      Authorization: process.env.TINYURL_TOKEN,
    },
  });
  return shortURL.data;
};

// path for related products
app.get('/related/products', (req, res) => {
  // eslint-disable-next-line no-use-before-define
  getRelated(req.query.product_id, (relatedProducts) => {
    res.send(relatedProducts);
  });
});

app.get('/products', (req, res) => {
  getProducts(req.query.page, req.query.count, (products) => {
    res.send(products);
  });
});
// For routing
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
// eslint-disable-next-line func-names, camelcase
var getRelated = async function (product_id, callback) {
  // eslint-disable-next-line camelcase
  const related_ids = await fetch(`/products/${product_id}/related`, { product_id }, 'get');
  const relatedProducts = [];
  // eslint-disable-next-line camelcase, no-plusplus
  for (let i = 0; i < related_ids.data.length; i++) {
    // eslint-disable-next-line camelcase
    const product = await fetch(`/products/${related_ids.data[i]}`, { product_id: related_ids.data[i] }, 'get');
    // eslint-disable-next-line camelcase
    const styles = await fetch(`/products/${related_ids.data[i]}/styles`, { product_id: related_ids.data[i] }, 'get');
    relatedProducts.push(product.data);
    relatedProducts[i].styles = styles.data;
  }
  callback(relatedProducts);
};

app.post('/reviews', upload.any(), async (req, res) => {
  const { body, files } = req;
  const photoArr = [];
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < files.length; i++) {
    const currPhotoURL = await uploadPhoto(files[i].buffer, files[i].originalname, files[i].mimetype);
    photoArr.push(currPhotoURL);
  }

  const newBody = body;
  newBody.product_id = Number(body.product_id);
  newBody.rating = Number(body.rating);
  newBody.recommend = (body.recommend === 'true');
  newBody.photos = photoArr;
  newBody.characteristics = JSON.parse(body.characteristics);

  fetch(req.url, { ...newBody }, req.method)
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
