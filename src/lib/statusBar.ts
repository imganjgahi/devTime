import * as vscode from 'vscode';
import getEditorInfo from './editorInfo';
let time: number = 0;
let strTime: string = "00:00";
let myStatusBarItem: vscode.StatusBarItem;
export const mangeTime = (amount: number = 3) => {
    time += amount;
    const hour = ("0" + (Math.floor(time / 60))).slice(-2);
    const minute = ("0" + (Math.floor(time % 60))).slice(-2);
    strTime = `${hour}:${minute}`;
    if (time > 0) {
		myStatusBarItem.text = "DevTime: " +strTime;
		myStatusBarItem.show();
	} else {
		myStatusBarItem.hide();
	}
	console.log("manageTime", strTime)

}

const statusBarHandler = (context: vscode.ExtensionContext) => {
	console.log("statusBarHandler", strTime)
	const myCommandId = 'sample.showSelectionCount';
	myStatusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 1);
	myStatusBarItem.command = myCommandId;
	let showInfo = vscode.commands.registerCommand(myCommandId, () => {
		const info = getEditorInfo();
		const fileName = info ? info.text :"undefind"
		vscode.window.showInformationMessage(`${strTime} on ${fileName}`);
	});
	
	context.subscriptions.push(showInfo);
}

export default statusBarHandler;