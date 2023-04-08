# Atelier E-Commerce Frontend

Frontend project for an E-Commerce website utilizing Javascript (React), CSS, HTML, Node Express deployed on AWS consisting of a homepage, product page (overview, related products, questions and answers, reviews), and a checkout page. Page routing is handled using React Router. Uploaded Images are stored via AWS S3.

## Table of Contents

1. [Description](#Description)
2. [Installation](#Installation)
3. [Setup](#Setup)
4. [Team Members](#Team-members)
5. [License](#License)

## Description

### Product Overview
- Product overview consists of images pertaining to current selected product style from the API. A main image will be displayed with all other image options on the left. You can move forward and backwards of the image using the arrow buttons. The side image can be clicked to update the main image on screen. Side images display a max of 7 and if there are more, a down arrow can be toggled to see more. Selected main image will be shown on the side image bar.
- <img width="500" alt="image" src="https://user-images.githubusercontent.com/106826710/230746975-d47b49ca-d5c0-46eb-9a93-c7ec844aaac8.png">

### Related Products
### Questions and Answers
### Reviews and Ratings
- Review List will contain all reviews for a given product. Can filter list via any selection within drop-down. Upon clicking More Reviews button, list will increment by two reviews with each click. If all reviews are shown, button will dissapear.

- Rating Graph will show average rating with subsequent filled-in star value.
- Each star rating bar is actionable, filtering the review list by the selected star rating
- Characteristics from Reviews are shown below rating graph, mapped from a value of 1 to 5.
-  <img width="170" alt="Screenshot 2023-04-08 at 3 25 13 PM" src="https://user-images.githubusercontent.com/106470519/230739285-7a1ad887-a1bf-40be-993b-afafcfadc4e5.png"> <img width="170" alt="Screenshot 2023-04-08 at 3 28 12 PM" src="https://user-images.githubusercontent.com/106470519/230739392-0fba7190-adc7-47a8-bc75-871d3f7c0941.png">

- Upon clicking on Add Review, a modal will popup where you can a new review can be added. Up to 5 images can be included with new reviews
- <img width="383" alt="Screenshot 2023-04-08 at 3 34 50 PM" src="https://user-images.githubusercontent.com/106470519/230739650-8d7e80bb-7e41-473e-89a2-9d16c1716e12.png">


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

[ISC](https://opensource.org/license/isc-license-txt/)
