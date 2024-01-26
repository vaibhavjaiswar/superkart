import { createSlice } from "@reduxjs/toolkit";

type NavStateType = {
  isNavOpen: boolean
}

const initialState: NavStateType = {
  isNavOpen: false
}

const navSlice = createSlice({
  name: 'nav',
  initialState,
  reducers: {
    openNav: (state) => {
      state.isNavOpen = true
    },
    closeNav: (state) => {
      state.isNavOpen = false
    },
  },
})

const { closeNav, openNav } = navSlice.actions
const navSliceReducer = navSlice.reducer

export { closeNav, openNav, navSliceReducer }