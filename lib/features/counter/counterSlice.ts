import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    count: 0,
};

const counterSlice = createSlice({
    name: "counter",
    initialState,
    reducers: {
        increment: (state) => {
            state.count += 1;
        },
        reset: (state) => {
            state.count = 0;
        },
    },
});

export const selectCounter = (state: any) => state.counter.count;

export const { increment, reset } = counterSlice.actions;

export const counterReducer = counterSlice.reducer;
