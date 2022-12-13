import { configureStore } from '@reduxjs/toolkit'
import userReducer from './User/UserSlice'
import workoutsReducer from './Workouts/WorkoutsSlice'

export const Store = configureStore({
   reducer: {
      user: userReducer,
      workouts: workoutsReducer,
   }
})