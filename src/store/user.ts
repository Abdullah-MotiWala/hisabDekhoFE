import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  token: string | null;
}

type UserReducers = {
  setToken: (state: UserState, action: PayloadAction<string>) => void;
  signOut: (state: UserState) => void;
};

const initialState = { token: null };

export const userSlice = createSlice<UserState, UserReducers>({
  name: "user",
  initialState: initialState,
  reducers: {
    setToken: (state, { payload: token }) => {
      state.token = token;
    },
    signOut: state => {
      state.token = null;
    }
  }
});

export const { setToken, signOut } = userSlice.actions;
export const UserReducer = userSlice.reducer;
