import { createSlice } from '@reduxjs/toolkit'

export const connectionSlice = createSlice({
    name: 'connection',
    initialState: null,
    reducers: {
        addConnections: (state, action) => {
            return action.payload
        },
        removeConnections: () => {
            return null
        }
    },
})

// Action creators are generated for each case reducer function
export const { addConnections, removeConnections } = connectionSlice.actions

export default connectionSlice.reducer
