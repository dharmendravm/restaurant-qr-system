import api from "@/lib/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getOrderForDashBoard = createAsyncThunk(
  "/admin/orders/get",
  async (_, thunkApi) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const res = await api.get(`admin/orders/all`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      return res.data;
    } catch (error) {
      return thunkApi.rejectWithValue(
        error.response?.data?.message || "Faild to fetch orders"
      );
    }
  }
);
export const getOrderStatusForDashBoard = createAsyncThunk(
  "/admin/orders/status",
  async (_, thunkApi) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const res = await api.get(`admin/orders/dash/status`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      return res.data;
    } catch (error) {
      return thunkApi.rejectWithValue(
        error.response?.data?.message || "Faild to fetch orders"
      );
    }
  }
);

export const getOrderByIdAdmin = createAsyncThunk(
  "/admin/orders/detail",
  async (id, thunkApi) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const res = await api.get(`admin/orders/${id}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      return res.data;
    } catch (error) {
      return thunkApi.rejectWithValue(
        error.response?.data || "Failed to fetch order"
      );
    }
  }
);

const adminOrderSlice = createSlice({
  name: "adminOrders",
  initialState: {
    orders: [],
    metrics: {
      todayOrders: 0,
      cancelled: 0,
      inProgress: 0,
      todayRevenue: 0,
    },
    orderDetails: [],
    loading: false,
    error: null,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(getOrderForDashBoard.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload.orders; // list
        state.error = null;
      })

      .addCase(getOrderStatusForDashBoard.fulfilled, (state, action) => {
        state.loading = false;
        state.metrics = action.payload;

        state.error = null;
      })
      .addCase(getOrderByIdAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.orderDetails = action.payload;
        state.error = null;
      })

      .addMatcher(
        (action) =>
          action.type.startsWith("admin/orders") &&
          action.type.endsWith("/pending"),
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addMatcher(
        (action) =>
          action.type.startsWith("admin/orders") &&
          action.type.endsWith("/rejected"),
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
  },
});

export default adminOrderSlice.reducer;
