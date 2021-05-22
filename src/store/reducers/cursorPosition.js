import { SET_CURSOR_POSITION } from "../../constants/StoreActionTypes";

let initialState = {
	row: 0,
	column: 0,
};

const cursorPosition = (state = initialState, action) => {
	switch (action.type) {
		case SET_CURSOR_POSITION:
			const { row, column } = action.payload;
			return {
				row,
				column,
			};
		default:
			return state;
	}
};

export default cursorPosition;
