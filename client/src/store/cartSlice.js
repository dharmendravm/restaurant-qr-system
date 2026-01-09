import api from "@/lib/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const API_URL = import.meta.env.VITE_API_URL;

export const getOptionalAuthHeaders = (thunkApi) => {
  const token = thunkApi.getState().auth.accessToken;
  const headers = {};

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  // guest token (VERY IMPORTANT)
  const guestToken = localStorage.getItem("sessionToken");
  if (guestToken) {
    headers["x-session-token"] = guestToken;
  }

  return headers;
};

// GET CART
export const getCartThunk = createAsyncThunk(
  "cart/getCart",
  async (_, thunkApi) => {
    try {
      const headers = getOptionalAuthHeaders(thunkApi);

      const res = await api.get("cart", { headers });
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
  async ({ menuItemId, quantity }, thunkApi) => {
    try {
      const headers = getOptionalAuthHeaders(thunkApi);

      const res = await api.post(
        "cart/add",
        {
          menuItemId,
          quantity,
        },
        { headers }
      );
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
  async (menuItemId, thunkApi) => {
    try {
      const headers = getOptionalAuthHeaders(thunkApi);

      const res = await api.patch("cart/increase", { menuItemId }, { headers });
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
  async (menuItemId, thunkApi) => {
    try {
      const headers = getOptionalAuthHeaders(thunkApi);

      const res = await api.patch("cart/decrease", { menuItemId }, { headers });
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
  async (menuItemId, thunkApi) => {
    try {
      const headers = getOptionalAuthHeaders(thunkApi);

      const res = await api.delete("cart/remove", {
        data: { menuItemId },
        headers,
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
  async (_, thunkApi) => {
    try {
      const headers = getOptionalAuthHeaders(thunkApi);

      await api.delete("cart/clear", {
        headers,
      });

      return null;
    } catch (error) {
      return thunkApi.rejectWithValue(
        error.response?.data?.message || "Failed to clear cart"
      );
    }
  }
);

// SLICE
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: null,
    loading: false,
    error: null,
  },
  reducers: { },
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
