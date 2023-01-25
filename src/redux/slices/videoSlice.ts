import {createSlice} from "@reduxjs/toolkit";
import { TVideos } from "../../pages/HomePage";
import { rootState } from "../store";

const videoSlice = createSlice({
    name: "video",
    initialState: {
        currVideo: null as unknown as TVideos,
        isLoading: false,
        isError: false,
    },
    reducers: {
        fetchVideoStart : (state)=>{
            state.isLoading = true
        },
        fetchVideoSuccess: (state, action:{type: string, payload: TVideos})=>{
            state.isLoading= false,
            state.currVideo = action.payload
        },
        fetchVideoFailed: (state)=>{
            state.isLoading= false,
            state.isError = true
        }
    }
})

// export actions
export const {fetchVideoFailed, fetchVideoStart, fetchVideoSuccess} = videoSlice.actions

// export selectors
export const getVideo = (state: rootState)=>state.video

// export reducer
const videoReducer = videoSlice.reducer
export default videoReducer