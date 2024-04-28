import { takeEvery, put } from "redux-saga/effects";
// call, delay, fork, put, take,
import callApi from "../../helpers/api";
import actions from "../actions";
import Helper from "../../helpers/helper";


function* addExpense(request) {
    let payload = request.payload;
    let response;
    payload.userId = Helper.getUserId();
    if (!payload.userId) {
        Helper.sendNotification("error", response?.data?.message || "User Id not found")
        yield put({ type: actions.BUDGET_REQUEST_FAILED });
        return;
    }
    try {
        response = yield callApi("POST", "/budget/addExpense", payload);
        if (response.status === 200) {
            if (payload._id) {
                Helper.sendNotification("success", "Expense edited successfully");
            }
            else {
                Helper.sendNotification("success", "Expense added successfully");
            }

            yield put({ type: actions.ADD_EXPENSE_SUCCESS, payload: { payload } });
        }
        else {
            Helper.sendNotification("error", response?.data?.message || "Failed to add expense")
            yield put({ type: actions.BUDGET_REQUEST_FAILED });
        }

    } catch (err) {
        Helper.sendNotification("error", response?.data?.message || "Failed to add expense")
        yield put({ type: actions.BUDGET_REQUEST_FAILED });
        console.log("Failure in add expnse flow", err);

    }
}

function* getAllExpense() {
    let payload = {};
    let response;
    try {
        response = yield callApi("GET", "/budget/getAllExpense", payload);
        if (response.status === 200) {
            yield put({ type: actions.GET_ALL_EXPENSE_SUCCESS, payload: { expenses: response.data.expenses } });
        }
        else {
            Helper.sendNotification("error", response?.data?.message || "Failed to get all expense")
            yield put({ type: actions.BUDGET_REQUEST_FAILED });
        }

    } catch (err) {
        Helper.sendNotification("error", response?.data?.message || "Failed to get all expense")
        yield put({ type: actions.BUDGET_REQUEST_FAILED });
        console.log("Failure in get all  expense flow", err);

    }
}

function* deleteExpense(request) {
    let payload = { expenseId: request.payload._id };
    let response;
    try {
        response = yield callApi("Delete", "/budget/deleteExpense", payload);
        if (response.status === 200) {
            Helper.sendNotification("success", "Expense deleted successfully");
            yield put({ type: actions.DELETE_EXPENSE_SUCCESS, payload: {} });
        }
        else {
            Helper.sendNotification("error", response?.data?.message || "Failed to delete Expense")
            yield put({ type: actions.BUDGET_REQUEST_FAILED });
        }

    } catch (err) {
        Helper.sendNotification("error", response?.data?.message || "Failed to delete Expense")
        yield put({ type: actions.BUDGET_REQUEST_FAILED });
        console.log("Failure in delete budget flow", err);

    }
}

function* addBudget(request) {
    let payload = request.payload;
    payload.userId = Helper.getUserId();
    if (!payload.userId) {
        Helper.sendNotification("error", response?.data?.message || "User Id not found")
        yield put({ type: actions.BUDGET_REQUEST_FAILED });
        return;
    }
    let response;
    try {
        response = yield callApi("POST", "/budget/addBudget", payload);
        if (response.status === 200) {
            if (payload._id) {
                Helper.sendNotification("success", "Budget edited successfully");
            }
            else {
                Helper.sendNotification("success", "Budget added successfully");
            }
            yield put({ type: actions.ADD_BUDGET_SUCCESS, payload: { budget: response.data.savedCategory } });
        }
        else {
            Helper.sendNotification("error", response?.data?.message || "Failed to add Budget")
            yield put({ type: actions.BUDGET_REQUEST_FAILED });
        }

    } catch (err) {
        Helper.sendNotification("error", response?.data?.message || "Failed to add Budget")
        yield put({ type: actions.BUDGET_REQUEST_FAILED });
        console.log("Failure in add budget flow", err);

    }
}

function* getAllBudget() {
    let payload = {};
    let response;
    try {
        response = yield callApi("GET", "/budget/getAllBudget", payload);
        if (response.status === 200) {
            yield put({ type: actions.GET_ALL_BUDGET_SUCCESS, payload: { budgets: response.data.categories } });
        }
        else {
            Helper.sendNotification("error", response?.data?.message || "Failed to get all Budget")
            yield put({ type: actions.BUDGET_REQUEST_FAILED });
        }

    } catch (err) {
        Helper.sendNotification("error", response?.data?.message || "Failed to get all Budget")
        yield put({ type: actions.BUDGET_REQUEST_FAILED });
        console.log("Failure in get all  budget flow", err);

    }
}

function* deleteBudget(request) {
    let payload = { categoryId: request.payload._id };
    let response;
    try {
        response = yield callApi("Delete", "/budget/deleteBudget", payload);
        if (response.status === 200) {
            Helper.sendNotification("success", "Budget deleted successfully");
            yield put({ type: actions.DELETE_BUDGET_SUCCESS, payload: {} });
        }
        else {
            Helper.sendNotification("error", response?.data?.message || "Failed to delete Budget")
            yield put({ type: actions.BUDGET_REQUEST_FAILED });
        }

    } catch (err) {
        Helper.sendNotification("error", response?.data?.message || "Failed to delete Budget")
        yield put({ type: actions.BUDGET_REQUEST_FAILED });
        console.log("Failure in delete budget flow", err);

    }
}

export default function* rootSaga() {
    yield takeEvery(actions.ADD_BUDGET, addBudget);
    yield takeEvery(actions.GET_ALL_BUDGET, getAllBudget);
    yield takeEvery(actions.DELETE_BUDGET, deleteBudget);

    yield takeEvery(actions.ADD_EXPENSE, addExpense);
    yield takeEvery(actions.GET_ALL_EXPENSE, getAllExpense)
    yield takeEvery(actions.DELETE_EXPENSE, deleteExpense)

}