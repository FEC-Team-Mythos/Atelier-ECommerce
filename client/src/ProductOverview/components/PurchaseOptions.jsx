/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-restricted-syntax */
/* eslint-disable react/prop-types */

import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-regular-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';

library.add(faStar);

function PurchaseOptions({
  product, productInformation, setProductInformation, productStyles, setMainImage,
  cartItems, setCartItems, setOutfits, outfits,
}) {
  const [selectedSize, setSelectedSize] = useState(0);
  const [selectedQuantity, setSelectedQuantity] = useState(0);
  const [selectedSku, setSelectedSku] = useState('');
  const [favorited, setFavorited] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('outfits')) {
      const outfitList = JSON.parse(localStorage.getItem('outfits'));
      for (const outfitItem of outfitList) {
        if (outfitItem.productName === product.name
        && outfitItem.styleName === productInformation.name) {
          setFavorited(true);
          return;
        }
      }
    }
    setFavorited(false);
  }, [outfits, productInformation]);

  const getSelectedSize = () => {
    const e = document.getElementById('overview_productSize');
    if (e.value) {
      setSelectedSize(productInformation.skus[e.value]);
      setSelectedSku(e.value);
    } else {
      setSelectedSize(0);
    }
  };

  const getSelectedQuantity = () => {
    const e = document.getElementById('overview_productQuantity');
    setSelectedQuantity(Number(e.value));
  };

  const addToCart = () => {
    let updatedCart = [];

    if (cartItems.length) {
      updatedCart = [...cartItems];
      for (const item of updatedCart) {
        if (item.sku_id === selectedSku && item.size === selectedSize.size) {
          item.quantity += selectedQuantity;
          break;
        }
      }
      // updatedCart.push({product_id: product.id, style_id: productInformation.style_id, sku_id:
      // selectedSku, size: selectedSize.size, quantity: selectedQuantity});
      updatedCart.push({
        productName: product.name,
        productPhoto: productInformation.photos[0].thumbnail_url,
        styleName: productInformation.name,
        productCost: (productInformation.sale_price || productInformation.original_price
                      || product.default_price),
        sku_id: selectedSku,
        size: selectedSize.size,
        quantity: selectedQuantity,
      });
    } else {
      // let item = [{product_id: product.id, style_id: productInformation.style_id,
      // sku_id: selectedSku, size: selectedSize.size, quantity: selectedQuantity}]
      updatedCart = [{
        productName: product.name,
        productPhoto: productInformation.photos[0].thumbnail_url,
        styleName: productInformation.name,
        productCost: (productInformation.sale_price || productInformation.original_price
                      || product.default_price),
        sku_id: selectedSku,
        size: selectedSize.size,
        quantity: selectedQuantity,
      }];
    }
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const outfitButtonHandler = () => {
    let updatedOutfits = [...outfits];

    if (favorited) {
      for (let i = 0; i < outfits.length; i += 1) {
        if (updatedOutfits[i].productName === product.name
          && updatedOutfits[i].styleName === productInformation.name) {
          updatedOutfits.splice(i, 1);
          break;
        }
      }
    } else if (updatedOutfits.length) {
      updatedOutfits.push({
        productName: product.name,
        productPhoto: productInformation.photos[0].thumbnail_url,
        styleName: productInformation.name,
        productCost: (productInformation.sale_price || productInformation.original_price
                      || product.default_price),
        productCategory: product.category,
      });
    } else {
      updatedOutfits = [{
        productName: product.name,
        productPhoto: productInformation.photos[0].thumbnail_url,
        styleName: productInformation.name,
        productCost: (productInformation.sale_price || productInformation.original_price
                      || product.default_price),
        productCategory: product.category,
      }];
    }
    if (!updatedOutfits.length) {
      localStorage.removeItem('outfits');
    } else {
      localStorage.setItem('outfits', JSON.stringify(updatedOutfits));
    }
    setOutfits(updatedOutfits);
  };

  const quantityWithData = () => (
    (Object.keys(selectedSize).length && selectedSize.quantity < 15)
      ? Array.from({ length: selectedSize.quantity }, (_, index) => index + 1).map((quantity) => (
        <option value={quantity} key={quantity}>{quantity}</option>
      ))
      : Array.from({ length: 15 }, (_, index) => index + 1).map((quantity) => (
        <option value={quantity} key={quantity}>{quantity}</option>
      ))
  );

  return (
    <div>
      <p id="overview-selectedStyle">
        <b>
          STYLE
          {' > '}
        </b>
        {productInformation.name}
      </p>
      <ul className="overview-productStyleContainer">
        {productStyles.map((style, index) => (
          <img
            src={style.photos[0].thumbnail_url}
            key={style.photos[0].thumbnail_url}
            alt={`Product Style - ${index}`}
            id="overview-productStyle"
            onClick={() => {
              if (productInformation !== style) {
                setProductInformation(style);
                setMainImage({ url: style.photos[0].url, index: 0 });
                setSelectedSize(0);
              }
            }}
          />
        ))}
      </ul>
      <div className="overview-purchaseSelections">
        <select id="overview_productSize" onChange={getSelectedSize}>
          <option value="0">SELECT SIZE</option>
          {Object.keys(productInformation.skus).map((style) => (
            <option key={style} value={style}>{productInformation.skus[style].size}</option>
          ))}
        </select>
        {selectedSize
          ? (
            <select id="overview_productQuantity" onChange={getSelectedQuantity}>
              {quantityWithData()}
            </select>
          )
          : (
            <select id="overview_productQuantity" onChange={getSelectedQuantity}>
              <option value="0">SELECT QUANTITY</option>
            </select>
          )}
      </div>
      <div className="overview-purchaseButtons">
        <button type="submit" onClick={addToCart} id="overview-addToBag" data-testId="addToBag">ADD TO BAG &nbsp;&nbsp;&nbsp; +</button>
        {favorited
          ? (
            <button type="submit" onClick={outfitButtonHandler} id="overview-favoriteButton" data-testId="favorite">
              <div>
                <FontAwesomeIcon icon="fa-solid fa-star" style={{ color: '#000000' }} />
              </div>
            </button>
          )
          : (
            <button type="submit" onClick={outfitButtonHandler} id="overview-favoriteButton" data-testId="favorite">
              <div>
                <FontAwesomeIcon icon="fa-regular fa-star" style={{ color: '#000000' }} />
              </div>
            </button>
          )}
      </div>
    </div>
  );
}

export default PurchaseOptions;
