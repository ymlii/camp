// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { StrategyWebviewPanel } from './StrategyWebviewPanel'; // Import the class

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "camp" is now active!');
	let startButton = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 100);
	startButton.text = "$(rocket) Strategy";
	startButton.tooltip = "Start Strategy Selection and Planning";
	startButton.command = "camp.openStrategyWebview";
	startButton.show();
	

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	const disposable = vscode.commands.registerCommand('camp.openStrategyWebview', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.window.showInformationMessage('Opening Strategy Selection...');
		// openStrategyWebview(context);
		
		StrategyWebviewPanel.createOrShow(context.extensionUri);
		

		
	});

	context.subscriptions.push(startButton);

	context.subscriptions.push(disposable);
	// pop up strategy message
	setInterval(() => {
		vscode.window.showInformationMessage(getRandomReminder());
	}, 15 * 60 * 1000);
	

}

// This method is called when your extension is deactivated
export function deactivate() {}

// pop different reminder of using strategies
function getRandomReminder(): string {
    const messages = [
        "Remember to practice the strategy you selected.",
        "Stay on track! Try your chosen strategy.",
        "How’s it going? Give your selected strategy a shot.",
        "Take a moment to use your strategy."
    ];
    return messages[Math.floor(Math.random() * messages.length)];
}

// function openStrategyWebview(context: vscode.ExtensionContext) {
//     const panel = vscode.window.createWebviewPanel(
//         'strategySelection', // Identifies the type of the webview panel
//         'Strategy Selection', // Title of the webview panel
//         vscode.ViewColumn.One, // Editor column to show the webview
//         {} // Webview options (e.g., enable scripts, etc.)
//     );

//     panel.webview.html = getWebviewContent(); // A function to get the HTML content
// }

// function getWebviewContent() {
//     return `
//         <html>
//         <body>
//             <h1>Strategy Selection</h1>
//             <button onclick="alert('Strategy selected!')">Select Strategy</button>
//         </body>
//         </html>
//     `;
// }