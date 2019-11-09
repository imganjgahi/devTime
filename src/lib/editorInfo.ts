
import * as vscode from 'vscode';
import {basename} from 'path';

const getEditorInfo = (): { text?: string; tooltip?: string; color?: string; } | null => {
    const editor = vscode.window.activeTextEditor;
	console.log("editor: ", editor)
	let text: string | undefined = "undefined";
    let tooltip: string | undefined;
    if (!editor) {
        return null;
    }
    const resource = editor.document.uri;
    if (resource.scheme === 'file') {
        const folder = vscode.workspace.getWorkspaceFolder(resource);
        if (!folder) {
            text = `<<no workspace>> → ${basename(resource.fsPath)}`;
        } else {
            text = `${basename(folder.uri.fsPath)} → ${basename(resource.fsPath)}`;
            tooltip = resource.fsPath;
        }
    }
    return { text, tooltip };
}

export default getEditorInfo