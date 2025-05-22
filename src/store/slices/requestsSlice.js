import { createSlice } from '@reduxjs/toolkit'

export const requestSlice = createSlice({
    name: 'request',
    initialState: null,
    reducers: {
        addRequests: (state, action) => {
            return action.payload
        },
        removeRequests: (state, action) => {
            return state.filter((request) => request._id !== action.payload)
        }
    },
})

// Action creators are generated for each case reducer function
export const { addRequests, removeRequests } = requestSlice.actions

export default requestSlice.reducer
