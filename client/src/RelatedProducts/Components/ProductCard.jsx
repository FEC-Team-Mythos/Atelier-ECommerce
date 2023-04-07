import React, { useState, useEffect } from 'react';
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as hollowStar } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';

// This component serves as the template for the individual product cards
// that make up the product list in both carousels
function ProductCard({ currentProduct, starArr, product, index, listType, setShowModal, setComparedProduct, handleAdd, handleRemove, setProductId }) {
  library.add(solidStar, hollowStar);
  const displayHollowStars = () => (
    <div className="hollow-stars">
      {[...Array(5)].map((_, index) => (
        <FontAwesomeIcon key={index} icon={hollowStar} />
      ))}
    </div>
  );

  const displayAllStars = () => (
    <div id="reviews-star-container" style={{ position: 'relative' }}>
      {displayHollowStars()}
      <div style={{ position: 'absolute', top: 0, left: 0 }}>
        {starArr}
      </div>
    </div>
  );

  // if list is for "Your Outfit", add "+" card to add product to outfit, else create and return product card for product being
  if (handleAdd && currentProduct) {
    if (currentProduct.styles !== undefined) {
    return (
      <div>
        <div className="related-card">
        <img src={currentProduct.styles.results[0].photos[0].thumbnail_url} width={125} height={125} loading="lazy" />
        <br />
              <div style={{fontSize: '12px'}}className="related-text">Current Product</div>
              <br />
              <div style={{fontSize: '16px', fontWeight: 'bold'}} className="related-text">{currentProduct.name}</div>
              <br />
              <br />
          <button role="add-outfit" onClick={handleAdd}>Add to outfit</button>
        </div>
      </div>
    );
  }
  }
  if (listType.type === 'related') {
    return (
      <div>
        <div className="related-card">
            {listType.type === 'related' ? <button style={{width: '22px', height: '22px', float: 'right'}} onClick={() => { setComparedProduct(product); setShowModal(true); }}>☆</button> : <button style={{float: 'right'}} onClick={() => {handleRemove(product.name)}}>x</button> }
              <div onClick={() => setProductId(product.id)}>
              <img src={product.styles.results[0].photos[0].thumbnail_url} width={125} height={125} loading="lazy" />
              <br />
              <div style={{fontSize: '12px'}}className="related-text">{product.category}</div>
              <br />
              <div style={{fontSize: '16px', fontWeight: 'bold'}} className="related-text">{product.name}</div>
              <br />
              <div style={{fontSize: '14px'}} className="related-text">${product.default_price}</div>
              <br />
              <span id="related-graph-avg" style={{position: 'left'}}>
              {displayAllStars()}
              </span>
              <br />
              </div>
        </div>
      </div>
    );
  }
  return (
    <div>
      <div className="related-card">
          {listType.type === 'related' ? <button style={{float: 'right'}} onClick={() => { setComparedProduct(product); setShowModal(true); }}>☆</button> : <button style={{float: 'right'}} onClick={() => {handleRemove({name: product.productName, style: product.styleName})}}>x</button> }
            <div onClick={() => setProductId(product.productId)}>
            <img src={product.productPhoto} width={125} height={125} loading="lazy" />
              <br />
              <div style={{fontSize: '12px'}}className="related-text">{product.productCategory}</div>
              <br />
              <div style={{fontSize: '16px', fontWeight: 'bold'}} className="related-text">{product.productName}</div>
              <br />
              <div style={{fontSize: '14px'}} className="related-text">${product.productCost}</div>
              <br />
              <div style={{fontSize: '14px'}} className="related-text">{product.styleName}</div>
              <br />
              <span id="related-graph-avg" style={{position: 'left'}}>
              {displayAllStars()}
              </span>
            <br />
            </div>
      </div>
    </div>
  );
}

export default ProductCard;