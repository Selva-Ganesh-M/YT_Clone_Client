import { createSlice } from "@reduxjs/toolkit";
import { rootState } from "../store";

const modalSlice = createSlice({
    name: "modal",
    initialState: <{isOpen: Boolean}> {
        isOpen: false
    },
    reducers: {
        setModal: (state)=>{
            console.log("here");
            
            state.isOpen = !state.isOpen
        }
    }
})

// selectors
export const modalStatus = (state: rootState)=>state.modal.isOpen

// actions
export const {setModal} = modalSlice.actions


export default modalSlice.reducer