import { createSlice } from "@reduxjs/toolkit";

export interface NavbarFixed {
  value: boolean;
}

const initialState: NavbarFixed = {
  value: true,
};

const navbarSlice = createSlice({
  name: "navbar-fixed",
  initialState,
  reducers: {
    makeFixed: (state) => {
      state.value = true;
    },
    makeSticky: (state) => {
      state.value = false;
    },
  },
});

export const { makeFixed, makeSticky } = navbarSlice.actions;
export default navbarSlice.reducer;
