import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useState } from 'react';
import type { RootState } from './index';

export type Expense = {
  id: string;
  title: string;
  amount: number;
  category: string;
};

type ExpenseState = {
  items: Expense[];
};

const initialState: ExpenseState = {
  items: [],
};

const expenseSlice = createSlice({
  name: 'expenses',
  initialState,
  reducers: {
    addExpense: (
      state,
      action: PayloadAction<Omit<Expense, 'id'>>
    ) => {
      state.items.push({
        ...action.payload,
        id: `${Date.now()}-${state.items.length}`,
      });
    },

    removeExpense: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(
        (expense) => expense.id !== action.payload
      );
    },
  },
});

export const { addExpense, removeExpense } = expenseSlice.actions;

export default expenseSlice.reducer;

export const selectCategoryTotals = (state: RootState) => {
  const totals: Record<string, number> = {};

  state.expenses.items.forEach((expense) => {
    totals[expense.category] =
      (totals[expense.category] ?? 0) + expense.amount;
  });

  return totals;
};

export const selectMonthlySummary = (state: RootState) => {
  const month = new Date().toISOString().slice(0, 7);

  const total = state.expenses.items.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );

  return {
    month,
    total,
    count: state.expenses.items.length,
  };
};

/**
 * Local form state for expense entry screens.
 * Redux stores submitted expenses; useState manages the form fields.
 */
export function useExpenseForm() {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('food');

  return {
    title,
    setTitle,
    amount,
    setAmount,
    category,
    setCategory,
  };
}