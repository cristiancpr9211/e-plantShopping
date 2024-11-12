import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  // Calculate total amount for all products in the cart
const calculateTotalAmount = () => {
  const total = cart.reduce((total, item) => {
    // Remove the dollar sign and convert to a number
    const cost = parseFloat(item.cost.replace('$', '')) || 0; // Removes the dollar sign and converts to number
    const quantity = Number(item.quantity) || 0; // Ensure quantity is valid

    return total + (cost * quantity); // Add the calculated cost for this item
  }, 0);

  return total.toFixed(2); // Return the total cost, formatted to 2 decimal places
};

  const handleContinueShopping = (e) => {
    e.preventDefault();
    onContinueShopping();
  };

  const handleCheckoutShopping = (e) => {
  alert('Functionality to be added for future reference');
};


  const handleIncrement = (item) => {
      const updatedQuantity = item.quantity + 1;
  
  // Dispatch the updateQuantity action with the item name and the updated quantity
  dispatch(updateQuantity({ name: item.name, quantity: updatedQuantity }));
  };

  const handleDecrement = (item) => {
  if (item.quantity > 1) {
    // If quantity is greater than 1, decrement by 1
    const updatedQuantity = item.quantity - 1;
    dispatch(updateQuantity({ name: item.name, quantity: updatedQuantity }));
  } else if (item.quantity === 1) {
    // If quantity is 1, just decrement (no removal)
    const updatedQuantity = item.quantity - 1;
    dispatch(updateQuantity({ name: item.name, quantity: updatedQuantity }));
  } else if (item.quantity === 0) {
    // If quantity is 0, remove the item from the cart
    dispatch(removeItem(item.name));
  }
};

  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  // Calculate total cost based on quantity for an item
  const calculateTotalCost = (item) => {
// Remove the dollar sign and parse the remaining string as a float
  const cost = parseFloat(item.cost.replace('$', '')) || 0; // Remove '$' and convert to number
  const quantity = parseInt(item.quantity, 10) || 1; // Ensure quantity is a valid number

  if (isNaN(cost) || isNaN(quantity)) {
    console.error('Invalid cost or quantity!');
    return '0.00'; // Return a fallback value if invalid
  }

  return (cost * quantity).toFixed(2); // Format total cost to 2 decimal places
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>
              <div className="cart-item-quantity">
                <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
              </div>
              <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
              <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div>
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={(e) => handleContinueShopping(e)}>Continue Shopping</button>
        <br />
        <button className="get-started-button1">Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;


