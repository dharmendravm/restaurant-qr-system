import api from "@/lib/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

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

export const getOrderById = createAsyncThunk(
  "orders/all",
  async (orderId, thunkApi) => {
    try {
      const headers = getOptionalAuthHeaders(thunkApi);

      const res = await api.get(`/orders/${orderId}`, { headers });
      return res.data;
    } catch (error) {
      return thunkApi.rejectWithValue(
        error.response?.data?.message || "Failed to fetch order"
      );
    }
  }
);

const orderSlice = createSlice({
  name: "coupon",
  initialState: {
    order: null,
    loading: false,
    error: null,
    selectedCoupon: null,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(getOrderById.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.order = action.payload;
      })

      .addMatcher(
        (action) =>
          action.type.startsWith("orders/") && action.type.endsWith("/pending"),
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addMatcher(
        (action) =>
          action.type.startsWith("orders/") &&
          action.type.endsWith("/rejected"),
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
  },
});

export default orderSlice.reducer;
