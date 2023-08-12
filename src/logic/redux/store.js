import { configureStore } from '@reduxjs/toolkit'
import usersSlice  from './slices/usersSlice'
import rolesSlice from './slices/rolesSlice'

export default configureStore({
  reducer: {
    users: usersSlice,
    roles: rolesSlice,
  },
})
