import { customAlphabet } from "nanoid";

export default function getCsId() {
	const nanoid = customAlphabet(
		"1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
		10
	);
	return nanoid();
}
