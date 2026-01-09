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

export const getAllCouponsThunk = createAsyncThunk(
  "coupon/all",
  async (_, thunkApi) => {
    try {
      const headers = getOptionalAuthHeaders(thunkApi);

      const res = await api.get("coupons/preview", { headers });
      return res.data;
    } catch (error) {
      return thunkApi.rejectWithValue(
        error.response?.data?.message || "Failed to fetch coupons"
      );
    }
  }
);

const couponSlice = createSlice({
  name: "coupon",
  initialState: {
    previewCoupons: {
      coupons: [],
      totalCartPrice: 0,
    },
    loading: false,
    error: null,
    selectedCoupon: null,
  },
  reducers: {
    setSelectedCoupon: (state, action) => {
      state.selectedCoupon = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder

      .addCase(getAllCouponsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        const { totalCartPrice, CouponsAfterCalculation } = action.payload;
        state.previewCoupons.totalCartPrice = totalCartPrice;
        state.previewCoupons.coupons = CouponsAfterCalculation;
      })

      .addMatcher(
        (action) =>
          action.type.startsWith("coupon/") && action.type.endsWith("/pending"),
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addMatcher(
        (action) =>
          action.type.startsWith("coupon/") &&
          action.type.endsWith("/rejected"),
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
  },
});

export const { setSelectedCoupon } = couponSlice.actions;
export default couponSlice.reducer;
