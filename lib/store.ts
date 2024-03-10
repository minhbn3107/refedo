import { configureStore } from "@reduxjs/toolkit";
import { twoFactorAuthenticationReducer } from "./features/twoFactorAuthentication/twoFactorAuthenticationSlice";
import { courseNameReducer } from "./features/courseName/courseNameSlice";

export const makeStore = () => {
    return configureStore({
        reducer: {
            twoFactorAuthentication: twoFactorAuthenticationReducer,
            courseName: courseNameReducer,
        },
    });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
