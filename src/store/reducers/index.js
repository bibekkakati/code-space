import { combineReducers } from "redux";
import mode from "./mode";
import cursorPosition from "./cursorPosition";
import modeMenu from "./modeMenu";

export default combineReducers({
	mode,
	cursorPosition,
	modeMenu,
});
