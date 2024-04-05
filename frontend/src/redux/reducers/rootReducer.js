import { combineReducers } from "redux";
import handleUser from "../reducers/userReducer";
import roomReducer from "./roomReducer";

const rootReducer = combineReducers({
  user: handleUser,
  room: roomReducer,
});

export default rootReducer;
