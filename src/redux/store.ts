import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import streamReducer from './streamSlice';
import authReducer from './authSlice';
const store = configureStore({
  reducer: {
    user: userReducer,
    stream: streamReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;