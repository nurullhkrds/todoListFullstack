import { configureStore } from '@reduxjs/toolkit'
import todoSlice from './slice/todoSlice'
import categorySlice from './slice/categorySlice'
import userSlice from './slice/userSlice'

export default configureStore({
  reducer: {
    todo: todoSlice,
    category:categorySlice,
    user:userSlice
  },
})