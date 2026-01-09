import api from "@/lib/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


// redux/helpers/getAuthToken.js
export const requireAuthToken = (thunkApi) => {
  const token = thunkApi.getState().auth.accessToken;
  if (!token) throw new Error("Not authenticated");
  return token;
};

export const getUserThunk = createAsyncThunk(
  "user/profile",
  async (_, thunkApi) => {
    try {
      const accessToken = requireAuthToken(thunkApi);

      const res = await api.get('user/get', {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      return res.data.data;
    } catch (error) {
      return thunkApi.rejectWithValue(
        error.message || error.response?.data?.message || "Failed to fetch user"
      );
    }
  }
);

// SLICE
const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null, //
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      // GET
      .addCase(getUserThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(getUserThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // ALL CART MUTATIONS (ADD / INC / DEC / REMOVE)
    //   .addMatcher(
    //     (action) =>
    //       action.type.startsWith("cart/") &&
    //       !action.type.startsWith("cart/getCart") &&
    //       action.type.endsWith("/pending"),
    //     (state) => {
    //       state.loading = true;
    //       state.error = null;
    //     }
    //   )
    //   .addMatcher(
    //     (action) =>
    //       action.type.startsWith("cart/") &&
    //       !action.type.startsWith("cart/getCart") &&
    //       action.type.endsWith("/fulfilled"),
    //     (state, action) => {
    //       state.loading = false;
    //       state.cart = action.payload;
    //     }
    //   )
    //   .addMatcher(
    //     (action) =>
    //       action.type.startsWith("cart/") && action.type.endsWith("/rejected"),
    //     (state, action) => {
    //       state.loading = false;
    //       state.error = action.payload;
    //     }
    //   );
  },
});

export default userSlice.reducer;
