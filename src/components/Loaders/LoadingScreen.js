import React from "react";
import styles from "./LoadingScreen.module.css";

export default function LoadingScreen({ text = "" }) {
	return (
		<div className={styles.main}>
			<p className={styles.text}>{text}</p>
		</div>
	);
}
