import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface message {
    _id: string,
    text: string,
    image: string
}

const initialState: message[] = [];


const messageSlice = createSlice({
    name: "message",
    initialState: initialState,
    reducers: {
        setmessage: (_, action: PayloadAction<message[]>) => {
            return action.payload;
        },
        addMessage: (state, action: PayloadAction<message>) => {
            state.push(action.payload);
        },
        updateMessage: (state, action: PayloadAction<message>) => {
            const index = state.findIndex((p) => p._id === action.payload._id);
            if (index !== -1) {
                state[index] = { ...state[index], ...action.payload };
            }
        },
    }
})


export const { updateMessage, addMessage, setmessage } = messageSlice.actions

export default messageSlice.reducer