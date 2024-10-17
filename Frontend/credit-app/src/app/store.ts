import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice";
import loanReducer from "../features/loanSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    loan: loanReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
