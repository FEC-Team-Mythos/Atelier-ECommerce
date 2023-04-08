# Atelier E-Commerce Frontend

Frontend project for an E-Commerce website utilizing Javascript (React), CSS, HTML, Node Express deployed on AWS consisting of a homepage, product page (overview, related products, questions and answers, reviews), and a checkout page.

## Table of Contents

1. [Description](#Description)
2. [Installation](#Installation)
3. [Setup](#Setup)
4. [Team Members](#Team-members)
5. [License](#License)

## Description

### Product Overview
### Related Products
### Questions and Answers
### Reviews and Ratings
- Review List will contain all reviews for a given product. Can filter list via any selection within drop-down. Upon clicking More Reviews button, list will increment by two reviews with each click. If all reviews are shown, button will dissapear.
- Rating Graph will show average rating with subsequent filled-in star value. Each star rating bar is actionable, filtering the review list <img width="377" alt="Screenshot 2023-04-08 at 3 25 13 PM" src="https://user-images.githubusercontent.com/106470519/230739285-7a1ad887-a1bf-40be-993b-afafcfadc4e5.png">



## Installation

Use the package manager [npm](https://docs.npmjs.com/) to install necessary dependencies.

```bash
npm install
```

## Setup

Repository requires a github token to access API data, as well as an AWS S3 bucket to handle hosting images. TinyURL is also used in order to manage S3 links. A .env file template is provided below.

```bash
API_KEY=Github API Token
BUCKET_NAME=S3 Bucket Name
BUCKET_REGION=S3 Region
ACCESS_KEY=S3 Access Key
SECRET_ACCESS_KEY=S3 Secret Access Key
TINYURL_TOKEN=TinyURL API Token
```
## Team Members
#### [Anthony Bui](https://www.linkedin.com/in/bui-anthony/) | [Github](https://github.com/aboowee) - Product Overview, Shopping Cart, Checkout Page, Navigation Bar
#### [Justin Cheng](https://www.linkedin.com/in/justin-cheng-4117b854/) | [Github](https://github.com/juchengca) - Home Page, Related Products, Your Outfit
#### [Dylan Kahlstorf](https://www.linkedin.com/in/dylan-kahlstorf-3983ab241/) | [Github](https://github.com/kahlstorf1) - Reviews/Ratings, Interactions Logging, S3 Integration
#### Nick Mann - Fill whatever you like (MAKE YOURSELF LOOK GOOOOOD HERE)

## License

[MIT](https://choosealicense.com/licenses/mit/)
