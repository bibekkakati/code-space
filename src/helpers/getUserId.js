import { nanoid } from "nanoid";

export default function getUserId() {
	let id = window.localStorage.getItem("user_id");
	if (id) {
		return id;
	}
	id = nanoid();
	window.localStorage.setItem("user_id", id);
	return id;
}
