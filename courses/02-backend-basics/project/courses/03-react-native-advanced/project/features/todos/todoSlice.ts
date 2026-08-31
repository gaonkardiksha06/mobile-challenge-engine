import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

export type Todo = {
  id: string;
  text: string;
  done: boolean;
};

export type Product = {
  id: number;
  title: string;
  price: number;
};

type TodoState = {
  items: Todo[];
  products: Product[];
  productsStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
};

const initialState: TodoState = {
  items: [],
  products: [],
  productsStatus: 'idle',
};

export const fetchProducts = createAsyncThunk('todos/fetchProducts', async () => {
  const response = await fetch('https://fakestoreapi.com/products?limit=5');
  if (!response.ok) throw new Error('Failed to fetch products');
  const data = await response.json();
  return data.map((p: { id: number; title: string; price: number }) => ({
    id: p.id,
    title: p.title,
    price: p.price,
  })) as Product[];
});

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<string>) => {
      state.items.push({
        id: `${Date.now()}`,
        text: action.payload,
        done: false,
      });
    },
    removeTodo: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((t) => t.id !== action.payload);
    },
    toggleTodo: (state, action: PayloadAction<string>) => {
      const todo = state.items.find((t) => t.id === action.payload);
      if (todo) todo.done = !todo.done;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.productsStatus = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.productsStatus = 'succeeded';
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.productsStatus = 'failed';
      });
  },
});

export const { addTodo, removeTodo, toggleTodo } = todoSlice.actions;
export default todoSlice.reducer;
