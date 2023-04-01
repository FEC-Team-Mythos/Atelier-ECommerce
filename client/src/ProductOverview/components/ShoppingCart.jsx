/* eslint-disable react/prop-types */
import React from 'react';

function ShoppingCart({ cartItems, setCartItems }) {
  const removeItem = (skuId, size) => {
    const updatedCart = [...cartItems];

    for (let i = 0; i < cartItems.length; i += 1) {
      if (cartItems[i].sku_id === skuId && cartItems[i].size === size) {
        updatedCart.splice(i, 1);
      }
    }

    if (!updatedCart.length) {
      localStorage.removeItem('cart');
    } else {
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    }
    setCartItems(updatedCart);
  };

  if (cartItems.length) {
    return (
      <div className="overview-cartContainer">
        {cartItems.map((item, index) => (
          <div key={item.sku_id} className="overview-cartItems">
            <img src={item.productPhoto} alt={`Product in Cart - ${index}`} />
            <p>{`Product: ${item.productName} - ${item.styleName}`}</p>
            <p>{`Cost: ${item.productCost}`}</p>
            <p>{`Size: ${item.size}`}</p>
            <p>{`Quantity: ${item.quantity}`}</p>
            <button type="submit" aria-label="Remove Current Item" onClick={() => { removeItem(item.sku_id, item.size); }}>Remove</button>
          </div>
        ))}
      </div>
    );
  }
  return (
    null
  );
}

export default ShoppingCart;
