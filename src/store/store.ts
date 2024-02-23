import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "../slices/usersDetail";
const store = configureStore({
  reducer: { userData: userReducer },
});
export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
