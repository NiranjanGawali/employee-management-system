import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import userReducer from './features/user/userSlice';
import empReducer from './features/employee/employeeSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    emp: empReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export default store;
