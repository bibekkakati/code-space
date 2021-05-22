import { SET_CURSOR_POSITION } from "../../constants/StoreActionTypes";

const setCursorPosition = (payload) => ({
	type: SET_CURSOR_POSITION,
	payload,
});

export default setCursorPosition;
