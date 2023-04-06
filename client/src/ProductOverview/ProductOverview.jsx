/* eslint-disable no-console */
/* eslint-disable react/prop-types */
/* eslint-disable import/extensions */

import React, { useState, useEffect } from 'react';
import MainImageScreen from './components/MainImageScreen.jsx';
import ProductInformation from './components/ProductInformation.jsx';
import ProductDescription from './components/ProductDescription.jsx';
import PurchaseOptions from './components/PurchaseOptions.jsx';
import ShoppingCart from './components/ShoppingCart.jsx';
import { FiSearch } from "react-icons/fi";
import { AiOutlineShoppingCart } from "react-icons/ai";

function ProductOverview({ request, outfits, setOutfits, starArr, totalReviewsPerProduct, cartItems, setCartItems,
  productId, product, setProduct, productInformation, setProductInformation }) {
  const [productStyles, setProductStyles] = useState([]);
  const [mainImage, setMainImage] = useState({});
  const [expand, setExpand] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  console.log('overview prod id', productId)

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
      <div className="overview-navBar">
        <img src="https://socialimpact.com/wp-content/uploads/2021/03/logo-placeholder.jpg" id="overview-logo" alt="Logo Placeholder" data-testid="logo" />
        <div className="overview-searchBar">
          <input type="text" aria-label="Search form" id="overview-searchForm" />
          <button type="submit" aria-label="Search" id="overview-searchButton"><FiSearch id="overview-searchIcon" /></button>
          <button type="submit" aria-label="Open Cart" id="overview-cartButton" onClick={() => { setCartOpen(!cartOpen); }}>
            <AiOutlineShoppingCart id="overview-cartIcon" />
            {cartItems.length > 0 ? <div id="overview-cartQuantity">{cartItems.length}</div> : null}
          </button>
        </div>
      </div>
      <ShoppingCart
        cartItems={cartItems}
        setCartItems={setCartItems}
        cartOpen={cartOpen}
        setCartOpen={setCartOpen}
      />
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
