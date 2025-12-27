import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const getAllTables = createAsyncThunk(
  "admin/getAllTables",
  async (_, thunkApi) => {
    try {
      const res = await axios.get(
        `${API_URL}/api/v1/admin/tables/all`
      );
      return res.data;
    } catch (error) {
      return thunkApi.rejectWithValue(
        error.response?.data?.message ||
        error.message ||
        "Something went wrong"
      );
    }
  }
);

const tableSlice = createSlice({
  name: "table",
  initialState: {
    tables: [],
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getAllTables.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getAllTables.fulfilled, (state, action) => {
        state.loading = false;
        state.tables = action.payload.data; 
      })

      .addCase(getAllTables.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default tableSlice.reducer;
