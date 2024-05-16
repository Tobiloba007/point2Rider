import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/AuthSlice";
import orderReducer from "./features/OrderSlice";


const store = configureStore({
    reducer: {
        auth: authReducer,
        order: orderReducer,
    },
});

export default store;