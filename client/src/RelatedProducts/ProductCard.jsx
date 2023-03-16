import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

// This component serves as the template for the individual product cards
// that make up the product list in the carousel
const ProductCard = ({ product }) => {

  // if product prop exists, use this template for every product
  if (product) {
  return (
    <Card style={{height: '228px', border: '2px solid rgba(0, 0, 0, 0.5)', borderRadius: '5px'}}>
      <Card.Body>
        <Card.Text>
          <img src={product.styles.results[0].photos[0].thumbnail_url} width={125} height={125}/>
          <button>☆</button><br></br>
          {product.category}<br></br>
          {product.name}<br></br>
          ${product.default_price}<br></br>
        </Card.Text>
      </Card.Body>
    </Card>
  )
  // if product prop does not exist, just return empty card with "+" button
  // to add current product to "My Outfit"
  } else {
    return (
      <Card style={{height: '228px', border: '2px solid rgba(0, 0, 0, 0.5)', borderRadius: '5px'}}>
        <Card.Text>
          +
        </Card.Text>
    </Card>
    )
  }
}

export default ProductCard