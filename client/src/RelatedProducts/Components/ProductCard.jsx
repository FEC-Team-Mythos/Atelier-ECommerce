import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import Card from 'react-bootstrap/Card';

// This component serves as the template for the individual product cards
// that make up the product list in both carousels
const ProductCard = ({ product, index, listType, setShowModal }) => {

  // if list is for "Your Outfit", add "+" card to add product to outfit, else create and return product card for product being
  if (listType.type === 'outfit' && index === undefined) {
    return (
      <Card className="related-card">
          <button>+ Add product to outfit +</button>
    </Card>
    )
    } else {
    return (
      <div>
      <Card className="related-card">
        <Card.Body>
          <Card.Text>
            <img src={product.styles.results[0].photos[0].thumbnail_url} width={125} height={125}/>
            <button onClick={() => {setShowModal(true)}}>☆</button><br></br>
            {product.category}<br></br>
            {product.name}<br></br>
            ${product.default_price}<br></br>
          </Card.Text>
        </Card.Body>
      </Card>
      </div>
    )
  }
}

export default ProductCard