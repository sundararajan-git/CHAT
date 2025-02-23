import { configureStore } from "@reduxjs/toolkit";
import user from "./slices/userSlice.js"
import contacts from "./slices/contactsSlice.js";
import message from "./slices/messageSlice.js"
import socketReducer from "./slices/socketSlice.js"

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
