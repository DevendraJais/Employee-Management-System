import { configureStore } from '@reduxjs/toolkit';
import employeeReducer from './employeeSlice';
import uiReducer from './uiSlice';

export const store = configureStore({
  reducer: {
    employees: employeeReducer,
    ui: uiReducer,
  },
});
