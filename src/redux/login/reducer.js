import { createSlice } from '@reduxjs/toolkit'

let initialState = {
    isLoading: false,
    user: undefined,
    operationType: undefined,
}
export const loginSlice = createSlice({
    name: 'login',
    initialState: initialState,
    reducers: {
        signUp: (state, action) => {
            state.isLoading = true
        },
        setUser: (state, action) => {
            state.user = action.payload.user
        },
        signUpSuccess: (state, action) => {
            state.isLoading = false;
            state.user = action.payload.user
            state.operationType = "SIGN_UP_SUCCESS";
        },
        signIn: (state, action) => {
            state.isLoading = true
        },
        logout: (state, action) => {
            Object.assign(state, initialState);
            state.operationType = "LOGOUT"
        },
        requestFailed: (state, action) => {
            state.isLoading = false
            state.operationType = action.payload?.operationType || undefined
        },
        loginSuccess: (state, action) => {
            state.isLoading = false;
            state.user = action.payload.user
            state.operationType = "SIGN_SUCCESS";
        },
        resetOperationType: (state, action) => {
            state.operationType = undefined
        },
        refreshToken: (state, action) => {
        },
        refreshTokenSuccess: (state, action) => {
            state.user = action.payload.user
        }

    }
})

export const { signUp, signUpSuccess, signIn,
    requestFailed, logout, loginSuccess, logoutSuccess,
    resetOperationType, refreshToken,
    setUser
} = loginSlice.actions

export default loginSlice.reducer