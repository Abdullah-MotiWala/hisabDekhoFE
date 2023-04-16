import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ALERT_PROPS {
  title: string;
  message: string;
  icon: string;
}
interface CommonState {
  title: string;
  message: string;
  icon: string;
}

type CommonReducers = {
  setAlert: (state: CommonState, action: PayloadAction<ALERT_PROPS>) => void;
};

export const commonSlice = createSlice<CommonState,CommonReducers>({
  name: "common",
  initialState: {
    title: "",
    message: "",
    icon: ""
  },
  reducers: {
    setAlert: (
      state,
      { payload: { title, message, icon } }: PayloadAction<ALERT_PROPS>
    ) => {
      state.title = title;
      state.message = message;
      state.icon = icon;
    }
  }
});

export const { setAlert } = commonSlice.actions;
export const CommonReducer = commonSlice.reducer;
