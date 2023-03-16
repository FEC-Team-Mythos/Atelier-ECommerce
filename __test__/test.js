import {render, screen, fireEvent} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import ProductOverview from '../client/src/ProductOverview/ProductOverview';
import ProductDescription from '../client/src/ProductOverview/components/ProductDescription';
import MainImageScreen from '../client/src/ProductOverview/components/MainImageScreen';
import axios from 'axios';

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

let mockMainImage = mockProductInformationData.photos[0].url;

/* ____________ UNIT TESTS ____________ */

describe('Unit Tests', () => {

  it('Product Overview Component Renders on Screen', () => {
    render(<ProductOverview request={request} />);
    const logoPlaceholder = screen.getByText('Logo');
    expect(logoPlaceholder).toBeInTheDocument();
  });

  it('Renders product information pulled from API/Server', async () => {
    render(<ProductDescription product={mockProductData}/>);
    const descriptionText = screen.getByText(/The So Fatigue/i);
    expect(descriptionText).toBeInTheDocument();
  });
})

/* ____________ INTEGRATION TESTS ____________ */

describe('Integration Tests', () => {

  it('Call state change function in parent component when image is clicked', async () => {
    const mockSetMainImage = jest.fn();
    await render(<MainImageScreen productInformation = {mockProductInformationData} mainImage = {mockMainImage} setMainImage = {mockSetMainImage} />);
    const imageSidebar = screen.getByTestId('image-0');
    fireEvent.click(imageSidebar);
    expect(mockSetMainImage).toHaveBeenCalled();
  });

})

/* ____________ END TO END TESTS ____________ */


