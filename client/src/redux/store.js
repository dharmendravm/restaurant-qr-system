import { configureStore } from "@reduxjs/toolkit";
import authReducer from './authSlice.js'

const store = configureStore({
    reducer : {
        auth : authReducer
    }
})

console.log(store)
export default store