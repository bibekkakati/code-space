import { SHOW_MODE_MENU } from "../../constants/StoreActionTypes";

let initialState = {
	show: false,
};

const modeMenu = (state = initialState, action) => {
	switch (action.type) {
		case SHOW_MODE_MENU:
			return {
				show: !state.show,
			};
		default:
			return state;
	}
};

export default modeMenu;
