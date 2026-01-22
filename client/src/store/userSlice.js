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
      const res = await api.get("user/get");
      return { data: res.data.data };
    } catch (error) {
      return thunkApi.rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to fetch user",
      );
    }
  },
);

export const updateProfileThunk = createAsyncThunk(
  "user/updateProfile",
  async ({ name, phone }, thunkApi) => {
    try {
      const res = await api.put("/user/update-profile", {
        name,
        phone,
      });

      return {
        data: res.data.data,
        message: res.data.message,
      };
    } catch (error) {
      return thunkApi.rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to update profile",
      );
    }
  },
);

// SLICE
const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    loading: false,
    updateLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(getUserThunk.pending, (state) => {
        if (!state.user) {
          state.loading = true;
        }
        state.error = null;
      })
      .addCase(getUserThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data;
      })
      .addCase(getUserThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });


      builder
      .addCase(updateProfileThunk.pending, (state) => {
        state.updateLoading = true;
        state.error = null;
      })
      .addCase(updateProfileThunk.fulfilled, (state, action) => {
        state.updateLoading = false;
        state.user = action.payload.data; // FULL updated user
      })
      .addCase(updateProfileThunk.rejected, (state, action) => {
        state.updateLoading = false;
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;
