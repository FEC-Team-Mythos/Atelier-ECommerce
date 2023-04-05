import React, { useState, useEffect } from 'react';

// This component serves as the template for the individual product cards
// that make up the product list in both carousels
function ProductCard({ id, setProductId, product, index, listType, setShowModal, setComparedProduct, handleAdd, handleRemove }) {

  return (
    <div>
      <div onClick={() => { setProductId(71706); window.location.assign('product'); }} className="related-card">
            {product.styles.results.length ? <img src={product.styles.results[0].photos[0].thumbnail_url} width={125} height={125} /> : null}
            <br />
            {product.category}
            <br />
            {product.name}
            <br />
            $
            {product.default_price}
            <br />
            ☆☆☆☆☆
            <br />
      </div>
    </div>
  );
}

export default ProductCard;

//window.location.assign('product')