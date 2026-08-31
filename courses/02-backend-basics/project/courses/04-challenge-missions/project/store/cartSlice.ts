import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
};

type CartState = { items: CartItem[] };

const initialState: CartState = { items: [] };

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<Omit<CartItem, 'quantity'>>) => {
      const existing = state.items.find((i) => i.id === action.payload.id);
      if (existing) existing.quantity += 1;
      else state.items.push({ ...action.payload, quantity: 1 });
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
