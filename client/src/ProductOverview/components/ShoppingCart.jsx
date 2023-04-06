/* eslint-disable react/prop-types */
import React from 'react';
import { CiCircleRemove } from 'react-icons/ci';
import { NavLink } from 'react-router-dom';

function ShoppingCart({
  cartItems, setCartItems, cartOpen, setCartOpen,
}) {
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

  return (
    <div>
      {cartOpen && cartItems.length
        ? (
          <div className="overview-cartContainer">
            {cartItems.map((item, index) => (
              <div key={item.sku_id} className="overview-cartItems">
                <img id="overview-cartProductImage" src={item.productPhoto} alt={`Product in Cart - ${index}`} />
                <div className="overview-cartInfo">
                  <span>{`Product: ${item.productName} - ${item.styleName}`}</span>
                  <span>{`Cost: ${item.productCost}`}</span>
                  <span>{`Size: ${item.size}`}</span>
                  <span>{`Quantity: ${item.quantity}`}</span>
                </div>
                <button
                  id="overview-removeButton"
                  type="submit"
                  aria-label="Remove Current Item"
                  onClick={() => { removeItem(item.sku_id, item.size); }}
                >
                  <CiCircleRemove id="overview-removeIcon" />
                </button>
              </div>
            ))}
            <div className="overview-bottomButtons">
              <button type="submit" aria-label="Exit Cart" onClick={() => { setCartOpen(false); }}>Exit</button>
              <NavLink to="checkout">
                <button type="submit" aria-label="Check Out" id="overview-checkoutButton">Check Out</button>
              </NavLink>
            </div>
          </div>
        )
        : null}
    </div>
  );
}

export default ShoppingCart;
