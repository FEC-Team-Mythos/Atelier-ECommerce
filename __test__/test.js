import {render, screen, } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import ProductOverview from '../client/src/ProductOverview/ProductOverview'
import axios from 'axios';

const request = (endpoint, params={}, method='get') => {
  return axios({
    method: method,
    url: endpoint,
    params: params
  })
}

/* ____________ UNIT TESTS ____________ */

describe('Unit Tests', () => {

  it('checks the value of the Logo component', () => {
    render(<ProductOverview request={request} />);
    const logoPlaceholder = screen.getByText('Logo');
    expect(logoPlaceholder).toBeInTheDocument();
  })
})

/* ____________ INTEGRATION TESTS ____________ */




/* ____________ END TO END TESTS ____________ */


