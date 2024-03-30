import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    courseName: "",
};

const courseNameSlice = createSlice({
    name: "courseName",
    initialState,
    reducers: {
        saveCourseName: (state, action) => {
            if (action.payload) {
                state.courseName = action.payload;
            }
        },
        resetCourseName: (state) => {
            state = initialState;
        },
    },
});

export const selectCourseName = (state: any) => state.courseName;

export const { saveCourseName, resetCourseName } = courseNameSlice.actions;

export const courseNameReducer = courseNameSlice.reducer;
