import * as vscode from 'vscode';

export class StrategyWebviewPanel {
    public static currentPanel: StrategyWebviewPanel | undefined;
    private readonly _panel: vscode.WebviewPanel;
    private readonly _extensionUri: vscode.Uri;

    private constructor(panel: vscode.WebviewPanel, extensionUri: vscode.Uri) {
        this._panel = panel;
        this._extensionUri = extensionUri;

        this._panel.onDidDispose(() => this.dispose(), null, []);

        this._panel.webview.html = this._getHtmlForWebview();
    }

    public static createOrShow(extensionUri: vscode.Uri) {
        if (this.currentPanel) {
            this.currentPanel._panel.reveal(vscode.ViewColumn.One);
            return;
        }

        const panel = vscode.window.createWebviewPanel(
            'strategySelection',
            'Select a Strategy',
            vscode.ViewColumn.One,
            {
                enableScripts: true,
                retainContextWhenHidden: true
            }
        );

        this.currentPanel = new StrategyWebviewPanel(panel, extensionUri);
    }

    private _getHtmlForWebview(): string {
        return `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Strategy Selection</title>
            </head>
            <body>
                <h2>Select a Strategy</h2>
                <select id="strategy">
                    <option value="Break the problem down">Break the problem down</option>
                    <option value="Seek help">Seek help</option>
                    <option value="Try a different approach">Try a different approach</option>
                </select>
                <h3>How will you practice it?</h3>
                <textarea id="practicePlan" rows="4" cols="50"></textarea>
                <br>
                <button onclick="submitStrategy()">Save</button>
                
                <script>
                    const vscode = acquireVsCodeApi();

                    function submitStrategy() {
                        const strategy = document.getElementById('strategy').value;
                        const plan = document.getElementById('practicePlan').value;
                        
                        vscode.postMessage({
                            command: 'saveStrategy',
                            strategy: strategy,
                            plan: plan
                        });
                    }
                </script>
            </body>
            </html>
        `;
    }

    public dispose() {
        StrategyWebviewPanel.currentPanel = undefined;
        this._panel.dispose();
    }



}

