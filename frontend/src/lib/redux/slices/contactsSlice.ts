import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface contacts {
    _id: string
    email: string
    fullName: string
    profilePic: string
    isVerified: boolean
}

const initialState: contacts[] = [];


const contactsSlice = createSlice({
    name: "contacts",
    initialState: initialState,
    reducers: {
        setContacts: (state, action: PayloadAction<contacts[]>) => {
            return action.payload;
        },
        addContacts: (state, action: PayloadAction<contacts>) => {
            state.push(action.payload);
        },
        updateContacts: (state, action: PayloadAction<contacts>) => {
            const index = state.findIndex((p) => p._id === action.payload._id);
            if (index !== -1) {
                state[index] = { ...state[index], ...action.payload };
            }
        },
    }
})


export const { updateContacts, addContacts, setContacts } = contactsSlice.actions

export default contactsSlice.reducer