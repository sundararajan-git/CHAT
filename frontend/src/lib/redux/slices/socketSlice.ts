import { createSlice } from "@reduxjs/toolkit";


type socketShape = {
  socket: boolean,
  onlineUsers: string[]
}
const initialState: socketShape = {
  socket: false,
  onlineUsers: [],
};

const socketSlice = createSlice({
  name: "socket",
  initialState,
  reducers: {
    setSocket: (state, action) => {
      state.socket = action.payload;
    },
    setOnlineUsers: (state, action) => {
      state.onlineUsers = action.payload;
    },
  },
});

export const { setSocket, setOnlineUsers } = socketSlice.actions;

export default socketSlice.reducer;
