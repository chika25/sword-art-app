import { configureStore } from '@reduxjs/toolkit';
import charactersReducer from './Slices/characterSlice';
//Redux store is a single source of truth for the application state
//Note: we can still combine react useState and redux store
//that we don't share and that is managed by component itself, we can use simple useState
//1: We need to create the store
//2. We need to provide redux store to react 
export default configureStore({
  reducer: {
    characters: charactersReducer
  },
})