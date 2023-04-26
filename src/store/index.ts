import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { UserReducer } from "./user";
import { CommonReducer } from "./common";
import { persistReducer, persistStore } from "redux-persist";


const persistConfig = {
  key: "root",
  storage
};
const rootReducer = combineReducers({
  common: CommonReducer,
  user: UserReducer
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer
});
export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

// Define the AppDispatch type
export type AppDispatch = typeof store.dispatch;

export default store;
