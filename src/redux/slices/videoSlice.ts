import {createSlice} from "@reduxjs/toolkit";

const videoSlice = createSlice({
    name: "video",
    initialState: {
        details: undefined,
        isLoading: false,
        isError: false,
    },
    reducers: {}
})

const videoReducer = videoSlice.reducer
export default videoReducer