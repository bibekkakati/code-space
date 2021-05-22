import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router";
import { MODES_LIST } from "../../constants/Modes";
import { updateCodeSpaceMode } from "../../firebase/actions";
import actions from "../../store/actions";
import styles from "./ModeMenu.module.css";

function ModeMenu({ setMode, showModeMenu }) {
	const params = useParams();
	const menuRef = useRef();

	useEffect(() => {
		document.addEventListener("mousedown", handleClick);
		return () => {
			document.removeEventListener("mousedown", handleClick);
		};
	});

	const handleClick = (e) => {
		if (menuRef.current.contains(e.target)) {
			// inside click
			return;
		}
		// outside click
		showModeMenu();
	};

	const onModeSelect = async (index) => {
		setMode(MODES_LIST[index]);
		showModeMenu();
		try {
			await updateCodeSpaceMode(params.csId, MODES_LIST[index]);
		} catch (error) {
			console.error("onModeSelect > updateCodeSpaceMode: ", error);
		}
	};

	return (
		<div className={styles.main} ref={menuRef}>
			{MODES_LIST.map((mode, index) => {
				return (
					<p
						className={styles.mode}
						key={index}
						onClick={() => onModeSelect(index)}
					>
						{mode.caption}
					</p>
				);
			})}
		</div>
	);
}

const mapStateToProps = (state) => ({
	...state,
});

const mapDispatchToProps = (dispatch) => ({
	setMode: (payload) => dispatch(actions.setMode(payload)),
	showModeMenu: () => dispatch(actions.showModeMenu()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ModeMenu);
