import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    email: "",
    password: "",
    callbackUrl: "",
};

const twoFactorAuthenticationSlice = createSlice({
    name: "twoFactorAuthentication",
    initialState,
    reducers: {
        saveDataForTwoFactorAuthentication: (state, action) => {
            const { email, password, callbackUrl } = action.payload;
            state.email = email;
            state.password = password;
            state.callbackUrl = callbackUrl;
        },
        resetDataForTwoFactorAuthentication: (state) => {
            state = initialState;
        },
    },
});

export const selectDataForTwoFactorAuthentication = (state: any) =>
    state.twoFactorAuthentication;

export const {
    saveDataForTwoFactorAuthentication,
    resetDataForTwoFactorAuthentication,
} = twoFactorAuthenticationSlice.actions;

export const twoFactorAuthenticationReducer =
    twoFactorAuthenticationSlice.reducer;
