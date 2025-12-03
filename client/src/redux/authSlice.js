import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// Login
export const login = createAsyncThunk('/auth/login', async (data, thunkApi)=>{
  try {
    const res = await axios.post(
      'http://localhost:3000/api/v1/auth/login',
      data
    );
    return res.data
  } catch (error) {
    return thunkApi.rejectWithValue(error.response.data.message)
   }
});

// Register
export const register = createAsyncThunk('/auth/register', async (data, thunkApi)=>{
  try {
    const res = await axios.post(
      'http://localhost:3000/api/v1/auth/register',
      data
    );
    return res.data
  } catch (error) {
    return thunkApi.rejectWithValue(error.response.data.message)
   }
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    loading: false,
    error: null,
    name: null,
    email: null,
    role: null,
    accessToken: null,
    refreshToken:null,
  },
  extraReducers: (builder) => {    
    builder
      .addCase(login.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        console.log(action.payload);
        state.name = action.payload.data.name
        state.email = action.payload.data.email
        state.role = action.payload.data.role
        state.accessToken = action.payload.accessToken
        state.refreshToken = action.payload.refreshToken

        // ! Change is require for this 
        localStorage.setItem('accessToken', action.payload.accessToken)  //!
        localStorage.setItem('refreshToken', action.payload.refreshToken) //!

        state.loading = false
      })
      .addCase(login.rejected, (state, action) => {
        console.log(action.payload);
        
        state.error = action.payload;
        state.loading = false
      });
    builder
      .addCase(register.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        console.log(action.payload);
        // ! Change is require for this 
        localStorage.setItem('accessToken', action.payload.accessToken)  //!
        localStorage.setItem('refreshToken', action.payload.refreshToken) //!

        state.loading = false
      })
      .addCase(register.rejected, (state, action) => {
        console.log(action.payload);
        
        state.error = action.payload;
        state.loading = false
      });
  },
});

export default authSlice.reducer;
  