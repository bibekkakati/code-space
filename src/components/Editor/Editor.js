import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router";
import styles from "./Editor.module.css";

// Side Components
import BottomBar from "../BottomBar/BottomBar";
// Ace Editor
import AceEditor from "react-ace";
import "ace-builds/webpack-resolver";
// Languages | Modes
import "ace-builds/src-noconflict/mode-plain_text";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-golang";
// Theme
import "ace-builds/src-noconflict/theme-dracula";
import "ace-builds/src-noconflict/ext-language_tools";
// Store Actions
import actions from "./../../store/actions";

import LoadingScreen from "../Loaders/LoadingScreen";
import { useEditor } from "./useEditor";

const Editor = ({ mode, setCursorPosition, setMode }) => {
	const {
		onEditorLoad,
		onCodeChange,
		onCursorChange,
		prettify,
		editorRef,
		loading,
	} = useEditor({ mode, setCursorPosition, setMode });

	useEffect(() => {
		console.log(editorRef.current);
	}, []);

	return (
		<div className={styles.editor}>
			<div className={styles.aceEditor}>
				{loading && <LoadingScreen text="Fetching Code Space ..." />}
				<AceEditor
					ref={editorRef}
					mode={mode.name}
					placeholder=""
					theme="dracula"
					name="Editor"
					width="100%"
					height="100%"
					readOnly={true}
					onLoad={onEditorLoad}
					onChange={onCodeChange}
					debounceChangePeriod={500}
					onCursorChange={onCursorChange}
					showPrintMargin={false}
					showGutter={true}
					highlightActiveLine={true}
					focus={true}
					setOptions={{
						enableBasicAutocompletion: false,
						enableLiveAutocompletion: false,
						enableSnippets: false,
						showLineNumbers: true,
						tabSize: 2,
						fontSize: 14,
						scrollPastEnd: 0.5,
					}}
				/>
			</div>
			<div className={styles.bottomBar}>
				<BottomBar prettify={prettify} />
			</div>
		</div>
	);
};

const mapStateToProps = (state) => ({
	...state,
});

const mapDispatchToProps = (dispatch) => ({
	setMode: (payload) => dispatch(actions.setMode(payload)),
	setCursorPosition: (payload) =>
		dispatch(actions.setCursorPosition(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Editor);
