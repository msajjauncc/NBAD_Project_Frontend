import { createSlice } from '@reduxjs/toolkit'

let initialState = {
    isLoading: false,
    operationType: undefined,
    budgets: [],
    expenses: [],
    dashboardData: {}
}
export const budgetSlice = createSlice({
    name: 'budget',
    initialState: initialState,
    reducers: {
        addExpense: (state, action) => {
            state.isLoading = true
        },
        addExpenseSuccess: (state, action) => {
            state.isLoading = false
            state.operationType = "ADD_EXPENSE_SUCCESS"
        },
        requestFailed: (state, action) => {
            state.isLoading = false
            state.operationType = action.payload?.operationType || undefined
        },
        resetState: (state, action) => {
            Object.assign(state, initialState);
        },
        addBudget: (state, action) => {
            state.isLoading = true
        },
        addBudgetSuccess: (state, action) => {
            state.isLoading = false;
            state.operationType = "ADD_BUDGET_SUCCESS"
        },
        resetOperationType: (state, action) => {
            state.operationType = undefined
        },
        getAllBudget: (state, action) => {
            state.isLoading = true;
        },
        getAllBudgetSuccess: (state, action) => {
            state.isLoading = false
            state.budgets = action.payload.budgets
        },
        deleteBudget: (state, action) => {
            state.isLoading = true
        },
        deleteBudgetSuccess: (state, action) => {
            state.isLoading = false;
            state.operationType = "DELETE_BUDGET_SUCCESS"
        },
        getAllExpense: (state, action) => {
            state.isLoading = true;
        },
        getAllExpenseSuccess: (state, action) => {
            state.isLoading = false
            state.expenses = action.payload.expenses
        },
        deleteExpense: (state, action) => {
            state.isLoading = true
        },
        deleteExpenseSuccess: (state, action) => {
            state.isLoading = false;
            state.operationType = "DELETE_EXPENSE_SUCCESS"
        },

    }
})

export const { addExpense, addExpenseSuccess, resetState, addBudget, addBudgetSuccess, getAllBudget,
    resetOperationType, deleteBudget, getAllExpense, deleteExpense
} = budgetSlice.actions

export default budgetSlice.reducer