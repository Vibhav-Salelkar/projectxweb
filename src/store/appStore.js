import { configureStore } from '@reduxjs/toolkit'
import useReducer from './slices/userSlice.js';
import feedReducer from './slices/feedSlice.js';
import requestReducer from './slices/requestsSlice.js';
import connectionReducer from './slices/connectionSlice.js';    

export const store = configureStore({
    reducer: {
        user: useReducer,
        feed: feedReducer,
        request: requestReducer,
        connection: connectionReducer
    }
})
