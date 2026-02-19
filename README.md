# Close All without Confirmation

Effortlessly close all tabs (including unsaved) in VS Code without being repeatedly interrupted by confirmation dialogs! Perfect for those who want to swiftly close multiple unsaved files without clicking "Don't Save" over and over again.

> Finally! The popular [Sublime Text plugin](https://packagecontrol.io/packages/Close%20All%20without%20Confirmation) (3K+ installs) is now available as a VS Code extension.

## The Problem

You've searched and replaced across dozens of files — or opened a huge project and now have 50+ tabs. Closing them with unsaved changes means VS Code asks **"Do you want to save?"** for every. single. file. This extension fixes that.

## Features

- **Zero config** — install, run, done
- **The nuclear option** — close all tabs at once, saved and unsaved. One prompt to confirm, or none at all
- **Choose your scope** — all editor groups or just the active one
- **Fine-tunable** — by default, a single prompt lets you choose the scope. Disable it for instant, zero-click execution
- **Keybinding-ready** — two commands, bind them however you like

## Installation

### Via VS Code Marketplace

1. Open VS Code
2. Press `Ctrl+Shift+X` (Windows/Linux) or `Cmd+Shift+X` (macOS) to open Extensions
3. Search for **"Close All without Confirmation"**
4. Click **Install**

### Via Command Line

```bash
code --install-extension ddbln.close-all-without-confirmation
```

## Usage

### Command Palette

Press `Ctrl+Shift+P` (Windows/Linux) or `Cmd+Shift+P` (macOS), then type:

- **"Close All without Confirmation"** — main command with scope selection
- **"Close All in Group without Confirmation"** — directly closes editors in the active group

### Default Behavior

When you run "Close All without Confirmation", a Quick Pick menu appears with two options:

1. **Close all tabs** — closes tabs in all editor groups
2. **Close tabs in active group** — only closes tabs in the currently active group

All unsaved changes are discarded. No per-file confirmation dialogs.

### Keybindings

This extension does not add keybindings by default. To set your own, open your keybindings JSON (`Ctrl+K Ctrl+S` > Open Keyboard Shortcuts JSON) and add e.g.:

**macOS:**
```json
{
    "key": "cmd+alt+shift+w",
    "command": "closeAllNoConfirm.closeAll"
}
```

**Windows / Linux:**
```json
{
    "key": "ctrl+alt+shift+w",
    "command": "closeAllNoConfirm.closeAll"
}
```

## Settings

| Setting | Type | Default | Description |
|---|---|---|---|
| `closeAllNoConfirm.askBeforeClosing` | `boolean` | `true` | Show a Quick Pick menu before closing. Disable for instant close. |
| `closeAllNoConfirm.activeGroupOnly` | `boolean` | `false` | When Quick Pick is disabled: close only editors in the active group. |

### Example: Close instantly without any prompt

```json
{
    "closeAllNoConfirm.askBeforeClosing": false,
    "closeAllNoConfirm.activeGroupOnly": false
}
```

## FAQ

**Q: Does it close all tabs or only unsaved ones?**
A: It closes all tabs — both saved and unsaved. The key benefit is that unsaved files are closed without per-file confirmation dialogs.

**Q: Is there any risk of losing work?**
A: By default, a Quick Pick prompt reminds you that unsaved changes will be lost. If you disable the prompt via settings, the extension closes everything immediately — so use with care!

**Q: Does it work in Cursor?**
A: Yes! Cursor is based on VS Code, so this extension works there as well. Install the `.vsix` file manually or via the Cursor extension marketplace.

**Q: Will it slow down VS Code?**
A: No. The extension is lightweight and only activates when you explicitly run one of its commands.

## License

[MIT](LICENSE) — Copyright (c) 2023-2026 Dirk Dassow
