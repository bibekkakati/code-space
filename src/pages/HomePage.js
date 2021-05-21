import React from "react";
import styles from "../styles/HomePage.module.css";
import getUserId from "../helpers/getUserId";
import getCsId from "../helpers/getCsId";
import { createCodeSpace } from "../firebase/actions";
import { useHistory } from "react-router";

export default function HomePage(props) {
	const history = useHistory();

	const openEditor = async () => {
		let userId = getUserId();
		let csId = getCsId();
		if (userId && csId) {
			try {
				csId = await createCodeSpace(csId, userId);
				// Loading the code editor with the code space id
				history.replace(`/${csId}`);
			} catch (error) {
				// Handle error in UI
				console.error("openEditor > createCodeSpace: ", error.message);
			}
		} else {
			console.error("openEditor: userId and csId missing!");
		}
	};

	return (
		<div className={styles.main}>
			<button className={styles.editorBtn} onClick={openEditor}>
				Open Editor
			</button>
		</div>
	);
}
