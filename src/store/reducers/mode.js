import { SET_MODE } from "../../constants/StoreActionTypes";
import { PLAIN_TEXT_MODE } from "../../constants/Modes";

let initialState = PLAIN_TEXT_MODE;

const mode = (state = initialState, action) => {
	switch (action.type) {
		case SET_MODE:
			return {
				...action.payload,
			};
		default:
			return state;
	}
};

export default mode;
