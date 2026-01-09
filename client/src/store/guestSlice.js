import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const initialState = {
  sessionToken: null,
  loading: false,
  error: null,
};

// Guest session
export const session = createAsyncThunk("/session", async (data, thunkApi) => {
  try {
    const res = await axios.post(`${API_URL}/api/v1/session`, data);
    return res.data;
  } catch (error) {
    return thunkApi.rejectWithValue(error.response?.data?.message || "Something went wrong");
  }
});

const guestSlice = createSlice({
  name: "guest",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(session.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(session.fulfilled, (state, action) => {
        state.loading = false;
        state.sessionToken = action.payload?.data?.sessionToken || null;
        if (state.sessionToken) {
          localStorage.setItem("sessionToken", state.sessionToken);
        }
      })
      .addCase(session.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to start guest session";
      });
  },
});

export default guestSlice.reducer;
