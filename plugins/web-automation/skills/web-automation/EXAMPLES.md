# Web Browser Automation -- Examples

## 1. Search and Extract Information

Search Google and extract results.

```bash
# Navigate to Google
npx @midscene/cli skill web navigate "https://www.google.com" --bridge

# Type a search query
npx @midscene/cli skill web act "type 'Midscene AI automation' into the search box and press Enter" --bridge

# Extract search results
npx @midscene/cli skill web query "what are the top 5 search result titles and their URLs?" --bridge

# Close browser
npx @midscene/cli skill web close --bridge
```

## 2. Fill Out a Contact Form

Navigate to a contact page and submit a form.

```bash
# Navigate to the contact page
npx @midscene/cli skill web navigate "https://example.com/contact" --bridge

# Fill in form fields
npx @midscene/cli skill web act "type 'John Doe' into the Name field" --bridge
npx @midscene/cli skill web act "type 'john@example.com' into the Email field" --bridge
npx @midscene/cli skill web act "type 'I would like to learn more about your services.' into the Message field" --bridge

# Submit the form
npx @midscene/cli skill web act "click the Submit button" --bridge

# Verify submission
npx @midscene/cli skill web assert "a success or thank you message is displayed" --bridge

# Close browser
npx @midscene/cli skill web close --bridge
```

## 3. Extract Product Information

Scrape product data from an e-commerce page.

```bash
# Navigate to the product listing
npx @midscene/cli skill web navigate "https://example.com/products" --bridge

# Extract structured product data
npx @midscene/cli skill web query "extract all products with their name, price, rating, and availability as a JSON array" --bridge

# Get details for a specific product
npx @midscene/cli skill web act "click on the first product" --bridge
npx @midscene/cli skill web query "get the full product description, specifications, and reviews" --bridge

# Close browser
npx @midscene/cli skill web close --bridge
```

## 4. Login and Dashboard

Log into a web application and extract dashboard data.

```bash
# Navigate to login page
npx @midscene/cli skill web navigate "https://example.com/login" --bridge

# Enter credentials
npx @midscene/cli skill web act "type 'admin@example.com' into the email field" --bridge
npx @midscene/cli skill web act "type 'securepassword' into the password field" --bridge
npx @midscene/cli skill web act "click the Sign In button" --bridge

# Verify login succeeded
npx @midscene/cli skill web assert "the dashboard or welcome page is displayed" --bridge

# Extract dashboard metrics
npx @midscene/cli skill web query "what are the key metrics displayed on the dashboard?" --bridge

# Take a screenshot for the record
npx @midscene/cli skill web screenshot --bridge

# Close browser
npx @midscene/cli skill web close --bridge
```

## 5. Scrape News from Hacker News

Extract the top stories from Hacker News.

```bash
# Navigate to Hacker News
npx @midscene/cli skill web navigate "https://news.ycombinator.com" --bridge

# Extract the top stories
npx @midscene/cli skill web query "list the top 10 story titles, their points, and the number of comments as a JSON array" --bridge

# Click into the top story for details
npx @midscene/cli skill web act "click on the first story title" --bridge

# Get story details
npx @midscene/cli skill web query "what is the URL and title of the current page?" --bridge

# Close browser
npx @midscene/cli skill web close --bridge
```

## 6. Weather Check (Chinese Example)

Check the weather forecast on a Chinese weather site.

```bash
# Navigate to the weather site
npx @midscene/cli skill web navigate "https://www.weather.com.cn" --bridge

# Search for a city
npx @midscene/cli skill web act "在搜索框中输入'北京'并点击搜索" --bridge

# Extract weather data
npx @midscene/cli skill web query "获取今天的天气信息，包括温度、天气状况和风力" --bridge

# Close browser
npx @midscene/cli skill web close --bridge
```

## 7. E-commerce Shopping Flow

Complete a shopping flow on an e-commerce site.

```bash
# Navigate to the store
npx @midscene/cli skill web navigate "https://example.com/shop" --bridge

# Search for a product
npx @midscene/cli skill web act "type 'wireless headphones' into the search bar and press Enter" --bridge

# View search results
npx @midscene/cli skill web query "what are the first 3 products shown with their names and prices?" --bridge

# Select a product
npx @midscene/cli skill web act "click on the first product in the search results" --bridge

# Add to cart
npx @midscene/cli skill web act "select 'Black' from the color options" --bridge
npx @midscene/cli skill web act "click the Add to Cart button" --bridge

# Verify item added
npx @midscene/cli skill web assert "the cart icon shows at least 1 item" --bridge

# View cart
npx @midscene/cli skill web act "click the cart icon" --bridge
npx @midscene/cli skill web query "what items are in the cart with their quantities and total price?" --bridge

# Close browser
npx @midscene/cli skill web close --bridge
```

## 8. Table Data Extraction

Extract structured data from an HTML table.

```bash
# Navigate to a page with a data table
npx @midscene/cli skill web navigate "https://example.com/reports" --bridge

# Extract full table data
npx @midscene/cli skill web query "extract all rows from the data table, including column headers, as a JSON array of objects" --bridge

# Sort or filter if needed
npx @midscene/cli skill web act "click the 'Date' column header to sort by date" --bridge

# Re-extract sorted data
npx @midscene/cli skill web query "extract the first 10 rows from the sorted table as a JSON array" --bridge

# Close browser
npx @midscene/cli skill web close --bridge
```

## 9. Frontend Verification: Login Form

Verify that a login form works correctly on a local development server.

```bash
# Navigate to the local app
npx @midscene/cli skill web navigate "http://localhost:3000/login" --bridge

# Verify the form is rendered correctly
npx @midscene/cli skill web assert "a login form with email and password fields is visible" --bridge
npx @midscene/cli skill web assert "a Submit or Log In button is present" --bridge

# Test with empty submission
npx @midscene/cli skill web act "click the Submit button without entering any data" --bridge
npx @midscene/cli skill web assert "validation error messages are shown for required fields" --bridge

# Test with valid input
npx @midscene/cli skill web act "type 'test@example.com' into the email field" --bridge
npx @midscene/cli skill web act "type 'ValidPassword123' into the password field" --bridge
npx @midscene/cli skill web act "click the Submit button" --bridge

# Verify successful login
npx @midscene/cli skill web assert "the user is redirected to the dashboard or home page" --bridge

# Close browser
npx @midscene/cli skill web close --bridge
```

## 10. Frontend Verification: Interactive Feedback

Verify interactive UI elements provide correct feedback.

```bash
# Navigate to the page with interactive components
npx @midscene/cli skill web navigate "http://localhost:3000/settings" --bridge

# Test toggle switches
npx @midscene/cli skill web act "click the notifications toggle switch" --bridge
npx @midscene/cli skill web assert "the notifications toggle is now in the ON position" --bridge

# Test a slider
npx @midscene/cli skill web act "drag the volume slider to approximately 75%" --bridge
npx @midscene/cli skill web assert "the volume value shows around 75" --bridge

# Test a dropdown
npx @midscene/cli skill web act "click the language dropdown and select 'French'" --bridge
npx @midscene/cli skill web assert "the language dropdown shows 'French' as the selected option" --bridge

# Save settings
npx @midscene/cli skill web act "click the Save Changes button" --bridge
npx @midscene/cli skill web assert "a success notification or toast message appears" --bridge

# Close browser
npx @midscene/cli skill web close --bridge
```

## 11. Frontend Verification: Data Display

Verify that data is correctly displayed after being loaded.

```bash
# Navigate to the data dashboard
npx @midscene/cli skill web navigate "http://localhost:3000/dashboard" --bridge

# Wait for data to load and take a screenshot
npx @midscene/cli skill web screenshot --bridge

# Verify key UI components are present
npx @midscene/cli skill web assert "there is a chart or graph displayed on the page" --bridge
npx @midscene/cli skill web assert "there is a summary section with key metrics" --bridge

# Verify data table
npx @midscene/cli skill web assert "a data table with at least one row of data is visible" --bridge
npx @midscene/cli skill web query "extract the column headers and the first 3 rows of the data table" --bridge

# Test pagination if present
npx @midscene/cli skill web act "click the Next Page button" --bridge
npx @midscene/cli skill web assert "the data table shows different data on page 2" --bridge

# Test filtering
npx @midscene/cli skill web act "type '2024' into the date filter and press Enter" --bridge
npx @midscene/cli skill web assert "the table data is filtered to show only 2024 entries" --bridge

# Close browser
npx @midscene/cli skill web close --bridge
```
