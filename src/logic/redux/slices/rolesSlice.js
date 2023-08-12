import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  rolesList: [
    {
      id: '5e0f0215-41b3-4c1f-94d6-342cc1383144',
      roleKey: "manager",
      roleLabel: "Manager"
    },
    {
      id: '7ca59b90-0b7f-4b0a-8ae0-869d0da7b74b',
      roleKey: "softwareDeveloper",
      roleLabel: "Software Developer"
    }
  ]
}

export const rolesSlice = createSlice({
  name: 'roles',
  initialState,
  reducers: {
    addRole: (state, { payload }) => {
      state.rolesList = [...state.rolesList, payload]
    },
    editRole: (state, { payload }) => {
      const temp = state.rolesList.map((item) => {
        if (item.id === payload.id) return payload;
        return item;
      })
      state.rolesList = [...temp]
    },
    deleteRole: (state, { payload }) => {
      const temp = state.rolesList.filter((item) => item.id !== payload.id)
      state.rolesList = [...temp]
    }
  }
})

export const { addRole, editRole, deleteRole } = rolesSlice.actions

export default rolesSlice.reducer