import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const getCartThunk = createAsyncThunk("cart/getCart", async (userId, thunkApi) => {
    try {
      const res = await axios.get(
        `${API_URL}/api/cart/${userId}`
      );

      return res.data.cart;
    } catch (error) {
      return thunkApi.rejectWithValue(
        error.response?.data?.message || "Failed to fetch cart"
      );
    }
  }
);

const cartSlice = createSlice({
    
})