import React from 'react';
import {
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import {
  addExpense,
  removeExpense,
  selectCategoryTotals,
  selectMonthlySummary,
  useExpenseForm,
} from '../store/expenseSlice';

import type { AppDispatch, RootState } from '../store';

const categories = ['food', 'travel', 'shopping', 'bills', 'other'];

export default function ExpensesScreen() {
  const dispatch = useDispatch<AppDispatch>();

  const expenses = useSelector(
    (state: RootState) => state.expenses.items
  );

  const categoryTotals = useSelector(selectCategoryTotals);
  const monthlySummary = useSelector(selectMonthlySummary);

  const {
    title,
    setTitle,
    amount,
    setAmount,
    category,
    setCategory,
  } = useExpenseForm();

  const handleAddExpense = () => {
    const numericAmount = Number(amount);

    if (!title.trim() || !amount.trim() || numericAmount <= 0) {
      return;
    }

    dispatch(
      addExpense({
        title: title.trim(),
        amount: numericAmount,
        category,
      })
    );

    setTitle('');
    setAmount('');
    setCategory('food');
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={expenses}
        keyExtractor={(item) => item.id}
        testID="expense-list"
        contentContainerStyle={styles.content}
        ListHeaderComponent={
          <View>
            <Text style={styles.title}>Expense Tracker</Text>

            <Text style={styles.sectionTitle}>Add Expense</Text>

            <TextInput
              testID="expense-title"
              value={title}
              onChangeText={setTitle}
              placeholder="Expense title"
              style={styles.input}
            />

            <TextInput
              testID="expense-amount"
              value={amount}
              onChangeText={setAmount}
              placeholder="Amount"
              keyboardType="numeric"
              style={styles.input}
            />

            <Text style={styles.label}>Category</Text>

            <View style={styles.categoryRow}>
              {categories.map((item) => (
                <Pressable
                  key={item}
                  testID={`category-${item}`}
                  onPress={() => setCategory(item)}
                  style={[
                    styles.categoryButton,
                    category === item && styles.selectedCategory,
                  ]}
                >
                  <Text
                    style={[
                      styles.categoryText,
                      category === item && styles.selectedCategoryText,
                    ]}
                  >
                    {item}
                  </Text>
                </Pressable>
              ))}
            </View>

            <Pressable
              testID="add-expense"
              onPress={handleAddExpense}
              style={styles.addButton}
            >
              <Text style={styles.addButtonText}>Add Expense</Text>
            </Pressable>

            <View testID="monthly-summary" style={styles.summaryCard}>
              <Text style={styles.summaryTitle}>Monthly Summary</Text>
              <Text>Month: {monthlySummary.month}</Text>
              <Text>Total: ₹{monthlySummary.total.toFixed(2)}</Text>
              <Text>Count: {monthlySummary.count}</Text>
            </View>

            <Text style={styles.sectionTitle}>Category Totals</Text>

            <View testID="category-totals" style={styles.totalsCard}>
              {categories.map((item) => (
                <Text key={item} style={styles.totalRow}>
                  {item}: ₹{(categoryTotals[item] ?? 0).toFixed(2)}
                </Text>
              ))}
            </View>

            <Text style={styles.sectionTitle}>Expenses</Text>
          </View>
        }
        renderItem={({ item }) => (
          <View testID={`expense-${item.id}`} style={styles.expenseCard}>
            <View style={styles.expenseInfo}>
              <Text style={styles.expenseTitle}>{item.title}</Text>
              <Text style={styles.expenseCategory}>
                {item.category}
              </Text>
            </View>

            <View style={styles.expenseRight}>
              <Text style={styles.expenseAmount}>
                ₹{item.amount.toFixed(2)}
              </Text>

              <Pressable
                testID={`remove-expense-${item.id}`}
                onPress={() => dispatch(removeExpense(item.id))}
              >
                <Text style={styles.removeText}>Remove</Text>
              </Pressable>
            </View>
          </View>
        )}
        ListEmptyComponent={
          <Text testID="empty-expenses" style={styles.emptyText}>
            No expenses added yet.
          </Text>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },

  content: {
    padding: 20,
    paddingBottom: 40,
  },

  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 20,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginTop: 20,
    marginBottom: 12,
  },

  label: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 8,
  },

  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 12,
  },

  categoryRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },

  categoryButton: {
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#fff',
  },

  selectedCategory: {
    backgroundColor: '#222',
    borderColor: '#222',
  },

  categoryText: {
    textTransform: 'capitalize',
  },

  selectedCategoryText: {
    color: '#fff',
  },

  addButton: {
    marginTop: 16,
    backgroundColor: '#222',
    borderRadius: 8,
    paddingVertical: 13,
    alignItems: 'center',
  },

  addButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },

  summaryCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    marginTop: 20,
  },

  summaryTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
  },

  totalsCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
  },

  totalRow: {
    textTransform: 'capitalize',
    marginBottom: 6,
  },

  expenseCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 14,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  expenseInfo: {
    flex: 1,
  },

  expenseTitle: {
    fontSize: 16,
    fontWeight: '600',
  },

  expenseCategory: {
    marginTop: 4,
    textTransform: 'capitalize',
    color: '#666',
  },

  expenseRight: {
    alignItems: 'flex-end',
  },

  expenseAmount: {
    fontWeight: '700',
    marginBottom: 5,
  },

  removeText: {
    textDecorationLine: 'underline',
  },

  emptyText: {
    textAlign: 'center',
    color: '#666',
    marginTop: 10,
  },
});