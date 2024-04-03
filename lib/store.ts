import { configureStore } from "@reduxjs/toolkit";
import { twoFactorAuthenticationReducer } from "./features/two-factor-authentication/twoFactorAuthenticationSlice";
import { courseNameReducer } from "./features/course-name/courseNameSlice";
import { removeCourseReducer } from "./features/remove-course/removeCourseSlice";

export const makeStore = () => {
    return configureStore({
        reducer: {
            twoFactorAuthentication: twoFactorAuthenticationReducer,
            courseName: courseNameReducer,
            removeCourse: removeCourseReducer,
        },
    });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
