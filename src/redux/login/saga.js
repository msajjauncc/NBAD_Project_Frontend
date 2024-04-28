import { takeEvery, put } from "redux-saga/effects";
// call, delay, fork, put, take,
import callApi from "../../helpers/api";
import actions from "../actions";
import Helper from "../../helpers/helper";

function saveUser(data, payload) {
    let user = data.user;
    user.authToken = data.token;
    user.refreshToken = data.refreshToken;
    user.password = payload.password;
    Helper.setItem("user", user)
    Helper.setItem("TOKEN", data.token)
    Helper.setItem("REFRESH_TOKEN", data.refreshToken)
    return user
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}


function* signIn(request) {
    let payload = request.payload;
    let response;
    try {
        response = yield callApi("POST", "/auth/login", payload);
        if (response.status === 200) {
            let user = saveUser(response.data, payload)
            Helper.sendNotification("success", capitalizeFirstLetter(user.name) + "  sign in successfullly");
            yield put({ type: actions.SIGN_SUCCESS, payload: { user } });
        }
        else {
            Helper.sendNotification("error", response?.data?.message || "Failed to sign in")
            yield put({ type: actions.LOGIN_REQUEST_FAILED });
        }

    } catch (err) {
        Helper.sendNotification("error", response?.data?.message || "Failed to sign in")
        yield put({ type: actions.LOGIN_REQUEST_FAILED });
        console.log("Failure in login flow", err);

    }
}

function* signup(request) {
    let payload = request.payload;
    let response
    try {
        response = yield callApi("POST", "/auth/register", payload);
        if (response.status === 200) {
            let user = saveUser(response.data, payload)
            Helper.sendNotification("success", capitalizeFirstLetter(payload.name) + "  sign in successfullly");
            yield put({ type: actions.SIGN_UP_SUCCESS, payload: { user } });

        }
        else {
            Helper.sendNotification("error", response?.data?.message || "Failed to sign up")
            yield put({ type: actions.LOGIN_REQUEST_FAILED });
        }


    } catch (err) {
        Helper.sendNotification("error", err?.response?.data?.message || "Failed to sign up")
        yield put({ type: actions.LOGIN_REQUEST_FAILED });
        console.log("Failure in sign up flow", err);

    }
}


function* refreshToken() {
    let response;
    try {
        let payload = { refreshToken: Helper.getItem("refreshToken") }
        response = yield callApi("POST", "/auth/getAcessToken", payload);
        if (response?.status === 200) {
            const { token } = response.data;
            let user = Helper.getItem("user");
            user = saveUser({ user, token, refreshToken: user.refreshToken }, { password: user.password })
            Helper.sendNotification("success", "Refreshed token")
            yield put({ type: actions.REFRESH_TOKEN_SUCCESS, payload: { user } });
        }
        else {
            yield put({ type: actions.LOGOUT });
        }

    } catch (err) {
        yield put({ type: actions.LOGOUT });
        console.log("Failure in refreshToken flow", err);

    }
}

export default function* rootSaga() {
    yield takeEvery(actions.SIGN_IN, signIn);
    yield takeEvery(actions.SIGN_UP, signup);
    yield takeEvery(actions.REFRESH_TOKEN, refreshToken)
}