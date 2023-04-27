import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserDetails {
  name: string;
  isVerified: boolean;
  email: string;
}
interface UserState {
  token: string | null;
  user: UserDetails | null;
}

type UserReducers = {
  setToken: (state: UserState, action: PayloadAction<string>) => void;
  setUser: (state: UserState, action: PayloadAction<UserDetails>) => void;
  signOut: (state: UserState) => void;
};

const initialState = { token: null, user: null };

export const userSlice = createSlice<UserState, UserReducers>({
  name: "user",
  initialState: initialState,
  reducers: {
    setToken: (state, { payload: token }) => {
      state.token = token;
    },
    setUser: (state, { payload: user }) => {
      state.user = user;
    },
    signOut: state => {
      state.token = null;
      state.user = null;
    }
  }
});

export const { setToken, setUser, signOut } = userSlice.actions;
export const UserReducer = userSlice.reducer;
