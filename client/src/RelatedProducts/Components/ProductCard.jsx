import React, { useState, useEffect } from 'react';

// This component serves as the template for the individual product cards
// that make up the product list in both carousels
function ProductCard({ product, index, listType, setShowModal, setComparedProduct, handleAdd, handleRemove }) {

  // if list is for "Your Outfit", add "+" card to add product to outfit, else create and return product card for product being
  if (listType.type === 'outfit' && index === undefined) {
    return (
      <div className="related-card">
        <button role="add-outfit" onClick={handleAdd}>+ Add product to outfit +</button>
      </div>
    );
  }
  if (listType.type === 'related') {
    return (
      <div>
        <div className="related-card">
            {listType.type === 'related' ? <button style={{float: 'right'}} onClick={() => { setComparedProduct(product); setShowModal(true); }}>☆</button> : <button style={{float: 'right'}} onClick={() => {handleRemove(product.name)}}>x</button> }
              <br />
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
  return (
    <div>
      <div className="related-card">
          {listType.type === 'related' ? <button style={{float: 'right'}} onClick={() => { setComparedProduct(product); setShowModal(true); }}>☆</button> : <button style={{float: 'right'}} onClick={() => {handleRemove(product.name)}}>x</button> }
            <br />
            <img src={product.productPhoto} width={125} height={125} />
            <br />
            {product.productCategory}
            <br />
            {product.productName}
            <br />
            $
            {product.productCost}
            <br />
            ☆☆☆☆☆
            <br />
      </div>
    </div>
  );
}

export default ProductCard;