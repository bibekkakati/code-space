import { beautify } from "ace-builds/src-noconflict/ext-beautify";
import { useRef, useState } from "react";
import { useHistory, useParams } from "react-router";
import { JAVASCRIPT_MODE, PLAIN_TEXT_MODE } from "../../constants/Modes";
import { CURSOR_POS } from "../../constants/CodeSpaceActions";
import {
	deleteCodeSpace_Action,
	getCodeSpace,
	listenOnCodeSpace,
	listenOnCodeSpaceAction,
	updateCodeSpaceAction,
	updateCodeSpaceCode,
} from "../../firebase/actions";
import getUserId from "../../helpers/getUserId";
import debounce from "lodash/debounce";
import { Range } from "ace-builds";

export const useEditor = ({ setCursorPosition, setMode, mode }) => {
	const history = useHistory();
	const params = useParams();
	const editorRef = useRef();
	const [loading, setLoading] = useState(true);
	const [sameUser, setSameUser] = useState(false);

	const onEditorLoad = (editor) => {
		// Change editor style
		editor.container.style.lineHeight = 1.5;
		getCodeSpace(params.csId, initializeCodeSpace);
	};

	const onCodeChange = async (code) => {
		if (!sameUser) return;
		try {
			await updateCodeSpaceCode(params.csId, code);
		} catch (error) {
			console.error("onCodeChange > updateCodeSpaceCode:", error);
		}
	};

	let onCursorChangeDebounce;
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
		if (!sameUser) return;
		const actionData = {
			type: CURSOR_POS,
			start,
			end,
			reverse,
		};

		if (onCursorChangeDebounce) onCursorChangeDebounce.cancel();
		onCursorChangeDebounce = debounce(async function () {
			try {
				await updateCodeSpaceAction(params.csId, actionData);
			} catch (error) {
				console.error(
					"onCursorChange > updateCodeSpaceAction:",
					error.message
				);
			}
		}, 500);
		onCursorChangeDebounce();
	};

	const setSelectionRange = (start, end, reverse = false) => {
		const selection = editorRef.current.editor.getSelection();
		selection.setRange(
			new Range(start.row, start.column, end.row, end.column),
			reverse
		);
		// editorRef.current.editor.scrollToLine(start.row, false, true);
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
		const value = snap.val();
		switch (snap.key) {
			case "code":
				const code = value || "";
				editorRef.current.editor.setValue(code);
				editorRef.current.editor.getSelection().clearSelection();
				break;
			case "mode":
				const m = value || PLAIN_TEXT_MODE;
				setMode(m);
				break;
			default:
				return;
		}
	};

	const initializeCodeSpace = (snap) => {
		const data = snap.val();
		if (data) {
			const createdAt = new Date(data.timestamp);
			const currentTime = new Date();
			const timeLimit = 48;
			// Check if link is expired (> 48 hours)
			const expired =
				(currentTime.getTime() - createdAt.getTime()) /
					(1000 * 60 * 60) >
				timeLimit;
			if (expired) {
				deleteCodeSpace_Action(params.csId);
				history.replace("/");
				return;
			}
			editorRef.current.editor.setValue(data.code || "");
			editorRef.current.editor.getSelection().clearSelection();
			if (data.mode) {
				// Set the mode in state
				setMode(data.mode);
			}
			const userId = getUserId();
			if (userId === data.userId) {
				setSameUser(true);
				// If same user, then edit is allowed
				editorRef.current.editor.setReadOnly(false);
			} else {
				// If userid doesn't match that means view access only
				editorRef.current.editor.setReadOnly(true);
				// listen for changes in code space
				listenOnCodeSpace(params.csId, onChange_CodeSpace);
				listenOnCodeSpaceAction(params.csId, onChange_CodeSpaceAction);
			}
			setLoading(false);
			return;
		} else {
			console.error("initializeCodeSpace: No data found in snapshot");
			history.replace("/");
			return;
		}
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
