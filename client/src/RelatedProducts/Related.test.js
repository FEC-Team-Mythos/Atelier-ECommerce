
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import RelatedProducts from './RelatedProducts.jsx';

test('child components render', () => {
  render(<RelatedProducts />);
  const productsTitle = screen.getByText('Related Products');
  const outfitsTitle = screen.getByText('Your Outfit');
  expect(productsTitle).toBeInTheDocument();
  expect(outfitsTitle).toBeInTheDocument();
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