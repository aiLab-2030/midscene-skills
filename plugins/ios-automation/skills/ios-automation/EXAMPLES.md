# iOS Automation Examples

Practical examples demonstrating how to automate iOS devices using `npx @midscene/cli skill ios`.

---

## 1. Take Device Screenshot

Capture the current state of the iOS device screen.

```bash
# Take a screenshot of the current screen
npx @midscene/cli skill ios screenshot
```

**Expected output:**
```json
{
  "success": true,
  "message": "Screenshot captured successfully",
  "screenshot": "/path/to/screenshot-2024-01-15T10-30-00.png",
  "result": null
}
```

Use screenshots to understand the current UI state before performing actions.

---

## 2. Open Settings App

Navigate to the home screen and open the Settings app.

```bash
# Go to home screen first
npx @midscene/cli skill ios act "Press the Home button"

# Open Settings
npx @midscene/cli skill ios act "Tap the Settings icon"

# Verify Settings is open
npx @midscene/cli skill ios assert "The Settings app is open and showing the main settings list"
```

---

## 3. Safari Navigation

Open Safari and navigate to a website.

```bash
# Open Safari from home screen
npx @midscene/cli skill ios act "Tap the Safari icon"

# Verify Safari opened
npx @midscene/cli skill ios assert "Safari browser is open"

# Tap the address bar and navigate
npx @midscene/cli skill ios act "Tap the address bar at the top of the screen"
npx @midscene/cli skill ios act "Type 'https://example.com'"
npx @midscene/cli skill ios act "Tap the Go button on the keyboard"

# Wait for page load
sleep 3

# Verify the page loaded
npx @midscene/cli skill ios assert "The Example Domain page is displayed"

# Extract page information
npx @midscene/cli skill ios query "What is the main heading text on the page?"
```

---

## 4. App Interaction

Open an app and interact with its UI elements.

```bash
# Open the App Store
npx @midscene/cli skill ios act "Tap the App Store icon"

# Wait for it to load
sleep 2

# Tap the Search tab
npx @midscene/cli skill ios act "Tap the Search tab at the bottom of the screen"

# Search for an app
npx @midscene/cli skill ios act "Tap the search field"
npx @midscene/cli skill ios act "Type 'weather'"
npx @midscene/cli skill ios act "Tap the Search button on the keyboard"

# Wait for results
sleep 2

# Query the results
npx @midscene/cli skill ios query "What is the name of the first app in the search results?"

# Take a screenshot of the results
npx @midscene/cli skill ios screenshot
```

---

## 5. Form Filling on iOS

Fill out a login form in an app.

```bash
# Assume we are on a login screen
npx @midscene/cli skill ios screenshot

# Fill in the email field
npx @midscene/cli skill ios act "Tap the email or username input field"
npx @midscene/cli skill ios act "Type 'user@example.com'"

# Fill in the password field
npx @midscene/cli skill ios act "Tap the password input field"
npx @midscene/cli skill ios act "Type 'MySecurePassword123'"

# Dismiss the keyboard if needed
npx @midscene/cli skill ios act "Tap the Done button on the keyboard"

# Submit the form
npx @midscene/cli skill ios act "Tap the Sign In button"

# Wait for login to complete
sleep 3

# Verify successful login
npx @midscene/cli skill ios assert "The user is logged in and the home screen or dashboard is visible"
```

---

## 6. Multi-step Workflow

Complete a multi-step workflow: change Wi-Fi settings.

```bash
# Step 1: Open Settings
npx @midscene/cli skill ios act "Press the Home button"
npx @midscene/cli skill ios act "Tap the Settings icon"
npx @midscene/cli skill ios assert "Settings app is open"

# Step 2: Navigate to Wi-Fi settings
npx @midscene/cli skill ios act "Tap the Wi-Fi option"
sleep 1

# Step 3: Check current Wi-Fi state
npx @midscene/cli skill ios query "Is Wi-Fi currently enabled or disabled?"
npx @midscene/cli skill ios query "What Wi-Fi network is currently connected, if any?"

# Step 4: Take a screenshot for reference
npx @midscene/cli skill ios screenshot

# Step 5: Toggle Wi-Fi off
npx @midscene/cli skill ios act "Tap the Wi-Fi toggle switch to turn it off"
sleep 1

# Step 6: Verify Wi-Fi is off
npx @midscene/cli skill ios assert "The Wi-Fi toggle is turned off"

# Step 7: Toggle Wi-Fi back on
npx @midscene/cli skill ios act "Tap the Wi-Fi toggle switch to turn it on"
sleep 2

# Step 8: Verify Wi-Fi is back on
npx @midscene/cli skill ios assert "The Wi-Fi toggle is turned on"

# Step 9: Go back to main Settings
npx @midscene/cli skill ios act "Tap the back button to return to Settings"
```

---

## 7. Device State Verification

Verify various aspects of the device's current state.

```bash
# Check what screen we are on
npx @midscene/cli skill ios query "What app or screen is currently displayed?"

# Verify home screen
npx @midscene/cli skill ios assert "The device is on the home screen"

# Check visible apps
npx @midscene/cli skill ios query "List all visible app icons on the current screen"

# Verify specific UI elements
npx @midscene/cli skill ios assert "There is a status bar at the top showing the time"

# Check for notifications
npx @midscene/cli skill ios act "Swipe down from the top of the screen"
sleep 1
npx @midscene/cli skill ios query "Are there any notifications displayed?"

# Return to previous state
npx @midscene/cli skill ios act "Swipe up from the bottom of the screen to dismiss"

# Verify we returned to the previous screen
npx @midscene/cli skill ios screenshot
```

---

## Tips for Writing Effective Commands

- **Be descriptive:** "Tap the blue Send button in the bottom right corner" is better than "Tap Send".
- **Use visual cues:** Reference colors, positions, icons, and labels the AI can see.
- **Add waits:** Use `sleep` between actions that trigger navigation or loading.
- **Verify after acting:** Follow `act` commands with `assert` or `query` to confirm the result.
- **Screenshot first:** When unsure of the screen state, take a screenshot before acting.
