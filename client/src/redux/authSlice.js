import api from "@/lib/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

// Login
export const login = createAsyncThunk("/auth/login", async (data, thunkApi) => {
  try {
    const res = await api.post(`auth/login`, data);
    return res.data;
  } catch (error) {
    const message =
      error?.response?.data?.message || error?.message || "Server error";

    return thunkApi.rejectWithValue(message);
  }
});

// Register
export const register = createAsyncThunk(
  "/auth/register",
  async (data, thunkApi) => {
    try {
      const res = await axios.post(`${API_URL}/api/v1/auth/register`, data);
      return res.data;
    } catch (error) {
      const message =
        error?.response?.data?.message || error?.message || "Server error";

      return thunkApi.rejectWithValue(message);
    }
  }
);

// LocalStorage
const setAuthToLocalStorage = (payload) => {
  const { data, accessToken, refreshToken } = payload;

  localStorage.setItem(
    "user",
    JSON.stringify({
      id: data._id,
      name: data.name,
      email: data.email,
      role: data.role,
    })
  );

  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("refreshToken", refreshToken);
};

const storedUser = localStorage.getItem("user");
const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    error: null,

    user: storedUser ? JSON.parse(storedUser) : null,
    accessToken: localStorage.getItem("accessToken"),
    refreshToken: localStorage.getItem("refreshToken"),
  },

  reducers: {
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;

      localStorage.removeItem("user");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        const { data, accessToken, refreshToken } = action.payload;

        setAuthToLocalStorage(action.payload);

        state.user = {
          id: data._id,
          name: data.name,
          email: data.email,
          role: data.role,
        };
        state.accessToken = accessToken;
        state.refreshToken = refreshToken;
        state.loading = false;
      })
      .addCase(login.rejected, (state, action) => {
        console.log(action.payload);

        state.error = action.payload || "Internet or Server error";
        state.loading = false;
      });
    builder
      .addCase(register.pending, (state) => {
        state.loading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        const { data, accessToken, refreshToken } = action.payload;

        setAuthToLocalStorage(action.payload);

        state.user = {
          id: data._id,
          name: data.name,
          email: data.email,
          role: data.role,
        };

        state.accessToken = accessToken;
        state.refreshToken = refreshToken;
        state.loading = false;
      })
      .addCase(register.rejected, (state, action) => {
        console.log(action.payload);

        state.error = action.payload;
        state.loading = false;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
