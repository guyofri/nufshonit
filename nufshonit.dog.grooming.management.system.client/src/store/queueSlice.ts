import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IBarberQueue } from "../models/queue";

interface QueueState {
    filteredList: IBarberQueue[];
}

const initialState: QueueState = {
    filteredList: [],
};

const queueSlice = createSlice({
    name: "queue",
    initialState,
    reducers: {
        setFilteredList(state, action: PayloadAction<IBarberQueue[]>) {
            state.filteredList = action.payload;
        },
    },
});

export const { setFilteredList } = queueSlice.actions;

export default queueSlice.reducer;
