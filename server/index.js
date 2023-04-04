require('dotenv').config();

const express = require('express');
const path = require('path');
const fetch = require('../fetchData');
const axios = require('axios')

const { S3Client, PutObjectCommand, GetObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');

const app = express();
const port = 3000;

const multer = require('multer');

const upload = multer();

const statics = path.join(`${__dirname}/../client/dist`);

app.use(express.static(statics));
app.use(express.json());

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

  const getParams = {
    Bucket: bucketName,
    Key: fileName,
  }

  const getCommand = new GetObjectCommand({ Bucket: bucketName, Key: fileName });

  const photoPost = await s3Client.send(new PutObjectCommand(uploadParams));
  const photoURL = await getSignedUrl(s3Client, getCommand);
  const shortURL = await axios.post('https://api-ssl.bitly.com/v4/shorten', {
    long_url: photoURL,
    domain: 'bit.ly',
  }, {
    headers: {
      Authorization: process.env.BITLY_TOKEN,
    },
  });
  return shortURL.data.link;

  //NEED TO BUY BITLY MONTHLY MEMBERSHIP
};

// path for related products
app.get('/related/products', (req, res) => {
  getRelated(req.query.product_id, (relatedProducts) => {
    res.send(relatedProducts);
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

app.post('/reviews', upload.any(), async (req, res) => {
  const { body, files } = req;
  const photoArr = [];
  for (var i = 0; i < files.length; i++) {
    const currPhotoURL = await uploadPhoto(files[i].buffer, files[i].originalname, files[i].mimetype);
    photoArr.push(currPhotoURL);
  }

  console.log('photo arr', photoArr);

  const newBody = body;
  newBody.product_id = Number(body.product_id);
  newBody.rating = Number(body.rating);
  newBody.recommend = (body.recommend === 'true');
  newBody.photos = photoArr;
  newBody.characteristics = JSON.parse(body.characteristics);

  fetch(req.url, {...newBody}, req.method)
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
