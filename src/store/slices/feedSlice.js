import { createSlice } from '@reduxjs/toolkit'

export const feedSlice = createSlice({
    name: 'feed',
    initialState: [],
    reducers: {
        addFeed: (state, action) => {
            return action.payload
        },
        removeFeed: (state, action) => {
            return state.filter((feed) => feed._id !== action.payload)
        }
    },
})

// Action creators are generated for each case reducer function
export const { addFeed, removeFeed } = feedSlice.actions

export default feedSlice.reducer
