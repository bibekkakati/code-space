import { SET_MODE } from "../../constants/ActionTypes";

let initialState = {};

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
