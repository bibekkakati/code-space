import React from "react";
import Editor from "../components/Editor/Editor";
import styles from "../styles/EditorPage.module.css";

export default function EditorPage() {
	return (
		<div className={styles.main}>
			<div className={styles.titleBar}>
				<p className={styles.title}>~ Code Space ~</p>
			</div>
			<div className={styles.editor}>
				<Editor />
			</div>
		</div>
	);
}
