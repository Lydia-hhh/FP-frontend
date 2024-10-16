import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";
import FPReducer from './features/FPSlice'

export const store=configureStore({
    reducer:{FPReducer}
})
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;