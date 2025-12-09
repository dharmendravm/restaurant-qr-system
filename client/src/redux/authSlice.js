import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

// Login
export const login = createAsyncThunk("/auth/login", async (data, thunkApi) => {
  try {
    const res = await axios.post(
      `${API_URL}/api/v1/auth/login`,
      data
    );
    return res.data;
  } catch (error) {
    return thunkApi.rejectWithValue(error.response.data.message);
  }
});

// Register
export const register = createAsyncThunk(
  "/auth/register",
  async (data, thunkApi) => {
    try {
      const res = await axios.post(
        `${API_URL}/api/v1/auth/register`,
        data
      );
      return res.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    error: null,
    name: null,
    email: null,
    role: null,
    accessToken: null,
    refreshToken: null,
  },

  reducers : {
    logout : (state)=>{
    state.name = null;
    state.email = null;
    state.role = null;
    localStorage.removeItem('accessToken');
    state.refreshToken = null;
    state.accessToken = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        console.log(action.payload);
        state.name = action.payload.data.name;
        state.email = action.payload.data.email;
        state.role = action.payload.data.role;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;

        localStorage.setItem("accessToken", action.payload.accessToken);   // Change is require for this
        localStorage.setItem("refreshToken", action.payload.refreshToken); // Change is require for this

        state.loading = false;
      })
      .addCase(login.rejected, (state, action) => {
        console.log(action.payload);

        state.error = action.payload;
        state.loading = false;
      });
    builder
      .addCase(register.pending, (state) => {
        state.loading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        console.log(action.payload);
        
        localStorage.setItem("accessToken", action.payload.accessToken); //  Change is require for this
        localStorage.setItem("refreshToken", action.payload.refreshToken);// Change is require for this

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
