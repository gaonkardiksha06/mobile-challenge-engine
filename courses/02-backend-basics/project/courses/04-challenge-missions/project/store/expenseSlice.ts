import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useState } from 'react';

export type Expense = {
  id: string;
  title: string;
  amount: number;
  category: string;
};

type ExpenseState = {
  items: Expense[];
};

const initialState: ExpenseState = { items: [] };

const expenseSlice = createSlice({
  name: 'expenses',
  initialState,
  reducers: {
    addExpense: (state, action: PayloadAction<Omit<Expense, 'id'>>) => {
      state.items.push({ ...action.payload, id: `${Date.now()}` });
    },
    removeExpense: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((e) => e.id !== action.payload);
    },
  },
});

export const { addExpense, removeExpense } = expenseSlice.actions;
export default expenseSlice.reducer;

export const selectCategoryTotals = (state: { expenses: ExpenseState }) => {
  const totals: Record<string, number> = {};
  state.expenses.items.forEach((e) => {
    totals[e.category] = (totals[e.category] ?? 0) + e.amount;
  });
  return totals;
};

export const selectMonthlySummary = (state: { expenses: ExpenseState }) => {
  const month = new Date().toISOString().slice(0, 7);
  const total = state.expenses.items.reduce((sum, e) => sum + e.amount, 0);
  return { month, total, count: state.expenses.items.length };
};

/** redux slice + local form state for expense entry screens */
export function useExpenseForm() {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('food');
  return { title, setTitle, amount, setAmount, category, setCategory };
}
