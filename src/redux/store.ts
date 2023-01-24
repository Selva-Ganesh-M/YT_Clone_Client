import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";

export const store = configureStore({
    reducer: {
        user: userReducer
    }
})


export type rootState = ReturnType<typeof store.getState>
export type appDispatch = typeof store.dispatch