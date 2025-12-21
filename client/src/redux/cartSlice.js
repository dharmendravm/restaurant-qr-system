import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

/* ================= THUNKS ================= */

// GET CART
export const getCartThunk = createAsyncThunk(
  "cart/getCart",
  async (userId, thunkApi) => {
    try {
      const res = await axios.get(`${API_URL}/api/v1/cart/${userId}`);
      return res.data.cart;
    } catch (error) {
      return thunkApi.rejectWithValue(
        error.response?.data?.message || "Failed to fetch cart"
      );
    }
  }
);

// ADD TO CART
export const addToCartThunk = createAsyncThunk(
  "cart/addToCart",
  async ({ userId, menuItemId, quantity }, thunkApi) => {
    try {
      const res = await axios.post(`${API_URL}/api/v1/cart/add`, {
        userId,
        menuItemId,
        quantity,
      });
      return res.data.cart;
    } catch (error) {
      return thunkApi.rejectWithValue(
        error.response?.data?.message || "Failed to add item"
      );
    }
  }
);

// INCREASE QTY
export const increaseQtyCartThunk = createAsyncThunk(
  "cart/increaseQty",
  async ({ userId, menuItemId }, thunkApi) => {
    try {
      const res = await axios.patch(`${API_URL}/api/v1/cart/increase`, {
        userId,
        menuItemId,
      });
      return res.data.cart;
    } catch (error) {
      return thunkApi.rejectWithValue(
        error.response?.data?.message || "Failed to increase quantity"
      );
    }
  }
);

// DECREASE QTY
export const decreaseQtyCartThunk = createAsyncThunk(
  "cart/decreaseQty",
  async ({ userId, menuItemId }, thunkApi) => {
    try {
      const res = await axios.patch(`${API_URL}/api/v1/cart/decrease`, {
        userId,
        menuItemId,
      });
      return res.data.cart;
    } catch (error) {
      return thunkApi.rejectWithValue(
        error.response?.data?.message || "Failed to decrease quantity"
      );
    }
  }
);

// REMOVE ITEM
export const removeItemCartThunk = createAsyncThunk(
  "cart/removeItem",
  async ({ userId, menuItemId }, thunkApi) => {
    try {
      const res = await axios.delete(`${API_URL}/api/v1/cart/remove`, {
        data: { userId, menuItemId },
      });
      return res.data.cart;
    } catch (error) {
      return thunkApi.rejectWithValue(
        error.response?.data?.message || "Failed to remove item"
      );
    }
  }
);

// CLEAR CART
export const clearCartThunk = createAsyncThunk(
  "cart/clearCart",
  async (userId, thunkApi) => {
    try {
      await axios.delete(`${API_URL}/api/v1/cart/clear`, {
        data: { userId },
      });
      return null;
    } catch (error) {
      return thunkApi.rejectWithValue(
        error.response?.data?.message || "Failed to clear cart"
      );
    }
  }
);

/* ================= SLICE ================= */

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: null,      //
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      // GET CART
      .addCase(getCartThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCartThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
      })
      .addCase(getCartThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ALL CART MUTATIONS (ADD / INC / DEC / REMOVE)
      .addMatcher(
        (action) =>
          action.type.startsWith("cart/") &&
          action.type.endsWith("/pending"),
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addMatcher(
        (action) =>
          action.type.startsWith("cart/") &&
          action.type.endsWith("/fulfilled"),
        (state, action) => {
          state.loading = false;
          state.cart = action.payload;
        }
      )
      .addMatcher(
        (action) =>
          action.type.startsWith("cart/") &&
          action.type.endsWith("/rejected"),
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
  },
});

export default cartSlice.reducer;
