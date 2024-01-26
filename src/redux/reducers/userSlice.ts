import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type UserStateType = {
  name: string | null
  email: string | null
  navRef: React.MutableRefObject<HTMLElement | null> | null,
}

const initialState: UserStateType = {
  name: null,
  email: null,
  navRef: null,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ name: string, email: string }>) => {
      state.name = action.payload.name
      state.email = action.payload.email
    },
    removeUser: (state) => {
      state.name = null
      state.email = null
    },
    setAdmin: (state, action: PayloadAction<{ email: string }>) => {
      state.name = 'Administrator'
      state.email = action.payload.email
    },
    removeAdmin: (state) => {
      state.name = null
      state.email = null
    },
  },
})

const { removeAdmin, removeUser, setAdmin, setUser } = userSlice.actions
const userSliceReducer = userSlice.reducer

export { removeAdmin, removeUser, setAdmin, setUser, userSliceReducer }