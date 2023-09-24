import { configureStore } from '@reduxjs/toolkit'
import auth from './Auth'
import activate from './activate'
export const store = configureStore({
  reducer: {
    auth,
    activate
    
  },
})