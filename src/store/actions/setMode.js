import { SET_MODE } from "../../constants/StoreActionTypes";

const setMode = (payload) => ({
	type: SET_MODE,
	payload,
});

export default setMode;
