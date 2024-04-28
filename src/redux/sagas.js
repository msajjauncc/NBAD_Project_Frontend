import { all } from "redux-saga/effects";
import loginSaga from "./login/saga";
import budgetSaga from "./budget/saga";


export default function* rootSaga(getState) {
    yield all([
        loginSaga(),
        budgetSaga()
    ]);
}