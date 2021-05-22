import React from "react";
import { connect } from "react-redux";
import Editor from "../components/Editor/Editor";
import ModeMenu from "../components/ModeMenu/ModeMenu";
import styles from "../styles/EditorPage.module.css";

function EditorPage({ modeMenu }) {
	return (
		<div className={styles.main}>
			{modeMenu.show && <ModeMenu />}
			<div className={styles.titleBar}>
				<p className={styles.title}>~ Code Space ~</p>
			</div>
			<div className={styles.editor}>
				<Editor />
			</div>
		</div>
	);
}

const mapStateToProps = (state) => ({
	...state,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(EditorPage);
