import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { UserReducer } from "./user";
import { CommonReducer } from "./common";

const rootReducer = combineReducers({
  common: CommonReducer,
  user: UserReducer
});

const store = configureStore({
  reducer: rootReducer
});
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

// Define the AppDispatch type
export type AppDispatch = typeof store.dispatch;

export default store;
