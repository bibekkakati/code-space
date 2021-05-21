import { beautify } from "ace-builds/src-noconflict/ext-beautify";
import { useRef, useState } from "react";
import { useParams } from "react-router";
import { JAVASCRIPT_MODE } from "../../constants/Modes";
import { CURSOR_POS } from "../../constants/CodeSpaceActions";
import {
	getCodeSpace,
	listenOnCodeSpace,
	listenOnCodeSpaceAction,
	updateCodeSpaceAction,
	updateCodeSpaceCode,
	updateCodeSpaceMode,
} from "../../firebase/actions";
import getUserId from "../../helpers/getUserId";
import debounce from "../../helpers/debounce";

export const useEditor = ({ setCursorPosition, setMode, mode }) => {
	const params = useParams();
	const editorRef = useRef();
	const [loading, setLoading] = useState(true);

	const onEditorLoad = (editor) => {
		// Change editor style
		editor.container.style.lineHeight = 1.5;
		getCodeSpace(params.csId, initializeCodeSpace);
	};

	const onCodeChange = async (code) => {
		try {
			await updateCodeSpaceCode(params.csId, code);
		} catch (error) {
			console.error("onCodeChange > updateCodeSpaceCode:", error);
		}
	};

	const onCursorChange = async (selection) => {
		const { row, column } = selection.cursor;
		// Set cursor position state
		setCursorPosition({
			row,
			column,
		});
		const { start, end } = selection.getRange();
		// By default cursor will be at the last position of the selection range
		let reverse = false;
		if (start.row === row && start.column === column) {
			reverse = true;
		}
		debounce(async () => {
			try {
				await updateCodeSpaceAction(params.csId, {
					type: CURSOR_POS,
					start,
					end,
					reverse,
				});
			} catch (error) {
				console.error(
					"onCursorChange > updateCodeSpaceAction:",
					error.message
				);
			}
		}, 500);
	};

	const setSelectionRange = (start, end, reverse = false) => {
		const selection = editorRef.current.editor.getSelection();
		selection.setRange(
			new Range(start.row, start.column, end.row, end.column),
			reverse
		);
	};

	const onChange_CodeSpaceAction = (snap) => {
		const data = snap.val();
		if (data) {
			const { type, start, end, reverse } = data;
			switch (type) {
				case CURSOR_POS:
					setSelectionRange(start, end, reverse);
					break;
				default:
					return;
			}
		} else {
			console.error("onChange_CodeSpaceAction: No data in snapshot");
		}
	};

	const onChange_CodeSpace = (snap) => {
		const data = snap.val();
		if (data) {
			const { code, mode } = data;
			if (code) {
				editorRef.current.editor.setValue(code);
			}
			if (mode) {
				editorRef.current.editor.setValue(mode);
			}
		} else {
			console.error("onChange_CodeSpace: Not data in snapshot");
		}
	};

	const initializeCodeSpace = (snap) => {
		const data = snap.val();
		if (data) {
			const userId = getUserId();
			if (userId === data.userId) {
				// If same user, then edit is allowed
				editorRef.current.editor.setReadOnly(false);
				editorRef.current.editor.setValue(data.code || "");
				if (data.mode) {
					// Set the mode in state
					setMode(data.mode);
				} else {
					// Update the mode in firebase
					updateCodeSpaceMode(params.csId, JAVASCRIPT_MODE);
					setMode(JAVASCRIPT_MODE);
				}
			} else {
				// If userid doesn't match that means it is a viewer and listen for changes
				listenOnCodeSpace(params.csId, onChange_CodeSpace);
				listenOnCodeSpaceAction(params.csId, onChange_CodeSpaceAction);
			}
		} else {
			console.error("initializeCodeSpace: No data found in snapshot");
		}
		setLoading(false);
	};

	const prettify = () => {
		// Prettify if in JavaScript mode
		if (mode.name === JAVASCRIPT_MODE.name)
			beautify(editorRef.current.editor.getSession());
	};

	return {
		onEditorLoad,
		onCodeChange,
		onCursorChange,
		prettify,
		editorRef,
		loading,
	};
};
