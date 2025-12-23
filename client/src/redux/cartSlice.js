import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

// redux/helpers/getAuthToken.js
export const requireAuthToken = (thunkApi) => {
  const token = thunkApi.getState().auth.accessToken;
  if (!token) throw new Error("Not authenticated");
  return token;
};

// GET CART
export const getCartThunk = createAsyncThunk(
  "cart/getCart",
  async (_, thunkApi) => {
    try {
      const accessToken = requireAuthToken(thunkApi);

      const res = await axios.get(`${API_URL}/api/v1/cart`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      return res.data.cart;
    } catch (error) {
      return thunkApi.rejectWithValue(
        error.message || error.response?.data?.message || "Failed to fetch cart"
      );
    }
  }
);

// ADD TO CART
export const addToCartThunk = createAsyncThunk(
  "cart/addToCart",
  async ({ menuItemId, quantity }, thunkApi) => {
    try {
      const accessToken = requireAuthToken(thunkApi);

      const res = await axios.post(
        `${API_URL}/api/v1/cart/add`,
        {
          menuItemId, quantity,
        },
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      return res.data.cart;
    } catch (error) {
      return thunkApi.rejectWithValue(
        error.message || error.response?.data?.message || "Failed to add item"
      );
    }
  }
);

// INCREASE QTY
export const increaseQtyCartThunk = createAsyncThunk(
  "cart/increaseQty",
  async (menuItemId, thunkApi) => {
    try {
      const accessToken = requireAuthToken(thunkApi);

      const res = await axios.patch(
        `${API_URL}/api/v1/cart/increase`,
        { menuItemId },
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      return res.data.cart;
    } catch (error) {
      return thunkApi.rejectWithValue(
        error.message ||
          error.response?.data?.message ||
          "Failed to increase quantity"
      );
    }
  }
);

// DECREASE QTY
export const decreaseQtyCartThunk = createAsyncThunk(
  "cart/decreaseQty",
  async (menuItemId, thunkApi) => {
    try {
      const accessToken = requireAuthToken(thunkApi);

      const res = await axios.patch(
        `${API_URL}/api/v1/cart/decrease`,
        { menuItemId},
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      return res.data.cart;
    } catch (error) {
      return thunkApi.rejectWithValue(
        error.message ||
          error.response?.data?.message ||
          "Failed to decrease quantity"
      );
    }
  }
);

// REMOVE ITEM
export const removeItemCartThunk = createAsyncThunk(
  "cart/removeItem",
  async (menuItemId, thunkApi) => {
    try {
      const accessToken = requireAuthToken(thunkApi);

      const res = await axios.delete(`${API_URL}/api/v1/cart/remove`, {
        data: { menuItemId },
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      return res.data.cart;
    } catch (error) {
      return thunkApi.rejectWithValue(
        error.message ||
          error.response?.data?.message ||
          "Failed to remove item"
      );
    }
  }
);

// CLEAR CART
export const clearCartThunk = createAsyncThunk(
  "cart/clearCart",
  async (_, thunkApi) => {
    try {
      const accessToken = requireAuthToken(thunkApi);

      await axios.delete(`${API_URL}/api/v1/cart/clear`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      return null;
    } catch (error) {
      return thunkApi.rejectWithValue(
        error.message || error.response?.data?.message || "Failed to clear cart"
      );
    }
  }
);

/* ================= SLICE ================= */

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: null, //
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
          !action.type.startsWith("cart/getCart") &&
          action.type.endsWith("/pending"),
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addMatcher(
        (action) =>
          action.type.startsWith("cart/") &&
          !action.type.startsWith("cart/getCart") &&
          action.type.endsWith("/fulfilled"),
        (state, action) => {
          state.loading = false;
          state.cart = action.payload;
        }
      )
      .addMatcher(
        (action) =>
          action.type.startsWith("cart/") && action.type.endsWith("/rejected"),
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
  },
});

export default cartSlice.reducer;
