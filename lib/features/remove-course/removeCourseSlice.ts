import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    courseId: "",
};

const removeCourseSlice = createSlice({
    name: "removeCourse",
    initialState,
    reducers: {
        saveCourseId: (state, action) => {
            if (action.payload) {
                state.courseId = action.payload;
            }
        },
        resetCourseId: (state) => {
            state = initialState;
        },
    },
});

export const selectCourseId = (state: any) => state.removeCourse.courseId;

export const { saveCourseId, resetCourseId } = removeCourseSlice.actions;

export const removeCourseReducer = removeCourseSlice.reducer;
