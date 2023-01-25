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
        },
        like: (state, action:{type:string, payload:string})=>{
            // adding new id to likes without creating duplicates
            if (!state.currVideo.likes.includes(action.payload)){
                state.currVideo.likes.push(action.payload)
            }
            // removing id from dislikes
            state.currVideo.dislikes.splice(
                state.currVideo.dislikes.indexOf(action.payload),
                1
                )
            },
            dislike: (state, action:{type:string, payload:string})=>{
                // adding new id without creating duplicates
                if (!state.currVideo.dislikes.includes(action.payload)){
                    state.currVideo.dislikes.push(action.payload)
                }
                // removing id from likes
            state.currVideo.likes.splice(
                state.currVideo.likes.indexOf(action.payload),
                1
            )
        }
    }
})

// export actions
export const {fetchVideoFailed, fetchVideoStart, fetchVideoSuccess, like, dislike} = videoSlice.actions

// export selectors
export const getVideo = (state: rootState)=>state.video

// export reducer
const videoReducer = videoSlice.reducer
export default videoReducer