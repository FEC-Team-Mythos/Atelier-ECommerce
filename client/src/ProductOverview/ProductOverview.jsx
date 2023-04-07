/* eslint-disable no-console */
/* eslint-disable react/prop-types */
/* eslint-disable import/extensions */

import React, { useState, useEffect } from 'react';
import MainImageScreen from './components/MainImageScreen.jsx';
import ProductInformation from './components/ProductInformation.jsx';
import ProductDescription from './components/ProductDescription.jsx';
import PurchaseOptions from './components/PurchaseOptions.jsx';

function ProductOverview({ request, outfits, setOutfits, starArr, totalReviewsPerProduct, cartItems, setCartItems,
  productId, product, setProduct, productInformation, setProductInformation }) {
  const [productStyles, setProductStyles] = useState([]);
  const [mainImage, setMainImage] = useState({});
  const [expand, setExpand] = useState(false);

  useEffect(() => {
    request(`/products/${productId}`, { product_id: productId }, 'get')
      .then((data) => {
        setProduct(data.data);
      })
      .then(() => (
        request(`/products/${productId}/styles`, { product_id: productId }, 'get')
      ))
      .then((data) => {
        setProductInformation(data.data.results[0]);
        setProductStyles(data.data.results);
        setMainImage({ url: data.data.results[0].photos[0].url, index: 0 });
        if (localStorage.getItem('cart')) {
          const cart = JSON.parse(localStorage.getItem('cart'));
          setCartItems(cart);
        }
      })
      .catch((err) => {
        console.log('Could not get: ', err);
      });
  }, [productId]);

  return (
    <div>
      {(Object.keys(product).length && Object.keys(productInformation).length)
        ? (
          <div className="overview-overviewContainer">
            <div className="overview-parentContainer">
              <MainImageScreen
                productInformation={productInformation}
                mainImage={mainImage}
                setMainImage={setMainImage}
                expand={expand}
                setExpand={setExpand}
              />
              {!expand
                ? (
                  <div className="overview-infoContainer">
                    <ProductInformation
                      productInformation={productInformation}
                      product={product}
                      starArr={starArr}
                      totalReviewsPerProduct={totalReviewsPerProduct}
                    />
                    <PurchaseOptions
                      product={product}
                      productInformation={productInformation}
                      setProductInformation={setProductInformation}
                      productStyles={productStyles}
                      setMainImage={setMainImage}
                      cartItems={cartItems}
                      setCartItems={setCartItems}
                      setOutfits={setOutfits}
                      outfits={outfits}
                    />
                  </div>
                )
                : null}
              <ProductDescription product={product} />
            </div>
          </div>
        )
        : null}
    </div>
  );
}
export default ProductOverview;
