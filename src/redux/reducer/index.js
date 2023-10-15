import { combineReducers } from "@reduxjs/toolkit";

import userSlice from "./user";
import authSlice from "./auth";
import componentSlice from "./component";

export default combineReducers({
  user: userSlice,
  auth: authSlice,
  component: componentSlice,
});
