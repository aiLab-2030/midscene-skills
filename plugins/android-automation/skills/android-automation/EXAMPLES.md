# Android Automation Examples

Practical examples demonstrating how to automate Android devices using `npx @midscene/cli skill android`.

---

## 1. Take Device Screenshot

Capture the current state of the device screen.

```bash
npx @midscene/cli skill android screenshot
```

Expected output:

```json
{
  "success": true,
  "message": "Screenshot captured",
  "screenshot": "/path/to/screenshot-2024-01-15T10-30-00.png"
}
```

Use this as a first step before any interaction to understand what is currently displayed on the device.

---

## 2. Open Settings App

Launch the Settings application on the device.

```bash
npx @midscene/cli skill android act "open the Settings app"
```

Verify that it opened:

```bash
npx @midscene/cli skill android assert "the Settings app is open"
```

---

## 3. Navigate and Interact -- Open Chrome and Search

Open the Chrome browser and perform a web search.

**Step 1**: Open Chrome.

```bash
npx @midscene/cli skill android act "open the Chrome app"
```

**Step 2**: Take a screenshot to see the current state.

```bash
npx @midscene/cli skill android screenshot
```

**Step 3**: Tap the address bar and type a search query.

```bash
npx @midscene/cli skill android act "tap the address bar at the top"
npx @midscene/cli skill android act "type 'Midscene automation' and press Enter"
```

**Step 4**: Verify search results appear.

```bash
npx @midscene/cli skill android assert "search results are displayed"
```

**Step 5**: Extract the top results.

```bash
npx @midscene/cli skill android query "what are the first 3 search result titles?"
```

---

## 4. App Installation Verification

Check whether a specific app is installed on the device.

**Step 1**: Open the app drawer or home screen.

```bash
npx @midscene/cli skill android act "swipe up from the bottom to open the app drawer"
```

**Step 2**: Search for the app.

```bash
npx @midscene/cli skill android act "tap the search bar in the app drawer"
npx @midscene/cli skill android act "type 'Spotify'"
```

**Step 3**: Check if the app appears.

```bash
npx @midscene/cli skill android query "is the Spotify app visible in the search results?"
```

Alternatively, use ADB directly for a non-visual check:

```bash
adb shell pm list packages | grep spotify
```

---

## 5. Form Filling on Mobile

Fill out a login form in a mobile app.

**Step 1**: Open the app and navigate to the login screen.

```bash
npx @midscene/cli skill android act "open the MyApp app"
npx @midscene/cli skill android act "tap the 'Sign In' button"
```

**Step 2**: Take a screenshot to see the form fields.

```bash
npx @midscene/cli skill android screenshot
```

**Step 3**: Fill in the email field.

```bash
npx @midscene/cli skill android act "tap the email input field"
npx @midscene/cli skill android act "type 'user@example.com'"
```

**Step 4**: Fill in the password field.

```bash
npx @midscene/cli skill android act "tap the password input field"
npx @midscene/cli skill android act "type 'securePassword123'"
```

**Step 5**: Submit the form.

```bash
npx @midscene/cli skill android act "tap the 'Log In' button"
```

**Step 6**: Verify successful login.

```bash
npx @midscene/cli skill android assert "the home screen or dashboard is displayed after login"
```

---

## 6. Multi-step App Interaction

Complete a multi-step task: compose and send a message in a messaging app.

**Step 1**: Open the messaging app.

```bash
npx @midscene/cli skill android act "open the Messages app"
```

**Step 2**: Start a new conversation.

```bash
npx @midscene/cli skill android act "tap the new message or compose button"
```

**Step 3**: Enter the recipient.

```bash
npx @midscene/cli skill android act "tap the 'To' field"
npx @midscene/cli skill android act "type 'John Doe'"
npx @midscene/cli skill android act "tap the first contact suggestion for John Doe"
```

**Step 4**: Type the message.

```bash
npx @midscene/cli skill android act "tap the message input field"
npx @midscene/cli skill android act "type 'Hey John, are we still meeting tomorrow?'"
```

**Step 5**: Send the message.

```bash
npx @midscene/cli skill android act "tap the send button"
```

**Step 6**: Confirm the message was sent.

```bash
npx @midscene/cli skill android assert "the message 'Hey John, are we still meeting tomorrow?' appears in the conversation"
```

---

## 7. Device State Verification

Check various device states and settings.

**Check battery level**:

```bash
npx @midscene/cli skill android query "what is the current battery percentage?"
```

**Check Wi-Fi connection**:

```bash
npx @midscene/cli skill android act "open the Settings app"
npx @midscene/cli skill android act "tap on 'Wi-Fi' or 'Network & internet'"
npx @midscene/cli skill android query "what Wi-Fi network is currently connected?"
```

**Verify Bluetooth is enabled**:

```bash
npx @midscene/cli skill android act "open the Settings app"
npx @midscene/cli skill android act "tap on 'Bluetooth' or 'Connected devices'"
npx @midscene/cli skill android assert "Bluetooth is turned on"
```

**Check available storage**:

```bash
npx @midscene/cli skill android act "open the Settings app"
npx @midscene/cli skill android act "tap on 'Storage'"
npx @midscene/cli skill android query "how much storage space is available?"
```
