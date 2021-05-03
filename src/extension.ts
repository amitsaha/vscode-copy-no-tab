// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	const editor = vscode.window.activeTextEditor!;
	console.log('Congratulations, your extension "copy-no-tab" is now active!');

	let disposable = vscode.commands.registerCommand('copy-no-tab.copyNoTab', () => {
		var text = editor.document.getText(editor.selection);
		const tabSize = editor.options.tabSize as number;
		text = text.replace(/\t/g, ' '.repeat(tabSize));
		// The try/catch code below is copied from somewhere
		try {
			vscode.env.clipboard.writeText(text);
		} catch (error) {
			vscode.window.showErrorMessage(`copy-no-tab failed when copying to clipboard. Error: ${JSON.stringify(error)}`);
		}
		vscode.window.showInformationMessage('Copied text to clipboard without tabs!');
	});

	context.subscriptions.push(disposable);
}

export function deactivate() {}
