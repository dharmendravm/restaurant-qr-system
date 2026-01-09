import api from "@/lib/api";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const requireAuthToken = (thunkApi) => {
  const token = thunkApi.getState().auth.accessToken;
  if (!token) throw new Error("Not authenticated");
  return token;
};

export const getAllTables = createAsyncThunk(
  "admin/getAllTables",
  async (_, thunkApi) => {
    try {
      const accessToken = requireAuthToken(thunkApi);
      const res = await api.get(`/admin/tables/all`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      return res.data;
    } catch (error) {
      return thunkApi.rejectWithValue(
        error.response?.data?.message || error.message || "Something went wrong"
      );
    }
  }
);

export const toggleTableStatus = createAsyncThunk(
  "admin/toggletabel",
  async (id, thunkApi) => {
    try {
      const accessToken = requireAuthToken(thunkApi);
      const res = await api.patch(
        `/admin/tables/${id}/toggle`,
        {},
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      return res.data;
    } catch (error) {
      return thunkApi.rejectWithValue(
        error.response?.data?.message || "Failed to toggle table status"
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
      })
      
      .addCase(toggleTableStatus.fulfilled, (state, action) => {
        const { id, isActive } = action.payload;

        const table = state.tables.find((t) => t._id === id);
        if (table) {
          table.isActive = isActive;
        }
      });
  },
});

export default tableSlice.reducer;
