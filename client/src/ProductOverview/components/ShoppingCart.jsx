import React, {useState, useEffect} from 'react';

const ShoppingCart = ({cartItems, setCartItems}) => {

  useEffect(()=>{
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems])

  const removeItem = (sku_id, size) => {
    let updatedCart=[];

    for (let i = 0; i < cartItems.length; i++) {
      if (cartItems[i].sku_id === sku_id && cartItems[i].size === size) {
        continue;
      }
      updatedCart.push(cartItems[i]);
    }

    setCartItems(updatedCart);
  }

  return (
    <div>
      {cartItems.map((item, index) => (
        <div key={item.sku_id}>
          <img src={item.productPhoto}/>
          <p>Product: {item.name} - {item.styleName}</p>
          <p>Cost: {item.productCost}</p>
          <p>Size: {item.size}</p>
          <p>Quantity: {item.quantity}</p>
          <button onClick = {()=>{removeItem(item.sku_id, item.size)}}>Remove Item</button>
        </div>
      ))}
    </div>
  )
}

export default ShoppingCart;