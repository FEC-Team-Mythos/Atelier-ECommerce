import React, {useState, useEffect} from 'react';

const ShoppingCart = ({cartItems}) => {

  useEffect(()=>{
    localStorage.setItem('cart', JSON.stringify(cartItems));
    console.log('here');
  }, [cartItems])

  return (
    <div>
      {cartItems.map(item => (
        <div key={item.sku_id}>
        <h1>{JSON.stringify(item)}</h1>
        </div>
      ))}
    </div>
  )
}

export default ShoppingCart;