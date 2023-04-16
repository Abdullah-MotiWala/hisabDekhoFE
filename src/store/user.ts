import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  token: string | null;
}

type UserReducers = {
  setToken: (state: UserState, action: PayloadAction<string>) => void;
};

export const userSlice = createSlice<UserState, UserReducers>({
  name: "user",
  initialState: { token: null },
  reducers: {
    setToken: (state, { payload: token }) => {
      state.token = token;
    }
  }
});

export const { setToken } = userSlice.actions;
export const UserReducer = userSlice.reducer;
