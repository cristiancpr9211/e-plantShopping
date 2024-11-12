import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize items as an empty array
  },
  reducers: {
    addItem: (state, action) => {
      const { name, image, cost } = action.payload;
      const existingItem = state.items.find(item => item.name === name);
      if (existingItem) {
        existingItem.quantity++;
      } else {
        state.items.push({ name, image, cost, quantity: 1 });
      }
    },
    removeItem: (state, action) => {
      // Use name or ideally an id for unique item removal
      state.items = state.items.filter(item => item.name !== action.payload);
    },
    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload;
      const itemToUpdate = state.items.find(item => item.name === name);
      if (itemToUpdate && quantity > 0) {
        itemToUpdate.quantity = quantity;
      }
    },
  },
});

// Selector to compute the total cost of all items in the cart
export const selectTotalCost = (state) =>
  state.cart.items.reduce((total, item) => total + (item.cost * item.quantity), 0);

// Export actions and reducer
export const { addItem, removeItem, updateQuantity } = CartSlice.actions;
export default CartSlice.reducer;