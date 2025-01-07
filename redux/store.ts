import { configureStore } from "@reduxjs/toolkit";
import commentsSlice from './slice'

export const store = configureStore({
  reducer: {commentsSlice},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;