import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const login = createAsyncThunk('/auth/login', async (data) => {
  try {
    const res = await axios.post(
      'http://localhost:3000/api/v1/auth/login',
      data
    );
    return res.data;
  } catch (error) {}
});
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    loading: false,
    error: null,
    name: null,
    email: null,
    accessToken: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        console.log(action.payload);
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

// console.log(authSlice);

export default authSlice.reducer;

//auth //tables //menu
//authSlice
//tableSlice
//menuSlice =>