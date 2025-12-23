import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/authSlice.js";
import guestSlice from '../redux/guestSlice.js'
import menuReducer from '../redux/menuSlice.js'
import cartReducer from '../redux/cartSlice.js'

const store = configureStore({
  reducer: {
    auth: authReducer,
    guest: guestSlice,
    menu : menuReducer,
    cart : cartReducer 
  },
});

export default store;
