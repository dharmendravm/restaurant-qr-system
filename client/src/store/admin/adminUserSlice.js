import api from "@/lib/api";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAdminUsers = createAsyncThunk(
  "/admin/users",
  async (_, thunkApi) => {
    try {
      const accessToken = localStorage.getItem("accessToken");

      const res = await axios.get(
        "http://localhost:3000/api/v1/admin/users/all",
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      return res.data.users;
    } catch (error) {
      return thunkApi.rejectWithValue(
        error.responce?.data?.message || "Failed to fetch users"
      );
    }
  }
);

const adminUserSlice = createSlice({
  name: "adminUsers",
  initialState: {
    users: [],
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchAdminUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAdminUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
        console.log("data", action.payload);
      })
      .addCase(fetchAdminUsers.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default adminUserSlice.reducer;
