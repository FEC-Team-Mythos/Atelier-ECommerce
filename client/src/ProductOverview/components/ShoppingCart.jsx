import React, {useState, useEffect} from 'react';

const ShoppingCart = ({cartItems}) => {

  useEffect(()=>{
    localStorage.setItem('cart', JSON.stringify(cartItems));
    console.log('here');
  }, [cartItems])

  return (
    <div>
      {cartItems.map(item => (
        <h1 key={item.sku_id}>{JSON.stringify(item)}</h1>
      ))}
    </div>
  )
}

export default ShoppingCart;