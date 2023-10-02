import { configureStore } from "@reduxjs/toolkit";
import userSlice from './slices/CreateSlice';
const Store=configureStore({
    reducer:{
        users:userSlice,
    },
});

export default Store;