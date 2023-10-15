import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  guest: {
    data: null,
    isVisited: false,
    msg: null,
  },
  login: {
    data: null,
  },
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    guest: (prevState, action) => {
      return {
        ...prevState,
        guest: {
          data: action.payload,
          isVisited: true,
          msg: "Welcome to RAGTECH",
        },
      };
    },
    cdGuest: (prevState) => {
      return {
        ...prevState,
        guest: {
          data: null,
          isVisited: false,
          msg: null,
        },
      };
    },
    login: (prevState, action) => {
      return {
        ...prevState,
        login: {
          data: action.payload,
        },
      };
    },
  },
});

export const authAction = {
  ...authSlice.actions,
};

export default authSlice.reducer;
