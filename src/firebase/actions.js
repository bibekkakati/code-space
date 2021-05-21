import firebase from "firebase";
import { db } from "../services/firebase";

const CODE_SPACE = "CodeSpaces/";
const CODE_SPACE_ACTION = "CodeSpaceActions/";

export const createCodeSpace = (csId, userId) => {
	return new Promise((resolve, reject) => {
		if (csId && userId) {
			db.ref(CODE_SPACE + csId).set(
				{
					userId,
					code: "",
					mode: "",
					timestamp: firebase.database.ServerValue.TIMESTAMP,
				},
				(error) => {
					if (error) {
						return reject(error.message);
					}
					return resolve(csId);
				}
			);
		} else {
			return reject("Parameter missing!");
		}
	});
};

export const updateCodeSpaceCode = (csId, code = "") => {
	return new Promise((resolve, reject) => {
		if (csId) {
			var updates = {};
			updates[CODE_SPACE + csId + "/code"] = code;
			db.ref().update(updates, (error) => {
				if (error) {
					return reject(error.message);
				}
				return resolve(csId);
			});
		} else {
			return reject("Parameter missing!");
		}
	});
};

export const updateCodeSpaceMode = (csId, mode) => {
	return new Promise((resolve, reject) => {
		if (csId && mode) {
			var updates = {};
			updates[CODE_SPACE + csId + "/mode"] = mode;
			db.ref().update(updates, (error) => {
				if (error) {
					return reject(error.message);
				}
				return resolve(csId);
			});
		} else {
			return reject("Parameter missing!");
		}
	});
};

export const updateCodeSpaceAction = (csId, action = {}) => {
	return new Promise((resolve, reject) => {
		if (csId) {
			var updates = {};
			updates[CODE_SPACE_ACTION + csId] = action;
			db.ref().update(updates, (error) => {
				if (error) {
					return reject(error.message);
				}
				return resolve(csId);
			});
		} else {
			return reject("Parameter missing!");
		}
	});
};

export const getCodeSpace = (csId, cb) => {
	db.ref(CODE_SPACE + csId).once("value", cb);
};

export const listenOnCodeSpace = (csId, cb) => {
	db.ref(CODE_SPACE + csId).on("child_changed", cb);
};

export const listenOnCodeSpaceAction = (csId, cb) => {
	db.ref(CODE_SPACE_ACTION + csId).on("value", cb);
};
