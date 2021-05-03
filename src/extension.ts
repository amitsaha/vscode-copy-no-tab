// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';



// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	const editor = vscode.window.activeTextEditor;

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "copy-no-tab" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('copy-no-tab.copyNoTab', () => {
		var text = editor.document.getText(editor.selection);
		text = text.replace(/\t/g, '        ');
		// do not copy empty text
		if (text.trim() === '') {
			return;
		}
		// copy
		try {
			vscode.env.clipboard.writeText(text);
		} catch (error) {
			vscode.window.showErrorMessage(`copy-no-tab failed when copying to clipboard. Error: ${JSON.stringify(error)}`);
		}

		// Display a message box to the user
		vscode.window.showInformationMessage('Copied text to clipboard without tabs!');		
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
