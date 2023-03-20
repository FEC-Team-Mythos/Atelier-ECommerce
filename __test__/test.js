import {render, screen, fireEvent} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import axios from 'axios';
import ProductOverview from '../client/src/ProductOverview/ProductOverview';
import ProductDescription from '../client/src/ProductOverview/components/ProductDescription';
import MainImageScreen from '../client/src/ProductOverview/components/MainImageScreen';
import ProductInformation from '../client/src/ProductOverview/components/ProductInformation';
import PurchaseOptions from '../client/src/ProductOverview/components/PurchaseOptions';
import ShoppingCart from '../client/src/ProductOverview/components/ShoppingCart';

const request = async (endpoint, params={}, method='get') => {
  return axios({
    method: method,
    url: endpoint,
    params: params
  })
}

const mockProductData =
  {
    "id": 71697,
    "name": "Camo Onesie",
    "slogan": "Blend in to your crowd",
    "description": "The So Fatigues will wake you up and fit you in. This high energy camo will have you blending in to even the wildest surroundings.",
    "category": "Jackets",
    "default_price": "140.00",
    "features": [
        {
            "feature": "Fabric",
            "value": "Canvas"
        },
        {
            "feature": "Buttons",
            "value": "Brass"
        }
    ]
  }

const mockProductInformationData = {
  "style_id": 444218,
  "name": "Forest Green & Black",
  "original_price": "140.00",
  "sale_price": null,
  "default?": true,
  "photos": [
      {
          "thumbnail_url": "https://images.unsplash.com/photo-1501088430049-71c79fa3283e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
          "url": "https://images.unsplash.com/photo-1501088430049-71c79fa3283e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80"
      },
      {
          "thumbnail_url": "https://images.unsplash.com/photo-1534011546717-407bced4d25c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
          "url": "https://images.unsplash.com/photo-1534011546717-407bced4d25c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2734&q=80"
      }
  ],
  "skus": {
      "2580526": {
          "quantity": 8,
          "size": "XS"
      },
      "2580527": {
          "quantity": 16,
          "size": "S"
      }
  }
}

const mockProductStyles =
  [
    {
        "style_id": 444218,
        "name": "Forest Green & Black",
        "original_price": "140.00",
        "sale_price": null,
        "default?": true,
        "photos": [
            {
                "thumbnail_url": "https://images.unsplash.com/photo-1501088430049-71c79fa3283e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
                "url": "https://images.unsplash.com/photo-1501088430049-71c79fa3283e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80"
            },
            {
                "thumbnail_url": "https://images.unsplash.com/photo-1534011546717-407bced4d25c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
                "url": "https://images.unsplash.com/photo-1534011546717-407bced4d25c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2734&q=80"
            },
            {
                "thumbnail_url": "https://images.unsplash.com/photo-1549831243-a69a0b3d39e0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
                "url": "https://images.unsplash.com/photo-1549831243-a69a0b3d39e0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2775&q=80"
            }
        ],
        "skus": {
            "2580526": {
                "quantity": 8,
                "size": "XS"
            },
            "2580527": {
                "quantity": 16,
                "size": "S"
            },
            "2580528": {
                "quantity": 17,
                "size": "M"
            }
        }
    },
    {
        "style_id": 444219,
        "name": "Desert Brown & Tan",
        "original_price": "140.00",
        "sale_price": null,
        "default?": false,
        "photos": [
            {
                "thumbnail_url": "https://images.unsplash.com/photo-1533779183510-8f55a55f15c1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
                "url": "https://images.unsplash.com/photo-1533779183510-8f55a55f15c1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80"
            },
            {
                "thumbnail_url": "https://images.unsplash.com/photo-1560567546-4c6dbc16877b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
                "url": "https://images.unsplash.com/photo-1560567546-4c6dbc16877b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80"
            },
            {
                "thumbnail_url": "https://images.unsplash.com/photo-1458253329476-1ebb8593a652?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
                "url": "https://images.unsplash.com/photo-1458253329476-1ebb8593a652?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80"
            }
        ],
        "skus": {
            "2580532": {
                "quantity": 8,
                "size": "XS"
            },
            "2580533": {
                "quantity": 16,
                "size": "S"
            },
            "2580534": {
                "quantity": 17,
                "size": "M"
            }
        }
    }
  ];

  const mockCartItems = [{
    productName: "Jean Jacket",
    productPhoto: "https://images.unsplash.com/photo-1533779183510-8f55a55f15c1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
    styleName: "Hip 80s",
    productCost: "About tree fiddy",
    size: "Big Foot",
    quantity: 9
  }];

let mockMainImage = mockProductInformationData.photos[0].url;

const [mockSetMainImage, mockSetProductInformation, mockSetCartItems, mockSetOutfits] = [jest.fn(), jest.fn(), jest.fn(), jest.fn()];

/* ____________ UNIT TESTS ____________ */

describe('Unit Tests', () => {

  it('Product Overview Component Renders on Screen', () => {
    render(<ProductOverview request={request} />);
    const logoPlaceholder = screen.getByText('Logo');
    expect(logoPlaceholder).toBeInTheDocument();
  });

  it('Renders product description pulled from API/Server', () => {
    render(<ProductDescription product={mockProductData}/>);
    const descriptionText = screen.getByText(/The So Fatigue/i);
    expect(descriptionText).toBeInTheDocument();
  });

  it('Renders product information pulled from API/Server', () => {
    render(<ProductInformation product={mockProductData} productInformation={mockProductInformationData}/>);
    const productCategory = mockProductData.category //Jackets
    const categoryText = screen.getByText(productCategory);
    expect(categoryText).toBeInTheDocument();
  });


  it('Properly renders all style images as options', async () => {
    render(<PurchaseOptions product={mockProductData} productInformation={mockProductInformationData} setProductInformation={mockSetProductInformation}
    productStyles={mockProductStyles} setMainImage={mockSetMainImage} cartItems={mockCartItems} setCartItems={mockSetCartItems} setOutfits={mockSetOutfits} outfits={[]}/>);
    const styleImages = await screen.findAllByRole('img');
    expect(styleImages.length).toBe(2);
  });

  it('Properly renders all style images as options', async () => {
    render(<ShoppingCart cartItems={mockCartItems} setCartItems={mockSetCartItems}/>);
    const itemName = screen.getByText(/Jean Jacket/i);
    expect(itemName).toBeInTheDocument();
  });

  it('Renders all of the images for a product and a main image', async () => {
    render(<MainImageScreen productInformation={mockProductInformationData} mainImage={mockMainImage} setMainImage={mockSetMainImage} />)
    const renderedImages = await screen.findAllByRole('img');
    expect(renderedImages.length).toBe(mockProductInformationData.photos.length + 1); // + 1 for the main image
  });


})



/* ____________ INTEGRATION TESTS ____________ */

describe('Integration Tests', () => {

  it('Call state change function in parent component when image is clicked', async () => {
    await render(<MainImageScreen productInformation = {mockProductInformationData} mainImage = {mockMainImage} setMainImage = {mockSetMainImage} />);
    const imageSidebar = screen.getByTestId('image-0');
    fireEvent.click(imageSidebar);
    expect(mockSetMainImage).toHaveBeenCalled();
  });

})

/* ____________ END TO END TESTS ____________ */


