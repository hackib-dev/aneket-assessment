import { combineReducers } from "@reduxjs/toolkit";
import globalStateReducer from "./slice/globalState/globalStateSlice";
import userServiceReducer from "./slice/userService/userService";

const rootReducer = combineReducers({
  globalState: globalStateReducer,
  userService: userServiceReducer,
});

export default rootReducer;
