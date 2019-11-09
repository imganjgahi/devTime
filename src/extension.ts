// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import startTimer, { setRemoteToken } from './lib/startTimer';
import statusBarHandler from './lib/statusBar';
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "nili-time" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('extension.helloWorld', () => {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World!');
	});

	let setUserConfig = vscode.commands.registerCommand("extansion.setUserCongif", () => {
		vscode.window.showInputBox({ placeHolder: 'set your remote id' }).then((result) => {
			if (result) {
				setRemoteToken(result)
				vscode.workspace.getConfiguration("remoteId").update("static.conf.nili.RemoteId", result)
			}

		})
	});
	let webViewStart = vscode.commands.registerCommand('extansion.webViewStart', () => {
		// Create and show a new webview
		const panel = vscode.window.createWebviewPanel(
			'DevTime', // Identifies the type of the webview. Used internally
			'Dev Time', // Title of the panel displayed to the user
			vscode.ViewColumn.One, // Editor column to show the new webview panel in.
			{} // Webview options. More on these later.
		);
		panel.webview.html = getWebviewContent();
	});
	context.subscriptions.push(disposable);
	context.subscriptions.push(setUserConfig);
	context.subscriptions.push(webViewStart);
	statusBarHandler(context);
	startTimer();
}


export function deactivate() { }
function getWebviewContent() {
	return `<!DOCTYPE html>
  <html lang="en">
  <head>
	  <meta charset="UTF-8">
	  <meta name="viewport" content="width=device-width, initial-scale=1.0">
	  <meta http-equiv="Content-Security-Policy" content="default-src 'none';">
	  <title>DEV</title>
  </head>
  <body>

		<h1 class="header">web View Content</h1>
		<h1 id="lines-of-code-counter">0</h1>
		
		<script>
		(function() {
            const vscode = acquireVsCodeApi();
            const counter = document.getElementById('lines-of-code-counter');

            let count = 0;
            setInterval(() => {
                counter.textContent = count++;
            }, 100);
        }())
		</script>
  </body>
  </html>`;
}