import { configureStore } from "@reduxjs/toolkit";
import user from "./SLICES/useSlice"
import contacts from "./SLICES/contactsSlice.js";
import message from "./SLICES/messageSlice.js"
import socketReducer from "./SLICES/socketSlice.js"

const store = configureStore({
  reducer: {
    user: user,
    contacts: contacts,
    message: message,
    socket: socketReducer,
  },
});

// Define RootState and AppDispatch types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch
export default store;
