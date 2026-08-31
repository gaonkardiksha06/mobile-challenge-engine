import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import todoReducer from '../features/todos/todoSlice';
import cartReducer from './cartSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    todos: todoReducer,
    cart: cartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export { useSelector, useDispatch } from 'react-redux';
