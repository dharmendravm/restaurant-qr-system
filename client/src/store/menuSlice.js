import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

// GET Menu By Category
export const fetchMenuItems = createAsyncThunk(
  "menu/fetch",
  async (category, thunkApi) => {
    try {
      const url =
        category && category !== "All"
          ? `${API_URL}/api/v1/menu?category=${category}`
          : `${API_URL}/api/v1/menu`;

      const res = await axios.get(url);

      return res.data; // { success, data: [...] }
    } catch (err) {
      return thunkApi.rejectWithValue(
        err.response?.data?.message || "Failed to fetch menu items"
      );
    }
  }
);

// SLICE
const menuSlice = createSlice({
  name: "menu",
  initialState: {
    menuItems: [],
    allMenuItems: [],
    categories: [],
    loading: false,
    error: null,
    selectedCategory: "All",
    searchQuery: "",
  },

  reducers: {
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    clearMenuItems: (state) => {
      state.menuItems = [];
      state.allMenuItems = [];
      state.categories = [];
    },
  },

  extraReducers: (builder) => {
    builder
    
      // FETCH HANDLERS
      .addCase(fetchMenuItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchMenuItems.fulfilled, (state, action) => {
        state.loading = false;

        // API returns { data: [...] }
        state.allMenuItems = action.payload.data;

        let filtered = action.payload.data;

        // Apply SEARCH filter if needed
        if (state.searchQuery) {
          const q = state.searchQuery.toLowerCase();

          filtered = action.payload.data.filter((item) =>
            item.name.toLowerCase().includes(q) ||
            item.description.toLowerCase().includes(q) ||
            item.category.toLowerCase().includes(q)
          );
        }

        state.menuItems = filtered;

        // Categories build only when category == "All"
        if (state.selectedCategory === "All") {
          const uniqueCats = [
            "All",
            ...new Set(action.payload.data.map((item) => item.category)),
          ];
          state.categories = uniqueCats;
        }
      })

      .addCase(fetchMenuItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default menuSlice.reducer;
export const { setSelectedCategory, setSearchQuery, clearMenuItems } = menuSlice.actions;


