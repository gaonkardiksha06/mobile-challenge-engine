import { configureStore } from '@reduxjs/toolkit';
import expenseReducer from './expenseSlice';
import cartReducer from './cartSlice';

export const store = configureStore({
  reducer: {
    expenses: expenseReducer,
    cart: cartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
