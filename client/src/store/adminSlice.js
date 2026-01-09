import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const requireAuthToken = (thunkApi) => {
  const token = thunkApi.getState().auth.accessToken;
  if (!token) throw new Error("Not authenticated");
  return token;
};

// GET TOTAL USERS
export const getTotalUsers = createAsyncThunk("/admin/getUsers", async(_, thunkApi) => {
    try {
        const accessToken = requireAuthToken(thunkApi);

        const res = await axios.get(`${API_URL}/api/v1/admin/users/all`,{
            headers : { Authorization : `Bearer ${accessToken}`}
        })
        return res.data;
    } catch (error) {
        return thunkApi.rejectWithValue(
             error.message || error.response?.data?.message || "Failed to fetch users"
        )
    }
})