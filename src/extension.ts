// Force Close All File Tabs - VS Code Extension
// Ported from the Sublime Text plugin by Dirk Dassow
// Copyright (c) 2023-2026 Dirk Dassow

import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    // Main command: Force Close All File Tabs
    const closeAll = vscode.commands.registerCommand(
        'closeAllNoConfirm.closeAll',
        () => handleCloseAll()
    );

    // Shortcut command: Force Close File Tabs in Active Group
    const closeAllInGroup = vscode.commands.registerCommand(
        'closeAllNoConfirm.closeAllInGroup',
        () => closeAllEditors(true)
    );

    context.subscriptions.push(closeAll, closeAllInGroup);
}

async function handleCloseAll(): Promise<void> {
    const config = vscode.workspace.getConfiguration('closeAllNoConfirm');
    const askBeforeClosing = config.get<boolean>('askBeforeClosing', true);
    const activeGroupOnly = config.get<boolean>('activeGroupOnly', false);

    if (askBeforeClosing) {
        // Show quick pick menu — mirrors the Sublime Text version's behavior
        const options: vscode.QuickPickItem[] = [
            {
                label: '$(close-all) Force close all file tabs',
                description: 'All editor groups'
            },
            {
                label: '$(close) Force close file tabs in active group',
                description: 'Active group only'
            }
        ];

        const selected = await vscode.window.showQuickPick(options, {
            placeHolder: 'Warning: All unsaved changes will be discarded!'
        });

        if (!selected) {
            return; // User cancelled
        }

        const closeActiveOnly = selected === options[1];
        await closeAllEditors(closeActiveOnly);
    } else {
        await closeAllEditors(activeGroupOnly);
    }
}

async function closeAllEditors(activeGroupOnly: boolean): Promise<void> {
    const targetGroups = activeGroupOnly
        ? [vscode.window.tabGroups.activeTabGroup]
        : [...vscode.window.tabGroups.all];

    // Phase 1: Revert and close all dirty editors (unsaved changes are discarded)
    // This mirrors the Sublime Text plugin's view.set_scratch(True) trick
    for (const group of targetGroups) {
        const dirtyTabs = group.tabs.filter(tab => tab.isDirty);

        for (const tab of dirtyTabs) {
            if (tab.input instanceof vscode.TabInputText) {
                try {
                    const uri = tab.input.uri;
                    const doc = await vscode.workspace.openTextDocument(uri);
                    await vscode.window.showTextDocument(doc, {
                        viewColumn: group.viewColumn,
                        preserveFocus: false
                    });
                    // Revert discards unsaved changes and closes the editor in one step
                    await vscode.commands.executeCommand(
                        'workbench.action.revertAndCloseActiveEditor'
                    );
                } catch {
                    // Silently skip tabs that can't be reverted (e.g. output panels)
                }
            }
        }
    }

    // Phase 2: Close all remaining (clean) editors
    if (activeGroupOnly) {
        await vscode.commands.executeCommand('workbench.action.closeEditorsInGroup');
    } else {
        await vscode.commands.executeCommand('workbench.action.closeAllEditors');
    }
}

export function deactivate() {}
