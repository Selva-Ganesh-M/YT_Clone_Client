import {createSlice} from "@reduxjs/toolkit"

const userSlice = createSlice({
    name: "user",
    initialState: {
        user: null,
        isLoading: false,
        isError: false
    },
    reducers: {
        startSignup: (state) => {
            state.isLoading=true
        },
        setUser: (state, action) => {
            state.isLoading=false
            state.user = action.payload
        },
        signOut: (state)=>{
            state.user=null
            state.isLoading = false;
        }
    }
})

export const {startSignup, setUser, signOut} = userSlice.actions;

const userReducer = userSlice.reducer

export default userReducer;