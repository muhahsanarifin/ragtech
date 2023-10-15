import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sideBar: {
    isOpen: true,
  },
};

export const componentSlice = createSlice({
  name: "component",
  initialState,
  reducers: {
    sideBar: (prevState, action) => {
      return {
        ...prevState,
        sideBar: {
          isOpen: action.payload,
        },
      };
    },
  },
});

export const componentAction = {
  ...componentSlice.actions,
};

export default componentSlice.reducer;
