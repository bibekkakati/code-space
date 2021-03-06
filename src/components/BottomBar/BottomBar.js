import React from "react";
import { connect } from "react-redux";
import actions from "../../store/actions";
import styles from "./BottomBar.module.css";

const BottomBar = ({ prettify, cursorPosition, mode, showModeMenu }) => {
	return (
		<div className={styles.main}>
			<div className={styles.leftSection}>
				<p className={styles.actionBtn}>Share</p>
			</div>
			<div className={styles.rightSection}>
				<p className={styles.actionBtn}>
					Ln {cursorPosition.row + 1}, Col {cursorPosition.column + 1}
				</p>
				<p className={styles.actionBtn} onClick={showModeMenu}>
					{mode.caption}
				</p>
				<p className={styles.actionBtn} onClick={prettify}>
					Prettify
				</p>
				<p className={styles.actionBtn}>Notification</p>
			</div>
		</div>
	);
};

const mapStateToProps = (state) => ({
	...state,
});

const mapDispatchToProps = (dispatch) => ({
	showModeMenu: () => dispatch(actions.showModeMenu()),
});

export default connect(mapStateToProps, mapDispatchToProps)(BottomBar);
