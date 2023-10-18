import { configureStore } from "@reduxjs/toolkit";
import cellsReducer from "../features/cellsSlice";

export const store = configureStore({
  reducer: {
    cells: cellsReducer,
  },
});
