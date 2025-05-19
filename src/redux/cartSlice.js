import { createSlice } from "@reduxjs/toolkit";

const loadCartFromLocalStorage = () => {
  try {
    const serializedCart = localStorage.getItem("cartItems");
    return serializedCart ? JSON.parse(serializedCart) : [];
  } catch {
    return [];
  }
};

const loadSavedFromLocalStorage = () => {
  try {
    const serializedSaved = localStorage.getItem("savedItems");
    return serializedSaved ? JSON.parse(serializedSaved) : [];
  } catch {
    return [];
  }
};

const initialState = {
  cartItems: loadCartFromLocalStorage(),
  savedItems: loadSavedFromLocalStorage(),
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const existing = state.cartItems.find((item) => item.id === product.id);
      if (existing) {
        existing.quantity += 1;
      } else {
        state.cartItems.push({ ...product, quantity: 1 });
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter((item) => item.id !== action.payload);
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    increaseQuantity: (state, action) => {
      const item = state.cartItems.find((item) => item.id === action.payload);
      if (item) {
        item.quantity += 1;
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      }
    },
    decreaseQuantity: (state, action) => {
      const item = state.cartItems.find((item) => item.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      }
    },
    moveToSaved: (state, action) => {
      const itemId = action.payload;
      const item = state.cartItems.find((item) => item.id === itemId);
      if (item) {
        state.cartItems = state.cartItems.filter((item) => item.id !== itemId);
        state.savedItems.push(item);
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        localStorage.setItem("savedItems", JSON.stringify(state.savedItems));
      }
    },
    moveToCart: (state, action) => {
      const itemId = action.payload;
      const item = state.savedItems.find((item) => item.id === itemId);
      if (item) {
        state.savedItems = state.savedItems.filter((item) => item.id !== itemId);
        state.cartItems.push(item);
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        localStorage.setItem("savedItems", JSON.stringify(state.savedItems));
      }
    },
    removeFromSaved: (state, action) => {
      state.savedItems = state.savedItems.filter((item) => item.id !== action.payload);
      localStorage.setItem("savedItems", JSON.stringify(state.savedItems));
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  moveToSaved,
  moveToCart,
  removeFromSaved,
} = cartSlice.actions;

export default cartSlice.reducer;
