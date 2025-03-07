import { configureStore } from "@reduxjs/toolkit";
import user from "./slices/userSlice.ts"
import contacts from "./slices/contactsSlice.ts";
import messages from "./slices/messageSlice.ts"
import socketReducer from "./slices/socketSlice.ts"
import themeReduccer from "./slices/themeSlice.ts"

const store = configureStore({
  reducer: {
    user: user,
    contacts: contacts,
    messages: messages,
    socket: socketReducer,
    theme: themeReduccer
  },
});

// Define RootState and AppDispatch types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch
export default store;
