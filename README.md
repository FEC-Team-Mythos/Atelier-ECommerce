# Atelier E-Commerce Frontend

Frontend project for an E-Commerce website utilizing Javascript (React), CSS, HTML, Node Express deployed on AWS consisting of a homepage, product page (overview, related products, questions and answers, reviews), and a checkout page. Page routing is handled using React Router. Uploaded Images are stored via AWS S3.

## Table of Contents

1. [Main Product Widgets](#Main-Product-Widgets)
2. [Additional Components](#Additional-Components)
3. [Installation](#Installation)
4. [Setup](#Setup)
5. [Team Members](#Team-members)
6. [License](#License)

## Main Product Widgets

### Product Overview
- Product overview consists of an image container, rating, category information, product name, product style options, size selection, quantity selection, add to cart button, favorite outfit button, and product description / features pulled from multiple API calls. 
- <img width="800" alt="image" src="https://user-images.githubusercontent.com/106826710/230747225-0b7478c5-c472-4154-9ae5-aa3254a2c481.png">
- A main image will be displayed with all other image options on the left depending on selected style. You can move forward and backwards of the image using the arrow buttons. The side image can be clicked to update the main image on screen. Side images display a max of 7 and if there are more, a down arrow can be toggled to see more. Selected main image will be shown on the side image bar.
- <img width="500" alt="image" src="https://user-images.githubusercontent.com/106826710/230746975-d47b49ca-d5c0-46eb-9a93-c7ec844aaac8.png">
- Clicking on the expand button on top right of the main image, the image container will display over the product information on the right side. Clicking on the image allows the user to zoom and move the mouse (2.5x scale) around the main image.
- <img width="800" alt="image" src="https://user-images.githubusercontent.com/106826710/230747121-8feec311-9243-48a7-89a8-70b1cb649bed.png">


### Related Products
-
### Questions and Answers
-
### Reviews and Ratings
- Review List will contain all reviews for a given product. Can filter list via any selection within drop-down. Upon clicking More Reviews button, list will increment by two reviews with each click. If all reviews are shown, button will dissapear.

- Rating Graph will show average rating with subsequent filled-in star value.
- Each star rating bar is actionable, filtering the review list by the selected star rating
- Characteristics from Reviews are shown below rating graph, mapped from a value of 1 to 5.
-  <img width="170" alt="Screenshot 2023-04-08 at 3 25 13 PM" src="https://user-images.githubusercontent.com/106470519/230739285-7a1ad887-a1bf-40be-993b-afafcfadc4e5.png"> <img width="170" alt="Screenshot 2023-04-08 at 3 28 12 PM" src="https://user-images.githubusercontent.com/106470519/230739392-0fba7190-adc7-47a8-bc75-871d3f7c0941.png">

- Upon clicking on Add Review, a modal will popup where you can a new review can be added. Up to 5 images can be included with new reviews
- <img width="383" alt="Screenshot 2023-04-08 at 3 34 50 PM" src="https://user-images.githubusercontent.com/106470519/230739650-8d7e80bb-7e41-473e-89a2-9d16c1716e12.png">

## Additional Components
### Shopping Cart
- The shopping cart works with product overview page. Items added to cart are saved to the client's local storage preventing unnecessary use of a cart API. Product meta data consist of image url, quantity, size, cost, product name and style name. Items can be removed from cart. Clicking on checkout button will utilize react router to send user to checkout page.
- <img width="403" alt="image" src="https://user-images.githubusercontent.com/106826710/230747868-34745c20-8b2c-4bbe-bac6-d87ceb81c6fe.png">

### Navigation Bar
- The navigation bar will show up on the top of all page paths. When the logo is clicked, the browser will redirect the user to the home page. The shopping cart will be accessible at anytime to send user to checkout page. 
- <img width="1000" alt="image" src="https://user-images.githubusercontent.com/106826710/230748190-f25b6b05-06b8-4684-a006-414167005645.png">

### Checkout Page
- Checkout page consists of 2 different containers. The right container consists of data saved on the local storage. Subtotals for quantity and individual costs are added up into a total ammount. On the left consists of a shipping and contact information, then moves into payment information before placing order. The user can return to the product page at any time.
- <img width="700" alt="image" src="https://user-images.githubusercontent.com/106826710/230748933-47003ca4-1be4-4a87-b6e3-def1f432f020.png">
- <img width="700" alt="image" src="https://user-images.githubusercontent.com/106826710/230748951-3a83e37d-ccba-4a79-82f2-0c7c5d119413.png">


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
#### [Anthony Bui](https://www.linkedin.com/in/bui-anthony/) | [Github](https://github.com/aboowee) - Product Overview, Shopping Cart, Checkout Page, Navigation Bar, URL Pathing, Data Storage
#### [Justin Cheng](https://www.linkedin.com/in/justin-cheng-4117b854/) | [Github](https://github.com/juchengca) - Home Page, Related Products, Your Outfit
#### [Dylan Kahlstorf](https://www.linkedin.com/in/dylan-kahlstorf-3983ab241/) | [Github](https://github.com/kahlstorf1) - Reviews/Ratings, Interactions Logging, S3 Integration
#### Nick Mann

## License

[ISC](https://opensource.org/license/isc-license-txt/)
