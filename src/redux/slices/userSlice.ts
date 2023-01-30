import {createSlice} from "@reduxjs/toolkit"
import { TChannelUser } from "../../components/Card"
import { rootState } from "../store"

const userSlice = createSlice({
    name: "user",
    initialState: {
        details: undefined as TChannelUser|undefined,
        isLoading: false,
        isError: false
    },
    reducers: {
        // overall update
        startSignIn: (state) => {
            state.isLoading=true
        },
        setUser: (state, action: {payload: TChannelUser, type: string}) => {
            state.isLoading=false
            state.details = action.payload
        },
        endSignIn: (state)=>{
            state.isLoading=true
        },
        signOut: (state)=>{
            state.details=undefined
            state.isLoading = false;
        },
        subs: (state, action:{type: string, payload: string})=>{
            // if subscribed, un-subscribe
            if (state.details?.subscribedUsers.includes(action.payload)){
                state.details.subscribedUsers.splice(
                    state.details.subscribedUsers.indexOf(action.payload), 1
                )
            }else {
                // else subscribe
                state.details?.subscribedUsers.push(action.payload)
            }
        }
    }
})

// selectors
export const getCurrentUser = (state: rootState)=>state.user

// actions
export const {startSignIn, setUser, signOut, endSignIn, subs} = userSlice.actions;

// reducer
const userReducer = userSlice.reducer
export default userReducer;