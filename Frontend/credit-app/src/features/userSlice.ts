import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  user: {
    id?: string;
    username?: string;
    email?: string;
  };
}

const initialState: UserState = {
  user: {},
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState["user"]>) => {
      state.user = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
