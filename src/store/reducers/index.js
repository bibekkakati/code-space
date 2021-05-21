import { combineReducers } from "redux";
import mode from "./mode";
import cursorPosition from "./cursorPosition";

export default combineReducers({
	mode,
	cursorPosition,
});
