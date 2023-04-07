import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

// This component serves as the template for the individual product cards
// that make up the product list in both carousels
function ProductCard({ id, setProductId, product }) {

  return (
    <div>
      <NavLink to='product'>
        <div className="related-card" onClick={() => setProductId(id)} >
        <div className="related-fill">
              {product.styles.results.length ? <img src={product.styles.results[0].photos[0].thumbnail_url} /> : null}
              </div>
              <div style={{fontSize: '12px'}}className="related-text">  {product.category}</div>
              <br />
              <div style={{fontSize: '16px', fontWeight: 'bold'}} className="related-text"> {product.name}</div>
              <br />
              <div style={{fontSize: '12px'}} className="related-text"><i>  {product.slogan}</i></div>
              <br/>
              <div style={{fontSize: '16px'}} className="related-text">  ${product.default_price}</div>
        </div>
      </NavLink>
    </div>
  );
}

export default ProductCard;

//window.location.assign('product')
