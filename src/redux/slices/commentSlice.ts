import { createSlice } from "@reduxjs/toolkit";
import { TComment } from "../../components/Comment";
import { rootState } from "../store";

export type TAction <T> = {
    type: string,
    payload: T
}

const initialState = <{list: TComment[]}>{
    list: []
}

const commentsSlice = createSlice({
    name: "comments",
    initialState,
    reducers: {
        setComments: (state, action: TAction<TComment []>)=>{
            state.list = action.payload
        },
        removeComments: (state)=>{
            state.list=[]
        },
        addComment: (state, action: TAction<TComment>)=>{
            state.list.push(action.payload)
        },
        deleteComment: (state, action: TAction<{id: string}>)=>{
            state.list = state.list.filter(item=>item._id!==action.payload.id)
        }
    }
})

// actions
export const {setComments, removeComments, addComment, deleteComment} = commentsSlice.actions

// selectors
export const getComments = (state:rootState)=>state.comments.list

// reducer export 
const commentsReducer = commentsSlice.reducer
export default commentsReducer