import React, {useState, useEffect} from 'react';

const ShoppingCart = () => {
  const [cartItems, setCartItems] = useState([])
  useEffect(()=>{
    let storedCartItems = JSON.parse(sessionStorage.getItem('cart'));
    setCartItems(storedCartItems);
    console.log(storedCartItems);
  }, [sessionStorage.getItem('cart')])
  return (
    <h2>Hi</h2>
  )
}

export default ShoppingCart;