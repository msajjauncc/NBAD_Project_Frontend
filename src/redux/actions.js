const actions = {
    SIGN_IN: "login/signIn",
    SIGN_SUCCESS: "login/loginSuccess",
    SIGN_UP: "login/signUp",
    SIGN_UP_SUCCESS: "login/signUpSuccess",
    LOGOUT: "login/logout",
    LOGIN_REQUEST_FAILED: "login/requestFailed",
    REFRESH_TOKEN: "login/refreshToken",
    REFRESH_TOKEN_SUCCESS: "login/refreshTokenSuccess",



    BUDGET_REQUEST_FAILED: "budget/requestFailed",
    ADD_BUDGET: "budget/addBudget",
    ADD_BUDGET_SUCCESS: "budget/addBudgetSuccess",
    GET_ALL_BUDGET: "budget/getAllBudget",
    GET_ALL_BUDGET_SUCCESS: "budget/getAllBudgetSuccess",
    DELETE_BUDGET: "budget/deleteBudget",
    DELETE_BUDGET_SUCCESS: "budget/deleteBudgetSuccess",
    ADD_EXPENSE: "budget/addExpense",
    ADD_EXPENSE_SUCCESS: "budget/addExpenseSuccess",
    GET_ALL_EXPENSE: "budget/getAllExpense",
    GET_ALL_EXPENSE_SUCCESS: "budget/getAllExpenseSuccess",
    DELETE_EXPENSE: "budget/deleteExpense",
    DELETE_EXPENSE_SUCCESS: "budget/deleteExpenseSuccess",
}
export default actions;