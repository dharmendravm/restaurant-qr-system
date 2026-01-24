import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice.js";
import guestSlice from "./guestSlice.js";
import menuReducer from "./menuSlice.js";
import cartReducer from "../features/Cart/cartSlice.js";
import userReducer from "./userSlice.js";
import couponReducer from "./couponSlice.js";
import orderReducer from "@/store/orderSlice.js";

import tableReducer from "./admin/tableSlice.js";
import adminUserSlice from "./admin/adminUserSlice.js";
import adminOrdersReducer from "../features/admin-orders/adminOrderSlice.js";

const store = configureStore({
  reducer: {
    auth: authReducer,
    guest: guestSlice,
    user: userReducer,
    menu: menuReducer,
    cart: cartReducer,
    coupon: couponReducer,
    order: orderReducer,

    table: tableReducer,
    adminUsers: adminUserSlice,
    adminOrders: adminOrdersReducer,
  },
});

export default store;
