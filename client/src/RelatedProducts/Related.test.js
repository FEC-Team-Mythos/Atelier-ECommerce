
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import '@testing-library/jest-dom';
import RelatedProducts from './RelatedProducts.jsx';
import Modal from './Components/Modal.jsx';
import RelatedList from './Components/RelatedList.jsx';
import OutfitList from './Components/OutfitList.jsx';
import Carousel from './Components/Carousel.jsx';

const mockData = [
  {
      "id": 71698,
      "campus": "hr-rpp",
      "name": "Bright Future Sunglasses",
      "slogan": "You've got to wear shades",
      "description": "Where you're going you might not need roads, but you definitely need some shades. Give those baby blues a rest and let the future shine bright on these timeless lenses.",
      "category": "Accessories",
      "default_price": "69.00",
      "created_at": "2022-05-11T19:38:15.373Z",
      "updated_at": "2022-05-11T19:38:15.373Z",
      "features": [
          {
              "feature": "Lenses",
              "value": "Ultrasheen"
          },
          {
              "feature": "UV Protection",
              "value": null
          },
          {
              "feature": "Frames",
              "value": "LightCompose"
          }
      ],
      "styles": {
          "product_id": "71698",
          "results": [
              {
                  "style_id": 444224,
                  "name": "Black Lenses & Black Frame",
                  "original_price": "69.00",
                  "sale_price": null,
                  "default?": false,
                  "photos": [
                      {
                          "thumbnail_url": null,
                          "url": null
                      }
                  ],
                  "skus": {
                      "null": {
                          "quantity": null,
                          "size": null
                      }
                  }
              },
              {
                  "style_id": 444225,
                  "name": "Black Lenses & Gold Frame",
                  "original_price": "69.00",
                  "sale_price": null,
                  "default?": true,
                  "photos": [
                      {
                          "thumbnail_url": null,
                          "url": null
                      }
                  ],
                  "skus": {
                      "null": {
                          "quantity": null,
                          "size": null
                      }
                  }
              },
              {
                  "style_id": 444226,
                  "name": "Gold Lenses & Black Frame",
                  "original_price": "69.00",
                  "sale_price": null,
                  "default?": false,
                  "photos": [
                      {
                          "thumbnail_url": null,
                          "url": null
                      }
                  ],
                  "skus": {
                      "null": {
                          "quantity": null,
                          "size": null
                      }
                  }
              },
              {
                  "style_id": 444227,
                  "name": "Gold Lenses & Gold Frame",
                  "original_price": "69.00",
                  "sale_price": null,
                  "default?": false,
                  "photos": [
                      {
                          "thumbnail_url": null,
                          "url": null
                      }
                  ],
                  "skus": {
                      "null": {
                          "quantity": null,
                          "size": null
                      }
                  }
              }
          ]
      }
  },
  {
      "id": 71699,
      "campus": "hr-rpp",
      "name": "Morning Joggers",
      "slogan": "Make yourself a morning person",
      "description": "Whether you're a morning person or not.  Whether you're gym bound or not.  Everyone looks good in joggers.",
      "category": "Pants",
      "default_price": "40.00",
      "created_at": "2022-05-11T19:38:15.373Z",
      "updated_at": "2022-05-11T19:38:15.373Z",
      "features": [
          {
              "feature": "Fabric",
              "value": "100% Cotton"
          },
          {
              "feature": "Cut",
              "value": "Skinny"
          }
      ],
      "styles": {
          "product_id": "71699",
          "results": [
              {
                  "style_id": 444228,
                  "name": "Black",
                  "original_price": "40.00",
                  "sale_price": null,
                  "default?": true,
                  "photos": [
                      {
                          "thumbnail_url": "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
                          "url": "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80"
                      },
                      {
                          "thumbnail_url": "https://images.unsplash.com/photo-1492447105260-2e947425b5cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
                          "url": "https://images.unsplash.com/photo-1492447105260-2e947425b5cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80"
                      },
                      {
                          "thumbnail_url": "https://images.unsplash.com/photo-1548133464-29abc661eb5c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
                          "url": "https://images.unsplash.com/photo-1548133464-29abc661eb5c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80"
                      },
                      {
                          "thumbnail_url": "https://images.unsplash.com/photo-1500340520802-1687634cbe38?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
                          "url": "https://images.unsplash.com/photo-1500340520802-1687634cbe38?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80"
                      },
                      {
                          "thumbnail_url": "https://images.unsplash.com/photo-1559304022-afbf28f53c4d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
                          "url": "https://images.unsplash.com/photo-1559304022-afbf28f53c4d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1656&q=80"
                      },
                      {
                          "thumbnail_url": "https://images.unsplash.com/photo-1554921148-83d8ceda2095?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
                          "url": "https://images.unsplash.com/photo-1554921148-83d8ceda2095?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80"
                      }
                  ],
                  "skus": {
                      "2580562": {
                          "quantity": 8,
                          "size": "XS"
                      },
                      "2580563": {
                          "quantity": 16,
                          "size": "S"
                      },
                      "2580564": {
                          "quantity": 17,
                          "size": "M"
                      },
                      "2580565": {
                          "quantity": 10,
                          "size": "L"
                      },
                      "2580566": {
                          "quantity": 15,
                          "size": "XL"
                      },
                      "2580567": {
                          "quantity": 6,
                          "size": "XXL"
                      }
                  }
              },
              {
                  "style_id": 444229,
                  "name": "Grey",
                  "original_price": "40.00",
                  "sale_price": null,
                  "default?": false,
                  "photos": [
                      {
                          "thumbnail_url": "https://images.unsplash.com/photo-1562542082-519ebcdb43e6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
                          "url": "https://images.unsplash.com/photo-1562542082-519ebcdb43e6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2057&q=80"
                      },
                      {
                          "thumbnail_url": "https://images.unsplash.com/photo-1562542132-8555e1b583f3?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
                          "url": "https://images.unsplash.com/photo-1562542132-8555e1b583f3?ixlib=rb-1.2.1&auto=format&fit=crop&w=2057&q=80"
                      },
                      {
                          "thumbnail_url": "https://images.unsplash.com/photo-1562542096-218d8f9760bc?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
                          "url": "https://images.unsplash.com/photo-1562542096-218d8f9760bc?ixlib=rb-1.2.1&auto=format&fit=crop&w=2057&q=80"
                      },
                      {
                          "thumbnail_url": "https://images.unsplash.com/photo-1562542119-19d015b93c45?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
                          "url": "https://images.unsplash.com/photo-1562542119-19d015b93c45?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2057&q=80"
                      },
                      {
                          "thumbnail_url": "https://images.unsplash.com/photo-1516684810863-e49c82f1f092?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
                          "url": "https://images.unsplash.com/photo-1516684810863-e49c82f1f092?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=965&q=80"
                      },
                      {
                          "thumbnail_url": "https://images.unsplash.com/photo-1490427712608-588e68359dbd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
                          "url": "https://images.unsplash.com/photo-1490427712608-588e68359dbd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80"
                      }
                  ],
                  "skus": {
                      "2580568": {
                          "quantity": 8,
                          "size": "XS"
                      },
                      "2580569": {
                          "quantity": 16,
                          "size": "S"
                      },
                      "2580570": {
                          "quantity": 17,
                          "size": "M"
                      },
                      "2580571": {
                          "quantity": 10,
                          "size": "L"
                      },
                      "2580572": {
                          "quantity": 15,
                          "size": "XL"
                      },
                      "2580573": {
                          "quantity": 6,
                          "size": "XXL"
                      }
                  }
              },
              {
                  "style_id": 444230,
                  "name": "Goldenrod",
                  "original_price": "40.00",
                  "sale_price": "35.00",
                  "default?": false,
                  "photos": [
                      {
                          "thumbnail_url": "https://images.unsplash.com/photo-1530073391204-7b34a1497281?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
                          "url": "https://images.unsplash.com/photo-1530073391204-7b34a1497281?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80"
                      },
                      {
                          "thumbnail_url": "https://images.unsplash.com/photo-1482876555840-f31c5ebbff1c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
                          "url": "https://images.unsplash.com/photo-1482876555840-f31c5ebbff1c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1651&q=80"
                      },
                      {
                          "thumbnail_url": "https://images.unsplash.com/photo-1426647451887-5f2be01918a9?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
                          "url": "https://images.unsplash.com/photo-1426647451887-5f2be01918a9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80"
                      },
                      {
                          "thumbnail_url": "https://images.unsplash.com/photo-1517438476312-10d79c077509?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
                          "url": "https://images.unsplash.com/photo-1517438476312-10d79c077509?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80"
                      },
                      {
                          "thumbnail_url": "https://images.unsplash.com/photo-1485646979142-d4abb57a876f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
                          "url": "https://images.unsplash.com/photo-1485646979142-d4abb57a876f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2089&q=80"
                      },
                      {
                          "thumbnail_url": "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
                          "url": "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=962&q=80"
                      }
                  ],
                  "skus": {
                      "2580574": {
                          "quantity": 8,
                          "size": "XS"
                      },
                      "2580575": {
                          "quantity": 16,
                          "size": "S"
                      },
                      "2580576": {
                          "quantity": 17,
                          "size": "M"
                      },
                      "2580577": {
                          "quantity": 10,
                          "size": "L"
                      },
                      "2580578": {
                          "quantity": 15,
                          "size": "XL"
                      },
                      "2580579": {
                          "quantity": 6,
                          "size": "XXL"
                      }
                  }
              },
              {
                  "style_id": 444231,
                  "name": "Maroon",
                  "original_price": "40.00",
                  "sale_price": "35.00",
                  "default?": false,
                  "photos": [
                      {
                          "thumbnail_url": "https://images.unsplash.com/photo-1519857609704-61e751edba25?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
                          "url": "https://images.unsplash.com/photo-1519857609704-61e751edba25?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80"
                      },
                      {
                          "thumbnail_url": "https://images.unsplash.com/photo-1499714832275-d6205d94c35d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
                          "url": "https://images.unsplash.com/photo-1499714832275-d6205d94c35d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80"
                      },
                      {
                          "thumbnail_url": "https://images.unsplash.com/photo-1532244769164-ff64ddeefa45?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
                          "url": "https://images.unsplash.com/photo-1532244769164-ff64ddeefa45?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80"
                      },
                      {
                          "thumbnail_url": "https://images.unsplash.com/photo-1549540806-76ce9007b674?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
                          "url": "https://images.unsplash.com/photo-1549540806-76ce9007b674?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80"
                      },
                      {
                          "thumbnail_url": "https://images.unsplash.com/photo-1554136920-a1df2909d8f2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
                          "url": "https://images.unsplash.com/photo-1554136920-a1df2909d8f2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80"
                      },
                      {
                          "thumbnail_url": "https://images.unsplash.com/photo-1541214880206-03318856c6c9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
                          "url": "https://images.unsplash.com/photo-1541214880206-03318856c6c9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80"
                      }
                  ],
                  "skus": {
                      "2580580": {
                          "quantity": 8,
                          "size": "XS"
                      },
                      "2580581": {
                          "quantity": 16,
                          "size": "S"
                      },
                      "2580582": {
                          "quantity": 17,
                          "size": "M"
                      },
                      "2580583": {
                          "quantity": 10,
                          "size": "L"
                      },
                      "2580584": {
                          "quantity": 15,
                          "size": "XL"
                      },
                      "2580585": {
                          "quantity": 6,
                          "size": "XXL"
                      }
                  }
              },
              {
                  "style_id": 444232,
                  "name": "Chartreuse",
                  "original_price": "40.00",
                  "sale_price": "25.00",
                  "default?": false,
                  "photos": [
                      {
                          "thumbnail_url": "https://images.unsplash.com/photo-1530073391204-7b34a1497281?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
                          "url": "https://images.unsplash.com/photo-1530073391204-7b34a1497281?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80"
                      },
                      {
                          "thumbnail_url": "https://images.unsplash.com/photo-1482876555840-f31c5ebbff1c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
                          "url": "https://images.unsplash.com/photo-1482876555840-f31c5ebbff1c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1651&q=80"
                      },
                      {
                          "thumbnail_url": "https://images.unsplash.com/photo-1426647451887-5f2be01918a9?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
                          "url": "https://images.unsplash.com/photo-1426647451887-5f2be01918a9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80"
                      },
                      {
                          "thumbnail_url": "https://images.unsplash.com/photo-1517438476312-10d79c077509?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
                          "url": "https://images.unsplash.com/photo-1517438476312-10d79c077509?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80"
                      },
                      {
                          "thumbnail_url": "https://images.unsplash.com/photo-1485646979142-d4abb57a876f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
                          "url": "https://images.unsplash.com/photo-1485646979142-d4abb57a876f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2089&q=80"
                      },
                      {
                          "thumbnail_url": "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
                          "url": "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=962&q=80"
                      }
                  ],
                  "skus": {
                      "2580586": {
                          "quantity": 8,
                          "size": "XS"
                      },
                      "2580587": {
                          "quantity": 16,
                          "size": "S"
                      },
                      "2580588": {
                          "quantity": 17,
                          "size": "M"
                      },
                      "2580589": {
                          "quantity": 10,
                          "size": "L"
                      },
                      "2580590": {
                          "quantity": 15,
                          "size": "XL"
                      },
                      "2580591": {
                          "quantity": 6,
                          "size": "XXL"
                      }
                  }
              },
              {
                  "style_id": 444233,
                  "name": "White",
                  "original_price": "40.00",
                  "sale_price": null,
                  "default?": false,
                  "photos": [
                      {
                          "thumbnail_url": "https://images.unsplash.com/photo-1510390099355-23e690d8129d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
                          "url": "https://images.unsplash.com/photo-1510390099355-23e690d8129d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80"
                      },
                      {
                          "thumbnail_url": "https://images.unsplash.com/photo-1547257965-087be799b084?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
                          "url": "https://images.unsplash.com/photo-1547257965-087be799b084?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80"
                      },
                      {
                          "thumbnail_url": "https://images.unsplash.com/photo-1510217167326-549ae78e4738?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
                          "url": "https://images.unsplash.com/photo-1510217167326-549ae78e4738?ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80"
                      },
                      {
                          "thumbnail_url": "https://images.unsplash.com/photo-1470282312847-28b943046dc1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
                          "url": "https://images.unsplash.com/photo-1470282312847-28b943046dc1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1652&q=80"
                      },
                      {
                          "thumbnail_url": "https://images.unsplash.com/photo-1552904219-f4b87efe8792?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
                          "url": "https://images.unsplash.com/photo-1552904219-f4b87efe8792?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=666&q=80"
                      },
                      {
                          "thumbnail_url": "https://images.unsplash.com/photo-1519241978701-4302ab53de1b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
                          "url": "https://images.unsplash.com/photo-1519241978701-4302ab53de1b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80"
                      }
                  ],
                  "skus": {
                      "2580592": {
                          "quantity": 8,
                          "size": "XS"
                      },
                      "2580593": {
                          "quantity": 16,
                          "size": "S"
                      },
                      "2580594": {
                          "quantity": 17,
                          "size": "M"
                      },
                      "2580595": {
                          "quantity": 10,
                          "size": "L"
                      },
                      "2580596": {
                          "quantity": 15,
                          "size": "XL"
                      },
                      "2580597": {
                          "quantity": 6,
                          "size": "XXL"
                      }
                  }
              }
          ]
      }
  },
  {
      "id": 71704,
      "campus": "hr-rpp",
      "name": "YEasy 350",
      "slogan": "Just jumped over jumpman",
      "description": "These stretchy knit shoes show off asymmetrical lacing and a big sculpted rubber midsole. In a nod to adidas soccer heritage.",
      "category": "Kicks",
      "default_price": "450.00",
      "created_at": "2022-05-11T19:38:15.373Z",
      "updated_at": "2022-05-11T19:38:15.373Z",
      "features": [
          {
              "feature": "Sole",
              "value": "Rubber"
          },
          {
              "feature": "Material",
              "value": "FullControlSkin"
          },
          {
              "feature": "Stitching",
              "value": "Double Stitch"
          }
      ],
      "styles": {
          "product_id": "71704",
          "results": [
              {
                  "style_id": 444254,
                  "name": "Zebra Stripe",
                  "original_price": "900.00",
                  "sale_price": null,
                  "default?": false,
                  "photos": [
                      {
                          "thumbnail_url": "https://images.unsplash.com/photo-1551489186-cf8726f514f8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
                          "url": "https://images.unsplash.com/photo-1551489186-cf8726f514f8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80"
                      },
                      {
                          "thumbnail_url": "https://images.unsplash.com/photo-1507920676663-3b72429774ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
                          "url": "https://images.unsplash.com/photo-1507920676663-3b72429774ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=1567&q=80"
                      },
                      {
                          "thumbnail_url": "https://images.unsplash.com/photo-1544376664-80b17f09d399?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
                          "url": "https://images.unsplash.com/photo-1544376664-80b17f09d399?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1525&q=80"
                      },
                      {
                          "thumbnail_url": "https://images.unsplash.com/photo-1513531926349-466f15ec8cc7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
                          "url": "https://images.unsplash.com/photo-1513531926349-466f15ec8cc7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80"
                      },
                      {
                          "thumbnail_url": "https://images.unsplash.com/photo-1517278322228-3fe7a86cf6f0?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
                          "url": "https://images.unsplash.com/photo-1517278322228-3fe7a86cf6f0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1567&q=80"
                      },
                      {
                          "thumbnail_url": "https://images.unsplash.com/photo-1517720359744-6d12f8a09b10?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
                          "url": "https://images.unsplash.com/photo-1517720359744-6d12f8a09b10?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80"
                      },
                      {
                          "thumbnail_url": "https://images.unsplash.com/photo-1530821875964-91927b611bad?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
                          "url": "https://images.unsplash.com/photo-1530821875964-91927b611bad?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80"
                      },
                      {
                          "thumbnail_url": "https://images.unsplash.com/photo-1519862170344-6cd5e49cb996?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
                          "url": "https://images.unsplash.com/photo-1519862170344-6cd5e49cb996?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80"
                      },
                      {
                          "thumbnail_url": "https://images.unsplash.com/photo-1558014356-f7c41bc744f7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
                          "url": "https://images.unsplash.com/photo-1558014356-f7c41bc744f7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80"
                      },
                      {
                          "thumbnail_url": "https://images.unsplash.com/photo-1542818212-9899bafcb9db?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
                          "url": "https://images.unsplash.com/photo-1542818212-9899bafcb9db?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1526&q=80"
                      },
                      {
                          "thumbnail_url": "https://images.unsplash.com/photo-1515110371136-7e393289662c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
                          "url": "https://images.unsplash.com/photo-1515110371136-7e393289662c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1656&q=80"
                      }
                  ],
                  "skus": {
                      "2580773": {
                          "quantity": 14,
                          "size": "7"
                      },
                      "2580774": {
                          "quantity": 25,
                          "size": "7.5"
                      },
                      "2580775": {
                          "quantity": 9,
                          "size": "8"
                      },
                      "2580776": {
                          "quantity": 2,
                          "size": "8.5"
                      },
                      "2580777": {
                          "quantity": 18,
                          "size": "9"
                      },
                      "2580778": {
                          "quantity": 12,
                          "size": "9.5"
                      },
                      "2580779": {
                          "quantity": 10,
                          "size": "10"
                      },
                      "2580780": {
                          "quantity": 18,
                          "size": "10.5"
                      },
                      "2580781": {
                          "quantity": 11,
                          "size": "11"
                      },
                      "2580782": {
                          "quantity": 35,
                          "size": "11.5"
                      },
                      "2580783": {
                          "quantity": 25,
                          "size": "12"
                      }
                  }
              },
              {
                  "style_id": 444255,
                  "name": "Oreo",
                  "original_price": "750.00",
                  "sale_price": null,
                  "default?": false,
                  "photos": [
                      {
                          "thumbnail_url": "https://images.unsplash.com/photo-1520904549193-5ab0027b3fa6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
                          "url": "https://images.unsplash.com/photo-1520904549193-5ab0027b3fa6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80"
                      },
                      {
                          "thumbnail_url": "https://images.unsplash.com/photo-1517720359744-6d12f8a09b10?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
                          "url": "https://images.unsplash.com/photo-1517720359744-6d12f8a09b10?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80"
                      },
                      {
                          "thumbnail_url": "https://images.unsplash.com/photo-1530821875964-91927b611bad?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
                          "url": "https://images.unsplash.com/photo-1530821875964-91927b611bad?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80"
                      },
                      {
                          "thumbnail_url": "https://images.unsplash.com/photo-1519862170344-6cd5e49cb996?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
                          "url": "https://images.unsplash.com/photo-1519862170344-6cd5e49cb996?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80"
                      },
                      {
                          "thumbnail_url": "https://images.unsplash.com/photo-1507920676663-3b72429774ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
                          "url": "https://images.unsplash.com/photo-1507920676663-3b72429774ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=1567&q=80"
                      },
                      {
                          "thumbnail_url": "https://images.unsplash.com/photo-1544376664-80b17f09d399?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
                          "url": "https://images.unsplash.com/photo-1544376664-80b17f09d399?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1525&q=80"
                      },
                      {
                          "thumbnail_url": "https://images.unsplash.com/photo-1513531926349-466f15ec8cc7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
                          "url": "https://images.unsplash.com/photo-1513531926349-466f15ec8cc7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80"
                      },
                      {
                          "thumbnail_url": "https://images.unsplash.com/photo-1517278322228-3fe7a86cf6f0?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
                          "url": "https://images.unsplash.com/photo-1517278322228-3fe7a86cf6f0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1567&q=80"
                      },
                      {
                          "thumbnail_url": "https://images.unsplash.com/photo-1517720359744-6d12f8a09b10?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
                          "url": "https://images.unsplash.com/photo-1517720359744-6d12f8a09b10?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80"
                      },
                      {
                          "thumbnail_url": "https://images.unsplash.com/photo-1530821875964-91927b611bad?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
                          "url": "https://images.unsplash.com/photo-1530821875964-91927b611bad?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80"
                      },
                      {
                          "thumbnail_url": "https://images.unsplash.com/photo-1519862170344-6cd5e49cb996?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
                          "url": "https://images.unsplash.com/photo-1519862170344-6cd5e49cb996?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80"
                      }
                  ],
                  "skus": {
                      "2580784": {
                          "quantity": 14,
                          "size": "7"
                      },
                      "2580785": {
                          "quantity": 25,
                          "size": "7.5"
                      },
                      "2580786": {
                          "quantity": 9,
                          "size": "8"
                      },
                      "2580787": {
                          "quantity": 2,
                          "size": "8.5"
                      },
                      "2580788": {
                          "quantity": 18,
                          "size": "9"
                      },
                      "2580789": {
                          "quantity": 12,
                          "size": "9.5"
                      },
                      "2580790": {
                          "quantity": 10,
                          "size": "10"
                      },
                      "2580791": {
                          "quantity": 18,
                          "size": "10.5"
                      },
                      "2580792": {
                          "quantity": 11,
                          "size": "11"
                      },
                      "2580793": {
                          "quantity": 35,
                          "size": "11.5"
                      },
                      "2580794": {
                          "quantity": 25,
                          "size": "12"
                      }
                  }
              },
              {
                  "style_id": 444256,
                  "name": "Red Supply",
                  "original_price": "450.00",
                  "sale_price": null,
                  "default?": false,
                  "photos": [
                      {
                          "thumbnail_url": "https://images.unsplash.com/photo-1473396413399-6717ef7c4093?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
                          "url": "https://images.unsplash.com/photo-1473396413399-6717ef7c4093?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80"
                      },
                      {
                          "thumbnail_url": "https://images.unsplash.com/photo-1558014356-f7c41bc744f7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
                          "url": "https://images.unsplash.com/photo-1558014356-f7c41bc744f7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80"
                      },
                      {
                          "thumbnail_url": "https://images.unsplash.com/photo-1507920676663-3b72429774ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
                          "url": "https://images.unsplash.com/photo-1507920676663-3b72429774ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=1567&q=80"
                      },
                      {
                          "thumbnail_url": "https://images.unsplash.com/photo-1544376664-80b17f09d399?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
                          "url": "https://images.unsplash.com/photo-1544376664-80b17f09d399?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1525&q=80"
                      },
                      {
                          "thumbnail_url": "https://images.unsplash.com/photo-1513531926349-466f15ec8cc7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
                          "url": "https://images.unsplash.com/photo-1513531926349-466f15ec8cc7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80"
                      },
                      {
                          "thumbnail_url": "https://images.unsplash.com/photo-1517278322228-3fe7a86cf6f0?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
                          "url": "https://images.unsplash.com/photo-1517278322228-3fe7a86cf6f0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1567&q=80"
                      },
                      {
                          "thumbnail_url": "https://images.unsplash.com/photo-1517720359744-6d12f8a09b10?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
                          "url": "https://images.unsplash.com/photo-1517720359744-6d12f8a09b10?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80"
                      },
                      {
                          "thumbnail_url": "https://images.unsplash.com/photo-1530821875964-91927b611bad?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
                          "url": "https://images.unsplash.com/photo-1530821875964-91927b611bad?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80"
                      },
                      {
                          "thumbnail_url": "https://images.unsplash.com/photo-1519862170344-6cd5e49cb996?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
                          "url": "https://images.unsplash.com/photo-1519862170344-6cd5e49cb996?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80"
                      }
                  ],
                  "skus": {
                      "2580795": {
                          "quantity": 14,
                          "size": "7"
                      },
                      "2580796": {
                          "quantity": 25,
                          "size": "7.5"
                      },
                      "2580797": {
                          "quantity": 9,
                          "size": "8"
                      },
                      "2580798": {
                          "quantity": 2,
                          "size": "8.5"
                      },
                      "2580799": {
                          "quantity": 18,
                          "size": "9"
                      },
                      "2580800": {
                          "quantity": 12,
                          "size": "9.5"
                      },
                      "2580801": {
                          "quantity": 10,
                          "size": "10"
                      },
                      "2580802": {
                          "quantity": 18,
                          "size": "10.5"
                      },
                      "2580803": {
                          "quantity": 11,
                          "size": "11"
                      },
                      "2580804": {
                          "quantity": 35,
                          "size": "11.5"
                      },
                      "2580805": {
                          "quantity": 25,
                          "size": "12"
                      }
                  }
              },
              {
                  "style_id": 444257,
                  "name": "White",
                  "original_price": "450.00",
                  "sale_price": null,
                  "default?": true,
                  "photos": [
                      {
                          "thumbnail_url": "https://images.unsplash.com/photo-1505248254168-1de4e1abfa78?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
                          "url": "https://images.unsplash.com/photo-1505248254168-1de4e1abfa78?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1649&q=80"
                      },
                      {
                          "thumbnail_url": "https://images.unsplash.com/photo-1507920676663-3b72429774ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
                          "url": "https://images.unsplash.com/photo-1507920676663-3b72429774ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=1567&q=80"
                      },
                      {
                          "thumbnail_url": "https://images.unsplash.com/photo-1544376664-80b17f09d399?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
                          "url": "https://images.unsplash.com/photo-1544376664-80b17f09d399?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1525&q=80"
                      },
                      {
                          "thumbnail_url": "https://images.unsplash.com/photo-1513531926349-466f15ec8cc7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
                          "url": "https://images.unsplash.com/photo-1513531926349-466f15ec8cc7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80"
                      },
                      {
                          "thumbnail_url": "https://images.unsplash.com/photo-1517278322228-3fe7a86cf6f0?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
                          "url": "https://images.unsplash.com/photo-1517278322228-3fe7a86cf6f0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1567&q=80"
                      },
                      {
                          "thumbnail_url": "https://images.unsplash.com/photo-1517720359744-6d12f8a09b10?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
                          "url": "https://images.unsplash.com/photo-1517720359744-6d12f8a09b10?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80"
                      },
                      {
                          "thumbnail_url": "https://images.unsplash.com/photo-1530821875964-91927b611bad?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
                          "url": "https://images.unsplash.com/photo-1530821875964-91927b611bad?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80"
                      },
                      {
                          "thumbnail_url": "https://images.unsplash.com/photo-1519862170344-6cd5e49cb996?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
                          "url": "https://images.unsplash.com/photo-1519862170344-6cd5e49cb996?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80"
                      }
                  ],
                  "skus": {
                      "2580806": {
                          "quantity": 14,
                          "size": "7"
                      },
                      "2580807": {
                          "quantity": 25,
                          "size": "7.5"
                      },
                      "2580808": {
                          "quantity": 9,
                          "size": "8"
                      },
                      "2580809": {
                          "quantity": 2,
                          "size": "8.5"
                      },
                      "2580810": {
                          "quantity": 18,
                          "size": "9"
                      },
                      "2580811": {
                          "quantity": 12,
                          "size": "9.5"
                      },
                      "2580812": {
                          "quantity": 10,
                          "size": "10"
                      },
                      "2580813": {
                          "quantity": 18,
                          "size": "10.5"
                      },
                      "2580814": {
                          "quantity": 11,
                          "size": "11"
                      },
                      "2580815": {
                          "quantity": 35,
                          "size": "11.5"
                      },
                      "2580816": {
                          "quantity": 25,
                          "size": "12"
                      }
                  }
              },
              {
                  "style_id": 444258,
                  "name": "Black",
                  "original_price": "950.00",
                  "sale_price": null,
                  "default?": false,
                  "photos": [
                      {
                          "thumbnail_url": "https://images.unsplash.com/photo-1519482816300-1490fdf2c2bd?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
                          "url": "https://images.unsplash.com/photo-1519482816300-1490fdf2c2bd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80"
                      },
                      {
                          "thumbnail_url": "https://images.unsplash.com/photo-1542818212-9899bafcb9db?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
                          "url": "https://images.unsplash.com/photo-1542818212-9899bafcb9db?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1526&q=80"
                      },
                      {
                          "thumbnail_url": "https://images.unsplash.com/photo-1515110371136-7e393289662c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
                          "url": "https://images.unsplash.com/photo-1515110371136-7e393289662c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1656&q=80"
                      },
                      {
                          "thumbnail_url": "https://images.unsplash.com/photo-1512521952190-7e1a47820ff4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
                          "url": "https://images.unsplash.com/photo-1512521952190-7e1a47820ff4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=978&q=80"
                      },
                      {
                          "thumbnail_url": "https://images.unsplash.com/photo-1470434767159-ac7bf1b43351?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
                          "url": "https://images.unsplash.com/photo-1470434767159-ac7bf1b43351?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80"
                      },
                      {
                          "thumbnail_url": "https://images.unsplash.com/photo-1547597456-4c18a06d9073?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
                          "url": "https://images.unsplash.com/photo-1547597456-4c18a06d9073?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80"
                      },
                      {
                          "thumbnail_url": "https://images.unsplash.com/photo-1507920676663-3b72429774ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
                          "url": "https://images.unsplash.com/photo-1507920676663-3b72429774ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=1567&q=80"
                      },
                      {
                          "thumbnail_url": "https://images.unsplash.com/photo-1544376664-80b17f09d399?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
                          "url": "https://images.unsplash.com/photo-1544376664-80b17f09d399?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1525&q=80"
                      },
                      {
                          "thumbnail_url": "https://images.unsplash.com/photo-1513531926349-466f15ec8cc7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
                          "url": "https://images.unsplash.com/photo-1513531926349-466f15ec8cc7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80"
                      },
                      {
                          "thumbnail_url": "https://images.unsplash.com/photo-1517278322228-3fe7a86cf6f0?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
                          "url": "https://images.unsplash.com/photo-1517278322228-3fe7a86cf6f0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1567&q=80"
                      },
                      {
                          "thumbnail_url": "https://images.unsplash.com/photo-1517720359744-6d12f8a09b10?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
                          "url": "https://images.unsplash.com/photo-1517720359744-6d12f8a09b10?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80"
                      }
                  ],
                  "skus": {
                      "2580817": {
                          "quantity": 14,
                          "size": "7"
                      },
                      "2580818": {
                          "quantity": 25,
                          "size": "7.5"
                      },
                      "2580819": {
                          "quantity": 9,
                          "size": "8"
                      },
                      "2580820": {
                          "quantity": 2,
                          "size": "8.5"
                      },
                      "2580821": {
                          "quantity": 18,
                          "size": "9"
                      },
                      "2580822": {
                          "quantity": 12,
                          "size": "9.5"
                      },
                      "2580823": {
                          "quantity": 10,
                          "size": "10"
                      },
                      "2580824": {
                          "quantity": 18,
                          "size": "10.5"
                      },
                      "2580825": {
                          "quantity": 11,
                          "size": "11"
                      },
                      "2580826": {
                          "quantity": 35,
                          "size": "11.5"
                      },
                      "2580827": {
                          "quantity": 25,
                          "size": "12"
                      }
                  }
              },
              {
                  "style_id": 444259,
                  "name": "Pink",
                  "original_price": "450.00",
                  "sale_price": null,
                  "default?": false,
                  "photos": [
                      {
                          "thumbnail_url": "https://images.unsplash.com/photo-1554735490-80893c93b06f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
                          "url": "https://images.unsplash.com/photo-1554735490-80893c93b06f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80"
                      },
                      {
                          "thumbnail_url": "https://images.unsplash.com/photo-1507920676663-3b72429774ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
                          "url": "https://images.unsplash.com/photo-1507920676663-3b72429774ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=1567&q=80"
                      },
                      {
                          "thumbnail_url": "https://images.unsplash.com/photo-1544376664-80b17f09d399?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
                          "url": "https://images.unsplash.com/photo-1544376664-80b17f09d399?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1525&q=80"
                      },
                      {
                          "thumbnail_url": "https://images.unsplash.com/photo-1513531926349-466f15ec8cc7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
                          "url": "https://images.unsplash.com/photo-1513531926349-466f15ec8cc7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80"
                      },
                      {
                          "thumbnail_url": "https://images.unsplash.com/photo-1517278322228-3fe7a86cf6f0?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
                          "url": "https://images.unsplash.com/photo-1517278322228-3fe7a86cf6f0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1567&q=80"
                      },
                      {
                          "thumbnail_url": "https://images.unsplash.com/photo-1517720359744-6d12f8a09b10?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
                          "url": "https://images.unsplash.com/photo-1517720359744-6d12f8a09b10?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80"
                      },
                      {
                          "thumbnail_url": "https://images.unsplash.com/photo-1530821875964-91927b611bad?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
                          "url": "https://images.unsplash.com/photo-1530821875964-91927b611bad?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80"
                      },
                      {
                          "thumbnail_url": "https://images.unsplash.com/photo-1519862170344-6cd5e49cb996?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
                          "url": "https://images.unsplash.com/photo-1519862170344-6cd5e49cb996?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80"
                      }
                  ],
                  "skus": {
                      "2580828": {
                          "quantity": 14,
                          "size": "7"
                      },
                      "2580829": {
                          "quantity": 25,
                          "size": "7.5"
                      },
                      "2580830": {
                          "quantity": 9,
                          "size": "8"
                      },
                      "2580831": {
                          "quantity": 2,
                          "size": "8.5"
                      },
                      "2580832": {
                          "quantity": 18,
                          "size": "9"
                      },
                      "2580833": {
                          "quantity": 12,
                          "size": "9.5"
                      },
                      "2580834": {
                          "quantity": 10,
                          "size": "10"
                      },
                      "2580835": {
                          "quantity": 18,
                          "size": "10.5"
                      },
                      "2580836": {
                          "quantity": 11,
                          "size": "11"
                      },
                      "2580837": {
                          "quantity": 35,
                          "size": "11.5"
                      },
                      "2580838": {
                          "quantity": 25,
                          "size": "12"
                      }
                  }
              },
              {
                  "style_id": 444260,
                  "name": "Green",
                  "original_price": "450.00",
                  "sale_price": null,
                  "default?": false,
                  "photos": [
                      {
                          "thumbnail_url": "https://images.unsplash.com/photo-1550188053-b4e1e8e4f94f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
                          "url": "https://images.unsplash.com/photo-1550188053-b4e1e8e4f94f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2775&q=80"
                      },
                      {
                          "thumbnail_url": "https://images.unsplash.com/photo-1507920676663-3b72429774ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
                          "url": "https://images.unsplash.com/photo-1507920676663-3b72429774ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=1567&q=80"
                      },
                      {
                          "thumbnail_url": "https://images.unsplash.com/photo-1544376664-80b17f09d399?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
                          "url": "https://images.unsplash.com/photo-1544376664-80b17f09d399?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1525&q=80"
                      },
                      {
                          "thumbnail_url": "https://images.unsplash.com/photo-1513531926349-466f15ec8cc7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
                          "url": "https://images.unsplash.com/photo-1513531926349-466f15ec8cc7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80"
                      },
                      {
                          "thumbnail_url": "https://images.unsplash.com/photo-1517278322228-3fe7a86cf6f0?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
                          "url": "https://images.unsplash.com/photo-1517278322228-3fe7a86cf6f0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1567&q=80"
                      },
                      {
                          "thumbnail_url": "https://images.unsplash.com/photo-1517720359744-6d12f8a09b10?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
                          "url": "https://images.unsplash.com/photo-1517720359744-6d12f8a09b10?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80"
                      },
                      {
                          "thumbnail_url": "https://images.unsplash.com/photo-1530821875964-91927b611bad?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
                          "url": "https://images.unsplash.com/photo-1530821875964-91927b611bad?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80"
                      },
                      {
                          "thumbnail_url": "https://images.unsplash.com/photo-1519862170344-6cd5e49cb996?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
                          "url": "https://images.unsplash.com/photo-1519862170344-6cd5e49cb996?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80"
                      }
                  ],
                  "skus": {
                      "2580839": {
                          "quantity": 14,
                          "size": "7"
                      },
                      "2580840": {
                          "quantity": 25,
                          "size": "7.5"
                      },
                      "2580841": {
                          "quantity": 9,
                          "size": "8"
                      },
                      "2580842": {
                          "quantity": 2,
                          "size": "8.5"
                      },
                      "2580843": {
                          "quantity": 18,
                          "size": "9"
                      },
                      "2580844": {
                          "quantity": 12,
                          "size": "9.5"
                      },
                      "2580845": {
                          "quantity": 10,
                          "size": "10"
                      },
                      "2580846": {
                          "quantity": 18,
                          "size": "10.5"
                      },
                      "2580847": {
                          "quantity": 11,
                          "size": "11"
                      },
                      "2580848": {
                          "quantity": 35,
                          "size": "11.5"
                      },
                      "2580849": {
                          "quantity": 25,
                          "size": "12"
                      }
                  }
              },
              {
                  "style_id": 444261,
                  "name": "Butter",
                  "original_price": "450.00",
                  "sale_price": "400.00",
                  "default?": false,
                  "photos": [
                      {
                          "thumbnail_url": "https://images.unsplash.com/photo-1548369735-f548cbe6a294?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
                          "url": "https://images.unsplash.com/photo-1548369735-f548cbe6a294?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=977&q=80"
                      },
                      {
                          "thumbnail_url": "https://images.unsplash.com/photo-1507920676663-3b72429774ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
                          "url": "https://images.unsplash.com/photo-1507920676663-3b72429774ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=1567&q=80"
                      },
                      {
                          "thumbnail_url": "https://images.unsplash.com/photo-1544376664-80b17f09d399?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
                          "url": "https://images.unsplash.com/photo-1544376664-80b17f09d399?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1525&q=80"
                      },
                      {
                          "thumbnail_url": "https://images.unsplash.com/photo-1513531926349-466f15ec8cc7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
                          "url": "https://images.unsplash.com/photo-1513531926349-466f15ec8cc7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80"
                      },
                      {
                          "thumbnail_url": "https://images.unsplash.com/photo-1517278322228-3fe7a86cf6f0?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
                          "url": "https://images.unsplash.com/photo-1517278322228-3fe7a86cf6f0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1567&q=80"
                      },
                      {
                          "thumbnail_url": "https://images.unsplash.com/photo-1517720359744-6d12f8a09b10?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
                          "url": "https://images.unsplash.com/photo-1517720359744-6d12f8a09b10?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80"
                      },
                      {
                          "thumbnail_url": "https://images.unsplash.com/photo-1530821875964-91927b611bad?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
                          "url": "https://images.unsplash.com/photo-1530821875964-91927b611bad?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80"
                      },
                      {
                          "thumbnail_url": "https://images.unsplash.com/photo-1519862170344-6cd5e49cb996?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
                          "url": "https://images.unsplash.com/photo-1519862170344-6cd5e49cb996?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80"
                      }
                  ],
                  "skus": {
                      "2580850": {
                          "quantity": 14,
                          "size": "7"
                      },
                      "2580851": {
                          "quantity": 25,
                          "size": "7.5"
                      },
                      "2580852": {
                          "quantity": 9,
                          "size": "8"
                      },
                      "2580853": {
                          "quantity": 2,
                          "size": "8.5"
                      },
                      "2580854": {
                          "quantity": 18,
                          "size": "9"
                      },
                      "2580855": {
                          "quantity": 12,
                          "size": "9.5"
                      },
                      "2580856": {
                          "quantity": 10,
                          "size": "10"
                      },
                      "2580857": {
                          "quantity": 18,
                          "size": "10.5"
                      },
                      "2580858": {
                          "quantity": 11,
                          "size": "11"
                      },
                      "2580859": {
                          "quantity": 35,
                          "size": "11.5"
                      },
                      "2580860": {
                          "quantity": 25,
                          "size": "12"
                      }
                  }
              },
              {
                  "style_id": 444262,
                  "name": "Grey",
                  "original_price": "450.00",
                  "sale_price": null,
                  "default?": false,
                  "photos": [
                      {
                          "thumbnail_url": "https://images.unsplash.com/photo-1536181211993-cf4b2c100475?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
                          "url": "https://images.unsplash.com/photo-1536181211993-cf4b2c100475?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80"
                      },
                      {
                          "thumbnail_url": "https://images.unsplash.com/photo-1507920676663-3b72429774ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
                          "url": "https://images.unsplash.com/photo-1507920676663-3b72429774ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=1567&q=80"
                      },
                      {
                          "thumbnail_url": "https://images.unsplash.com/photo-1544376664-80b17f09d399?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
                          "url": "https://images.unsplash.com/photo-1544376664-80b17f09d399?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1525&q=80"
                      },
                      {
                          "thumbnail_url": "https://images.unsplash.com/photo-1513531926349-466f15ec8cc7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
                          "url": "https://images.unsplash.com/photo-1513531926349-466f15ec8cc7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80"
                      },
                      {
                          "thumbnail_url": "https://images.unsplash.com/photo-1517278322228-3fe7a86cf6f0?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
                          "url": "https://images.unsplash.com/photo-1517278322228-3fe7a86cf6f0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1567&q=80"
                      },
                      {
                          "thumbnail_url": "https://images.unsplash.com/photo-1517720359744-6d12f8a09b10?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
                          "url": "https://images.unsplash.com/photo-1517720359744-6d12f8a09b10?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80"
                      },
                      {
                          "thumbnail_url": "https://images.unsplash.com/photo-1530821875964-91927b611bad?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
                          "url": "https://images.unsplash.com/photo-1530821875964-91927b611bad?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80"
                      },
                      {
                          "thumbnail_url": "https://images.unsplash.com/photo-1519862170344-6cd5e49cb996?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
                          "url": "https://images.unsplash.com/photo-1519862170344-6cd5e49cb996?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80"
                      }
                  ],
                  "skus": {
                      "2580861": {
                          "quantity": 14,
                          "size": "7"
                      },
                      "2580862": {
                          "quantity": 25,
                          "size": "7.5"
                      },
                      "2580863": {
                          "quantity": 9,
                          "size": "8"
                      },
                      "2580864": {
                          "quantity": 2,
                          "size": "8.5"
                      },
                      "2580865": {
                          "quantity": 18,
                          "size": "9"
                      },
                      "2580866": {
                          "quantity": 12,
                          "size": "9.5"
                      },
                      "2580867": {
                          "quantity": 10,
                          "size": "10"
                      },
                      "2580868": {
                          "quantity": 18,
                          "size": "10.5"
                      },
                      "2580869": {
                          "quantity": 11,
                          "size": "11"
                      },
                      "2580870": {
                          "quantity": 35,
                          "size": "11.5"
                      },
                      "2580871": {
                          "quantity": 25,
                          "size": "12"
                      }
                  }
              }
          ]
      }
  },
  {
      "id": 71703,
      "campus": "hr-rpp",
      "name": "Blues Suede Shoes",
      "slogan": "2019 Stanley Cup Limited Edition",
      "description": "Touch down in the land of the Delta Blues in the middle of the pouring rain",
      "category": "Dress Shoes",
      "default_price": "120.00",
      "created_at": "2022-05-11T19:38:15.373Z",
      "updated_at": "2022-05-11T19:38:15.373Z",
      "features": [
          {
              "feature": "Sole",
              "value": "Rubber"
          },
          {
              "feature": "Material",
              "value": "FullControlSkin"
          },
          {
              "feature": "Stitching",
              "value": "Double Stitch"
          }
      ],
      "styles": {
          "product_id": "71703",
          "results": [
              {
                  "style_id": 444249,
                  "name": "White Sole",
                  "original_price": "120.00",
                  "sale_price": null,
                  "default?": false,
                  "photos": [
                      {
                          "thumbnail_url": "https://images.unsplash.com/photo-1561861422-a549073e547a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
                          "url": "https://images.unsplash.com/photo-1561861422-a549073e547a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80"
                      },
                      {
                          "thumbnail_url": "https://images.unsplash.com/photo-1560072810-1cffb09faf0f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
                          "url": "https://images.unsplash.com/photo-1560072810-1cffb09faf0f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80"
                      }
                  ],
                  "skus": {
                      "2580718": {
                          "quantity": 14,
                          "size": "7"
                      },
                      "2580719": {
                          "quantity": 25,
                          "size": "7.5"
                      },
                      "2580720": {
                          "quantity": 9,
                          "size": "8"
                      },
                      "2580721": {
                          "quantity": 2,
                          "size": "8.5"
                      },
                      "2580722": {
                          "quantity": 18,
                          "size": "9"
                      },
                      "2580723": {
                          "quantity": 12,
                          "size": "9.5"
                      },
                      "2580724": {
                          "quantity": 10,
                          "size": "10"
                      },
                      "2580725": {
                          "quantity": 18,
                          "size": "10.5"
                      },
                      "2580726": {
                          "quantity": 11,
                          "size": "11"
                      },
                      "2580727": {
                          "quantity": 35,
                          "size": "11.5"
                      },
                      "2580728": {
                          "quantity": 25,
                          "size": "12"
                      }
                  }
              },
              {
                  "style_id": 444250,
                  "name": "Black Sole",
                  "original_price": "120.00",
                  "sale_price": null,
                  "default?": false,
                  "photos": [
                      {
                          "thumbnail_url": "https://images.unsplash.com/uploads/1412198532414025532c0/6a31309c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
                          "url": "https://images.unsplash.com/uploads/1412198532414025532c0/6a31309c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1600&q=80"
                      },
                      {
                          "thumbnail_url": "https://images.unsplash.com/photo-1454024183771-42d54053cd75?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
                          "url": "https://images.unsplash.com/photo-1454024183771-42d54053cd75?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80"
                      }
                  ],
                  "skus": {
                      "2580729": {
                          "quantity": 14,
                          "size": "7"
                      },
                      "2580730": {
                          "quantity": 25,
                          "size": "7.5"
                      },
                      "2580731": {
                          "quantity": 9,
                          "size": "8"
                      },
                      "2580732": {
                          "quantity": 2,
                          "size": "8.5"
                      },
                      "2580733": {
                          "quantity": 18,
                          "size": "9"
                      },
                      "2580734": {
                          "quantity": 12,
                          "size": "9.5"
                      },
                      "2580735": {
                          "quantity": 10,
                          "size": "10"
                      },
                      "2580736": {
                          "quantity": 18,
                          "size": "10.5"
                      },
                      "2580737": {
                          "quantity": 11,
                          "size": "11"
                      },
                      "2580738": {
                          "quantity": 35,
                          "size": "11.5"
                      },
                      "2580739": {
                          "quantity": 25,
                          "size": "12"
                      }
                  }
              },
              {
                  "style_id": 444251,
                  "name": "Tan Sole",
                  "original_price": "120.00",
                  "sale_price": null,
                  "default?": false,
                  "photos": [
                      {
                          "thumbnail_url": "https://images.unsplash.com/photo-1465124982537-9f918f1e1aaf?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
                          "url": "https://images.unsplash.com/photo-1465124982537-9f918f1e1aaf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80"
                      },
                      {
                          "thumbnail_url": "https://images.unsplash.com/photo-1449505278894-297fdb3edbc1?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
                          "url": "https://images.unsplash.com/photo-1449505278894-297fdb3edbc1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80"
                      }
                  ],
                  "skus": {
                      "2580740": {
                          "quantity": 14,
                          "size": "7"
                      },
                      "2580741": {
                          "quantity": 25,
                          "size": "7.5"
                      },
                      "2580742": {
                          "quantity": 9,
                          "size": "8"
                      },
                      "2580743": {
                          "quantity": 2,
                          "size": "8.5"
                      },
                      "2580744": {
                          "quantity": 18,
                          "size": "9"
                      },
                      "2580745": {
                          "quantity": 12,
                          "size": "9.5"
                      },
                      "2580746": {
                          "quantity": 10,
                          "size": "10"
                      },
                      "2580747": {
                          "quantity": 18,
                          "size": "10.5"
                      },
                      "2580748": {
                          "quantity": 11,
                          "size": "11"
                      },
                      "2580749": {
                          "quantity": 35,
                          "size": "11.5"
                      },
                      "2580750": {
                          "quantity": 25,
                          "size": "12"
                      }
                  }
              },
              {
                  "style_id": 444252,
                  "name": "Red Sole",
                  "original_price": "120.00",
                  "sale_price": null,
                  "default?": false,
                  "photos": [
                      {
                          "thumbnail_url": "https://images.unsplash.com/photo-1454177643390-7f100d1bbeec?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
                          "url": "https://images.unsplash.com/photo-1454177643390-7f100d1bbeec?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80"
                      }
                  ],
                  "skus": {
                      "2580751": {
                          "quantity": 14,
                          "size": "7"
                      },
                      "2580752": {
                          "quantity": 25,
                          "size": "7.5"
                      },
                      "2580753": {
                          "quantity": 9,
                          "size": "8"
                      },
                      "2580754": {
                          "quantity": 2,
                          "size": "8.5"
                      },
                      "2580755": {
                          "quantity": 18,
                          "size": "9"
                      },
                      "2580756": {
                          "quantity": 12,
                          "size": "9.5"
                      },
                      "2580757": {
                          "quantity": 10,
                          "size": "10"
                      },
                      "2580758": {
                          "quantity": 18,
                          "size": "10.5"
                      },
                      "2580759": {
                          "quantity": 11,
                          "size": "11"
                      },
                      "2580760": {
                          "quantity": 35,
                          "size": "11.5"
                      },
                      "2580761": {
                          "quantity": 25,
                          "size": "12"
                      }
                  }
              },
              {
                  "style_id": 444253,
                  "name": "Yellow Sole",
                  "original_price": "120.00",
                  "sale_price": null,
                  "default?": false,
                  "photos": [
                      {
                          "thumbnail_url": "https://images.unsplash.com/photo-1499013819532-e4ff41b00669?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
                          "url": "https://images.unsplash.com/photo-1499013819532-e4ff41b00669?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1100&q=80"
                      },
                      {
                          "thumbnail_url": "https://images.unsplash.com/photo-1459631836437-1c2824882e3f?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
                          "url": "https://images.unsplash.com/photo-1459631836437-1c2824882e3f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80"
                      }
                  ],
                  "skus": {
                      "2580762": {
                          "quantity": 14,
                          "size": "7"
                      },
                      "2580763": {
                          "quantity": 25,
                          "size": "7.5"
                      },
                      "2580764": {
                          "quantity": 9,
                          "size": "8"
                      },
                      "2580765": {
                          "quantity": 2,
                          "size": "8.5"
                      },
                      "2580766": {
                          "quantity": 18,
                          "size": "9"
                      },
                      "2580767": {
                          "quantity": 12,
                          "size": "9.5"
                      },
                      "2580768": {
                          "quantity": 10,
                          "size": "10"
                      },
                      "2580769": {
                          "quantity": 18,
                          "size": "10.5"
                      },
                      "2580770": {
                          "quantity": 11,
                          "size": "11"
                      },
                      "2580771": {
                          "quantity": 35,
                          "size": "11.5"
                      },
                      "2580772": {
                          "quantity": 25,
                          "size": "12"
                      }
                  }
              }
          ]
      }
  }
];


const request = (endpoint, params = {}, method = 'get') => axios({
    method,
    url: endpoint,
    params,
  });

const emptyMockData = [];

describe('Products carousel', () => {

    test('related products component render', () => {
    render(<RelatedList />);
    const productsTitle = screen.getByText('Related Products');
    expect(productsTitle).toBeInTheDocument();
    });

    test('outfits component render', () => {
        render(<OutfitList currentProduct={emptyMockData}/>);
        const outfitsTitle = screen.getByText('Your Outfit');
        expect(outfitsTitle).toBeInTheDocument();
    });

    test('modal component render', () => {
        render(<Modal showModal={true} currentProduct={mockData[0]} comparedProduct={mockData[1]}/>);
        const modalTitle = screen.getByText('Compare Products');
        expect(modalTitle).toBeInTheDocument();
    });

});

describe('Products carousel', () => {

  test('Related product should render in carousel', () => {
    const listType = {type: 'related'};
    render(<Carousel products={mockData} listType={listType}/>);
    screen.getByText(/bright/i);
  });

  test('Your outfit carousel should include add button', () => {
    const listType = {type: 'outfit'};
    render(<Carousel products={emptyMockData} listType={listType}/>);
    screen.getByRole('add-outfit');
  });
});


// Basic Test
/*
describe('Random test examples', () => {

  test('adds 1 + 2 to equal 3', () => {
    expect(1 + 2).toBe(3);
  });

  it('Should fail test', () => {
    var array = [1,2,3,4];
    expect(array.pop()).toEqual(3)
  })

  //test and it works interchangeably
})
*/