import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../store/authSlice.js";
import guestSlice from "../store/guestSlice.js";
import menuReducer from "../store/menuSlice.js";
import cartReducer from "../store/cartSlice.js";
import userReducer from "../store/userSlice.js";
import couponReducer from "../store/couponSlice.js";
import orderReducer from "@/store/orderSlice.js";

import tableReducer from "../store/admin/tableSlice.js";
import adminUserSlice from "../store/admin/adminUserSlice.js";

const store = configureStore({
  reducer: {
    auth: authReducer,
    guest: guestSlice,
    user: userReducer,
    menu: menuReducer,
    cart: cartReducer,
    coupon: couponReducer,
    table: tableReducer,
    order: orderReducer,

    adminUsers: adminUserSlice,
  },
});

export default store;
