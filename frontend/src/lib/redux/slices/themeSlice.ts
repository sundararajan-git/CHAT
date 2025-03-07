import { createSlice } from "@reduxjs/toolkit"


const initialState = "light"
// const initialState = "retro"


const themeSlice = createSlice({
    name: "theme",
    initialState: initialState,
    reducers: {
        setTheme: (_, action) => {
            return action.payload
        }
    }
})

export const { setTheme } = themeSlice.actions

export default themeSlice.reducer
