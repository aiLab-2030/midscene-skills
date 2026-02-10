# Computer Automation Examples

Practical examples of desktop automation using `npx @midscene/cli skill computer`.

## 1. Take Desktop Screenshot

Capture the current state of the desktop.

```bash
# Take a screenshot
npx @midscene/cli skill computer screenshot
```

Expected output:

```json
{
  "success": true,
  "message": "Screenshot captured",
  "screenshot": "/path/to/screenshot.png",
  "result": {}
}
```

Use this as a first step to understand what is currently on screen before performing actions.

## 2. Open an Application via Spotlight

Launch any application using macOS Spotlight search.

```bash
# Step 1: Open Spotlight
npx @midscene/cli skill computer act "press Command+Space to open Spotlight"

# Step 2: Type the application name
npx @midscene/cli skill computer act "type 'Google Chrome'"

# Step 3: Launch the application
npx @midscene/cli skill computer act "press Enter to launch the application"

# Step 4: Verify the app opened
npx @midscene/cli skill computer assert "Google Chrome window is visible on screen"
```

You can open any application this way -- just replace `'Google Chrome'` with the desired app name:

```bash
npx @midscene/cli skill computer act "press Command+Space to open Spotlight"
npx @midscene/cli skill computer act "type 'Finder'"
npx @midscene/cli skill computer act "press Enter"
```

## 3. Keyboard Shortcuts

Perform common keyboard shortcuts for copy, paste, and other operations.

### Copy and Paste

```bash
# Select all text in the current field
npx @midscene/cli skill computer act "press Command+A to select all"

# Copy the selection
npx @midscene/cli skill computer act "press Command+C to copy"

# Switch to another application
npx @midscene/cli skill computer act "press Command+Tab to switch application"

# Paste the copied content
npx @midscene/cli skill computer act "press Command+V to paste"
```

### Save and Undo

```bash
# Save the current document
npx @midscene/cli skill computer act "press Command+S to save"

# Undo the last action
npx @midscene/cli skill computer act "press Command+Z to undo"

# Redo
npx @midscene/cli skill computer act "press Command+Shift+Z to redo"
```

### Screenshot Shortcuts

```bash
# Full screen screenshot (system)
npx @midscene/cli skill computer act "press Command+Shift+3 to capture the full screen"

# Selection screenshot (system)
npx @midscene/cli skill computer act "press Command+Shift+4 to start selection screenshot"
```

## 4. Query Screen Content

Extract information from the current screen using natural language questions.

### Read Window Title

```bash
npx @midscene/cli skill computer query "what is the title of the frontmost window?"
```

### List Visible Applications

```bash
npx @midscene/cli skill computer query "what applications are visible in the Dock?"
```

### Read Text Content

```bash
npx @midscene/cli skill computer query "what text is displayed in the main content area of the window?"
```

### Get Menu Bar Information

```bash
npx @midscene/cli skill computer query "what is the current time shown in the menu bar?"
npx @midscene/cli skill computer query "is Wi-Fi connected according to the menu bar?"
npx @midscene/cli skill computer query "what is the battery percentage shown in the menu bar?"
```

### Read Notification

```bash
npx @midscene/cli skill computer query "what does the notification banner say?"
```

## 5. Multi-step Workflow

### Open TextEdit, Write Content, and Save

```bash
# Open TextEdit via Spotlight
npx @midscene/cli skill computer act "press Command+Space to open Spotlight"
npx @midscene/cli skill computer act "type 'TextEdit'"
npx @midscene/cli skill computer act "press Enter"

# Wait for TextEdit and verify
npx @midscene/cli skill computer assert "TextEdit window is visible"

# Create a new document
npx @midscene/cli skill computer act "press Command+N to create a new document"

# Type some content
npx @midscene/cli skill computer act "type 'Meeting Notes - February 2026'"
npx @midscene/cli skill computer act "press Enter"
npx @midscene/cli skill computer act "type '1. Review project timeline'"
npx @midscene/cli skill computer act "press Enter"
npx @midscene/cli skill computer act "type '2. Discuss budget allocation'"

# Save the document
npx @midscene/cli skill computer act "press Command+S to save"

# Verify the save dialog appeared or the file was saved
npx @midscene/cli skill computer screenshot
```

### Open Finder and Navigate to a Folder

```bash
# Open a new Finder window
npx @midscene/cli skill computer act "press Command+Space to open Spotlight"
npx @midscene/cli skill computer act "type 'Finder'"
npx @midscene/cli skill computer act "press Enter"

# Navigate to Documents
npx @midscene/cli skill computer act "press Command+Shift+O to open the Documents folder"

# Query the contents
npx @midscene/cli skill computer query "what files and folders are visible in the Finder window?"

# Open a specific file
npx @midscene/cli skill computer act "double-click on the file named 'report.pdf'"
```

### Browser Workflow on Desktop

```bash
# Open Safari
npx @midscene/cli skill computer act "press Command+Space to open Spotlight"
npx @midscene/cli skill computer act "type 'Safari'"
npx @midscene/cli skill computer act "press Enter"

# Navigate to a URL
npx @midscene/cli skill computer act "click on the address bar at the top of the Safari window"
npx @midscene/cli skill computer act "type 'https://midscenejs.com'"
npx @midscene/cli skill computer act "press Enter"

# Wait and verify
npx @midscene/cli skill computer assert "the Midscene website is loaded in Safari"

# Query page content
npx @midscene/cli skill computer query "what is the main heading on the webpage?"
```

## 6. Desktop Verification

### Check if an Application is Running

```bash
# Assert an app is visible
npx @midscene/cli skill computer assert "Visual Studio Code is the frontmost application"

# Assert an app is in the Dock
npx @midscene/cli skill computer assert "the Slack icon is visible in the Dock"
```

### Verify UI State

```bash
# Check window state
npx @midscene/cli skill computer assert "there is a dialog box asking to save changes"

# Verify menu state
npx @midscene/cli skill computer assert "the Edit menu is open and showing clipboard options"

# Check for error messages
npx @midscene/cli skill computer assert "no error dialog is visible on screen"
```

### Verify File Operations

```bash
# After saving a file, verify it exists in Finder
npx @midscene/cli skill computer act "press Command+Space to open Spotlight"
npx @midscene/cli skill computer act "type 'Finder'"
npx @midscene/cli skill computer act "press Enter"

npx @midscene/cli skill computer act "press Command+Shift+G to open Go to Folder"
npx @midscene/cli skill computer act "type '~/Documents'"
npx @midscene/cli skill computer act "press Enter"

npx @midscene/cli skill computer assert "the file 'Meeting Notes.txt' is visible in the Finder window"
```

### Verify System State

```bash
# Check display arrangement
npx @midscene/cli skill computer displays

# Connect to primary display
npx @midscene/cli skill computer connect

# Verify connection
npx @midscene/cli skill computer screenshot
```
