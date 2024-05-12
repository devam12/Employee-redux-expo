import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user'; // assuming userSlice.js is in the same directory

const store = configureStore({
    reducer: {
        user: userReducer
    }
});

export default store;
