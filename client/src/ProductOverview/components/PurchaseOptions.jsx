/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-restricted-syntax */
/* eslint-disable react/prop-types */

import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-regular-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { RxCheckCircled } from 'react-icons/rx';

library.add(faStar);

function PurchaseOptions({
  product, productInformation, setProductInformation, productStyles, setMainImage,
  cartItems, setCartItems, setOutfits, outfits,
}) {
  const [selectedSize, setSelectedSize] = useState(0);
  const [selectedQuantity, setSelectedQuantity] = useState(0);
  const [selectedSku, setSelectedSku] = useState('');
  const [favorited, setFavorited] = useState(false);
  const [selectedStyleIndex, setSelectedStyleIndex] = useState(0);

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

  useEffect(() => {
    getSelectedQuantity();
  }, [selectedSize]);

  const addToCart = () => {
    let updatedCart = [];
    let exists = false;

    if (cartItems.length) {
      updatedCart = [...cartItems];
      for (const item of updatedCart) {
        if (item.sku_id === selectedSku && item.size === selectedSize.size) {
          item.quantity += selectedQuantity;
          exists = true;
          break;
        }
      }
      // updatedCart.push({product_id: product.id, style_id: productInformation.style_id, sku_id:
      // selectedSku, size: selectedSize.size, quantity: selectedQuantity});
      if (!exists) {
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
      }
    } else {
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
        productId: product.id,
        productName: product.name,
        productPhoto: productInformation.photos[0].thumbnail_url,
        styleName: productInformation.name,
        productCost: (productInformation.sale_price || productInformation.original_price
                      || product.default_price),
        productCategory: product.category,
      });
    } else {
      updatedOutfits = [{
        productId: product.id,
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
        <em>{productInformation.name}</em>
      </p>
      <div className="overview-productStyleContainer">
        {productStyles.map((style, index) => (
          <div key={style.photos[0].url} className={selectedStyleIndex === index ? 'overview-productStyleList-selected' : 'overview-productStyleList'}>
            <img
              src={style.photos[0].thumbnail_url}
              key={style.photos[0].thumbnail_url}
              alt={`Product Style - ${index}`}
              id={selectedStyleIndex === index ? 'overview-productStyle-selected' : 'overview-productStyle'}
              onClick={() => {
                if (productInformation !== style) {
                  setProductInformation(style);
                  setMainImage({ url: style.photos[0].url, index: 0 });
                  setSelectedSize(0);
                  setSelectedStyleIndex(index);
                }
              }}
              loading="lazy"
            />
            {selectedStyleIndex === index ? <RxCheckCircled id="overview-productCheck" /> : null}
          </div>
        ))}
      </div>
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
              <option value="0">-</option>
            </select>
          )}
      </div>
      <div className="overview-purchaseButtons">
        {selectedSize
          ? <button type="submit" aria-label="Add to Bag" onClick={addToCart} id="overview-addToBag" data-testid="addToBag">ADD TO CART &nbsp;&nbsp;&nbsp; +</button>
          : <button type="submit" aria-label="Add to Bag" onClick={addToCart} id="overview-addToBag" data-testid="addToBag" disabled>ADD TO CART &nbsp;&nbsp;&nbsp; +</button>}
        {favorited
          ? (
            <button type="submit" onClick={outfitButtonHandler} aria-label="Favorite Outfit" id="overview-favoriteButton" data-testid="favorite">
              <div>
                <FontAwesomeIcon icon="fa-solid fa-star" style={{ color: '#000000' }} />
              </div>
            </button>
          )
          : (
            <button type="submit" onClick={outfitButtonHandler} id="overview-favoriteButton" aria-label="Favorite Outfit" data-testid="favorite">
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
