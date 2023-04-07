import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

// This component serves as the template for the individual product cards
// that make up the product list in both carousels
function ProductCard({ id, setProductId, product }) {

  return (
    <div>
      <NavLink to='product'>
        <div onClick={() => setProductId(id)} className="related-card">
              {product.styles.results.length ? <img src={product.styles.results[0].photos[0].thumbnail_url} width={125} height={125} /> : null}
              <br />
              {product.category}
              <br />
              {product.name}
              <br />
              $
              {product.default_price}
        </div>
      </NavLink>
    </div>
  );
}

export default ProductCard;

//window.location.assign('product')