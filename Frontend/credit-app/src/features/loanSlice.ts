import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LoanState {
  borrowerId?: string;
  fullname?: string;
  amount?: number; // Use 'number' instead of 'Number'
  tenure?: number;
  reason?: string;
  status?: string;
  address?: string;
  action?: string;
}

interface LoanSliceState {
  loan: LoanState;
}

const initialState: LoanSliceState = {
  loan: {},
};

const loanSlice = createSlice({
  name: "loan",
  initialState,
  reducers: {
    setLoan: (state, action: PayloadAction<LoanState>) => {
      state.loan = action.payload;
    },
    clearLoan: (state) => {
      state.loan = {};
    },
  },
});

export const { setLoan, clearLoan } = loanSlice.actions;
export default loanSlice.reducer;
