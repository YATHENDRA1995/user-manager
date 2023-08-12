import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  usersList: [
    {
      id: '6a57858f-9ffc-4ac3-af96-05cf223ec390',
      name: 'test',
      email: 'test@test.com',
      username: 'test',
      mobile: '9999999999',
      roleKey: 'manager',
      password: 'manager@123'
    },
    {
      id: '5f0ae0c4-7c6b-4ead-bf64-1ab8e102ad4b',
      name: 'test2',
      email: 'test2@test.com',
      username: 'test2',
      mobile: '1111111111',
      roleKey: 'softwareDeveloper',
      password: 'test@test123'
    },
  ]
}

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUser: (state, { payload }) => {
      state.usersList = [...state.usersList, payload]
    },
    editUser: (state, { payload }) => {
      const temp = state.usersList.map((item) => {
        if (item.id === payload.id) return payload;
        return item;
      })
      state.usersList = [...temp]
    },
    deleteUser: (state, { payload }) => {
      const temp = state.usersList.filter((item) => item.id !== payload.id)
      state.usersList = [...temp]
    }
  }
})

export const { addUser, editUser, deleteUser } = usersSlice.actions

export default usersSlice.reducer