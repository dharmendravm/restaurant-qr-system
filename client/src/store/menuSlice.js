import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
const DEFAULT_LIMIT = 9;
const DEFAULT_CATEGORIES = [
  "All",
  "Appetizers",
  "Soups",
  "Main Courses",
  "Desserts",
  "Beverages",
];

// GET Menu By Category
export const fetchMenuItems = createAsyncThunk(
  "menu/fetch",
  async (params, thunkApi) => {
    try {
      const isLegacyCategoryArg = typeof params === "string";
      const category = isLegacyCategoryArg ? params : params?.category;
      const page = !isLegacyCategoryArg ? params?.page : undefined;
      const limit = !isLegacyCategoryArg ? params?.limit : undefined;

      const searchParams = new URLSearchParams();

      if (category && category !== "All") {
        searchParams.set("category", category);
      }

      if (page) {
        searchParams.set("page", page);
      }

      if (limit) {
        searchParams.set("limit", limit);
      }

      const query = searchParams.toString();
      const url = query ? `${API_URL}/api/v1/menu?${query}` : `${API_URL}/api/v1/menu`;

      const res = await axios.get(url);

      return res.data; // { success, data: [...], pagination: {...} }
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
    categories: DEFAULT_CATEGORIES,
    loading: false,
    error: null,
    selectedCategory: "All",
    searchQuery: "",
    currentPage: 1,
    limit: DEFAULT_LIMIT,
    pagination: {
      enabled: true,
      currentPage: 1,
      limit: DEFAULT_LIMIT,
      totalPages: 1,
      hasNextPage: false,
      hasPrevPage: false,
    },
  },

  reducers: {
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
      state.currentPage = 1;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = Math.max(action.payload || 1, 1);
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    clearMenuItems: (state) => {
      state.menuItems = [];
      state.allMenuItems = [];
      state.categories = DEFAULT_CATEGORIES;
      state.currentPage = 1;
      state.pagination = {
        enabled: true,
        currentPage: 1,
        limit: state.limit,
        totalPages: 1,
        hasNextPage: false,
        hasPrevPage: false,
      };
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
        state.pagination = action.payload.pagination || {
          enabled: true,
          currentPage: state.currentPage,
          limit: state.limit,
          totalPages: 1,
          hasNextPage: false,
          hasPrevPage: false,
        };
        state.currentPage = state.pagination.currentPage || 1;

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

        // Keep category chips stable and beginner-friendly.
        if (state.selectedCategory === "All") {
          const uniqueCats = [
            ...DEFAULT_CATEGORIES,
            ...new Set(action.payload.data.map((item) => item.category)),
          ];
          state.categories = [...new Set(uniqueCats)];
        }
      })

      .addCase(fetchMenuItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default menuSlice.reducer;
export const { setSelectedCategory, setCurrentPage, setSearchQuery, clearMenuItems } = menuSlice.actions;


