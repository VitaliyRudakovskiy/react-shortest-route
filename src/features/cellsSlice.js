import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cells: {
    start: [],
    finish: [],
    barriers: [],
  },
};

export const cellsSlice = createSlice({
  name: "cells",
  initialState,
  reducers: {
    addStart: (state, action) => {
      state.cells.start.push(action.payload);
    },
    clearStart: (state) => {
      state.cells.start = [];
    },
    addFinish: (state, action) => {
      state.cells.finish.push(action.payload);
    },
    addBarriers: (state, action) => {
      state.cells.barriers.push(action.payload);
    },
    clearField: (state) => {
      state.cells.start = [];
      state.cells.finish = [];
      state.cells.barriers = [];
    },
  },
});

export const { addStart, addFinish, addBarriers, clearField } =
  cellsSlice.actions;
export default cellsSlice.reducer;
