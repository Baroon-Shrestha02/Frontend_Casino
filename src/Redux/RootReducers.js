import { combineReducers } from "redux";
import userReducer from "./Slices/UserSlice";

const rootReducer = combineReducers({
  user: userReducer,
});

export default rootReducer;
