import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import Card from 'react-bootstrap/Card';

// This component serves as the template for the individual product cards
// that make up the product list in both carousels
function ProductCard({ product, index, listType, setShowModal, setComparedProduct, handleAdd, handleRemove }) {

  // if list is for "Your Outfit", add "+" card to add product to outfit, else create and return product card for product being
  if (listType.type === 'outfit' && index === undefined) {
    return (
      <Card className="related-card">
        <button role="add-outfit" onClick={handleAdd}>+ Add product to outfit +</button>
      </Card>
    );
  }
  return (
    <div>
      <Card className="related-card">
        <Card.Body>
          <Card.Text>
            <img src={product.styles.results[0].photos[0].thumbnail_url} width={125} height={125} />
            {listType.type === 'related' ? <button onClick={() => { setComparedProduct(product); setShowModal(true); }}>☆</button> : <button onClick={handleRemove}>x</button> }
            <br />
            {product.category}
            <br />
            {product.name}
            <br />
            $
            {product.default_price}
            <br />
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}

export default ProductCard;
