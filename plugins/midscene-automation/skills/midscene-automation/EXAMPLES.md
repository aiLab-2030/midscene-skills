# Midscene Browser Automation Examples

This document provides detailed examples of common browser automation tasks using Midscene CLI.

## Example 1: Search and Extract Information

**User request**: "Search for 'Midscene' on Google and get the first 3 results"

**Workflow**:

1. **Navigate** to Google:
   ```bash
   node dist/src/cli.js navigate https://www.google.com
   ```

2. **Act**: Type in search box:
   ```bash
   node dist/src/cli.js act "type 'Midscene' into the search box"
   ```

3. **Act**: Submit search:
   ```bash
   node dist/src/cli.js act "press Enter"
   ```

4. **Query**: Extract search results:
   ```bash
   node dist/src/cli.js query "What are the titles and URLs of the first 3 search results?"
   ```

5. **Close** the browser:
   ```bash
   node dist/src/cli.js close
   ```

**Expected result**: JSON with extracted search results that can be analyzed.

---

## Example 2: Fill Out a Contact Form

**User request**: "Fill out the contact form on example.com"

**Workflow**:

1. **Navigate** to contact page:
   ```bash
   node dist/src/cli.js navigate https://example.com/contact
   ```

2. **Act**: Fill in name:
   ```bash
   node dist/src/cli.js act "type 'John Doe' into the name field"
   ```

3. **Act**: Fill in email:
   ```bash
   node dist/src/cli.js act "type 'john@example.com' into the email field"
   ```

4. **Act**: Fill in message:
   ```bash
   node dist/src/cli.js act "type 'I would like more information about your services' into the message field"
   ```

5. **Act**: Submit form:
   ```bash
   node dist/src/cli.js act "click the Submit button"
   ```

6. **Assert**: Verify submission:
   ```bash
   node dist/src/cli.js assert "the page shows a success message"
   ```

7. **Screenshot** for confirmation:
   ```bash
   node dist/src/cli.js screenshot
   ```

8. **Close** the browser:
   ```bash
   node dist/src/cli.js close
   ```

---

## Example 3: Extract Product Information

**User request**: "Go to the product page and get the product details"

**Workflow**:

1. **Navigate** to product page:
   ```bash
   node dist/src/cli.js navigate https://example.com/products/laptop
   ```

2. **Query**: Extract product data:
   ```bash
   node dist/src/cli.js query "Extract the product name, price, description, and availability status in JSON format"
   ```

3. **Assert**: Verify product is available:
   ```bash
   node dist/src/cli.js assert "the product is in stock"
   ```

4. **Close** the browser:
   ```bash
   node dist/src/cli.js close
   ```

**Expected result**: Structured product data in JSON format.

---

## Example 4: Login and Access Dashboard

**User request**: "Log into the website and navigate to the dashboard"

**Workflow**:

1. **Navigate** to login page:
   ```bash
   node dist/src/cli.js navigate https://example.com/login
   ```

2. **Act**: Enter username:
   ```bash
   node dist/src/cli.js act "type 'user@example.com' into the email field"
   ```

3. **Act**: Enter password:
   ```bash
   node dist/src/cli.js act "type 'password123' into the password field"
   ```

4. **Act**: Click login:
   ```bash
   node dist/src/cli.js act "click the Login button"
   ```

5. **Assert**: Verify login success:
   ```bash
   node dist/src/cli.js assert "the user is logged in and the dashboard is visible"
   ```

6. **Query**: Get dashboard info:
   ```bash
   node dist/src/cli.js query "What notifications or messages are shown on the dashboard?"
   ```

7. **Screenshot**:
   ```bash
   node dist/src/cli.js screenshot
   ```

8. **Close** the browser:
   ```bash
   node dist/src/cli.js close
   ```

---

## Example 5: Scrape News Articles

**User request**: "Get the latest news headlines from Hacker News"

**Workflow**:

1. **Navigate** to Hacker News:
   ```bash
   node dist/src/cli.js navigate https://news.ycombinator.com
   ```

2. **Query**: Extract headlines:
   ```bash
   node dist/src/cli.js query "Extract the titles and points of the top 10 stories in JSON format"
   ```

3. **Close** the browser:
   ```bash
   node dist/src/cli.js close
   ```

4. Process and summarize the extracted data using Claude's analysis.

---

## Example 6: Check Weather Information

**User request**: "查询杭州天气"

**Workflow**:

1. **Navigate** to weather site:
   ```bash
   node dist/src/cli.js navigate https://www.google.com
   ```

2. **Act**: Search for weather:
   ```bash
   node dist/src/cli.js act "type '杭州天气' into the search box and press Enter"
   ```

3. **Query**: Extract weather data:
   ```bash
   node dist/src/cli.js query "当前杭州的天气如何？包括温度、天气状况和湿度"
   ```

4. **Screenshot** for reference:
   ```bash
   node dist/src/cli.js screenshot
   ```

5. **Close** the browser:
   ```bash
   node dist/src/cli.js close
   ```

---

## Example 7: E-commerce Shopping Flow

**User request**: "Search for laptops under $1000 on an e-commerce site"

**Workflow**:

1. **Navigate** to shopping site:
   ```bash
   node dist/src/cli.js navigate https://example.com
   ```

2. **Act**: Open search:
   ```bash
   node dist/src/cli.js act "click the search icon"
   ```

3. **Act**: Search for laptops:
   ```bash
   node dist/src/cli.js act "type 'laptop' into the search box and press Enter"
   ```

4. **Act**: Apply price filter:
   ```bash
   node dist/src/cli.js act "click the price filter and select under $1000"
   ```

5. **Query**: Get filtered results:
   ```bash
   node dist/src/cli.js query "List all laptop names and prices in the current results in JSON format"
   ```

6. **Assert**: Verify filter applied:
   ```bash
   node dist/src/cli.js assert "all displayed prices are under $1000"
   ```

7. **Close** the browser:
   ```bash
   node dist/src/cli.js close
   ```

---

## Example 8: Social Media Post Interaction

**User request**: "Like and comment on a post"

**Workflow**:

1. **Navigate** to the post:
   ```bash
   node dist/src/cli.js navigate https://example.com/post/123
   ```

2. **Assert**: Verify post loaded:
   ```bash
   node dist/src/cli.js assert "the post content is visible"
   ```

3. **Act**: Click like:
   ```bash
   node dist/src/cli.js act "click the Like button"
   ```

4. **Act**: Add comment:
   ```bash
   node dist/src/cli.js act "click the comment box and type 'Great post!'"
   ```

5. **Act**: Submit comment:
   ```bash
   node dist/src/cli.js act "click the Submit Comment button"
   ```

6. **Screenshot**:
   ```bash
   node dist/src/cli.js screenshot
   ```

7. **Close** the browser:
   ```bash
   node dist/src/cli.js close
   ```

---

## Example 9: Table Data Extraction

**User request**: "Extract all data from a table on the page"

**Workflow**:

1. **Navigate** to page with table:
   ```bash
   node dist/src/cli.js navigate https://example.com/data-table
   ```

2. **Query**: Extract table data:
   ```bash
   node dist/src/cli.js query "Extract all rows from the data table with columns: Name, Email, Status, Date. Return as JSON array"
   ```

3. **Assert**: Verify data exists:
   ```bash
   node dist/src/cli.js assert "the table has more than 0 rows"
   ```

4. **Close** the browser:
   ```bash
   node dist/src/cli.js close
   ```

---

## Example 10: Multi-Page Navigation

**User request**: "Navigate through pagination to collect data from multiple pages"

**Workflow**:

1. **Navigate** to first page:
   ```bash
   node dist/src/cli.js navigate https://example.com/articles?page=1
   ```

2. **Query**: Extract page 1 data:
   ```bash
   node dist/src/cli.js query "Extract all article titles and authors on this page"
   ```

3. **Act**: Go to next page:
   ```bash
   node dist/src/cli.js act "click the Next Page button"
   ```

4. **Query**: Extract page 2 data:
   ```bash
   node dist/src/cli.js query "Extract all article titles and authors on this page"
   ```

5. **Assert**: Check if more pages:
   ```bash
   node dist/src/cli.js assert "there is a Next Page button visible"
   ```

6. **Close** the browser:
   ```bash
   node dist/src/cli.js close
   ```

---

## Frontend Verification Examples

### Example 11: Login Form Verification

**User request**: "Verify the login form works correctly"

**Workflow**:

1. **Navigate** to login page:
   ```bash
   node dist/src/cli.js navigate http://localhost:3000/login
   ```

2. **Verify** form elements exist:
   ```bash
   node dist/src/cli.js assert "email input field is visible"
   node dist/src/cli.js assert "password input field is visible"
   node dist/src/cli.js assert "login button is visible"
   ```

3. **Test** empty submission:
   ```bash
   node dist/src/cli.js act "click the login button"
   node dist/src/cli.js assert "validation error messages are shown for required fields"
   ```

4. **Test** invalid email:
   ```bash
   node dist/src/cli.js act "type 'not-an-email' into the email field"
   node dist/src/cli.js act "click the login button"
   node dist/src/cli.js assert "email format error message is displayed"
   ```

5. **Test** successful login:
   ```bash
   node dist/src/cli.js act "clear the email field and type 'user@example.com'"
   node dist/src/cli.js act "type 'password123' into the password field"
   node dist/src/cli.js act "click the login button"
   node dist/src/cli.js assert "page redirected to dashboard"
   ```

6. **Screenshot** and **close**:
   ```bash
   node dist/src/cli.js screenshot
   node dist/src/cli.js close
   ```

**Verification summary**:

| # | Check | Status |
|---|-------|--------|
| 1 | Form elements visible | PASS |
| 2 | Empty submission shows errors | PASS |
| 3 | Invalid email shows error | PASS |
| 4 | Valid login redirects to dashboard | PASS |

---

### Example 12: Interactive Feedback Verification

**User request**: "Check that buttons and interactions give proper feedback"

**Workflow**:

1. **Navigate** to the page:
   ```bash
   node dist/src/cli.js navigate http://localhost:3000/settings
   ```

2. **Verify** button states:
   ```bash
   node dist/src/cli.js assert "the save button is visible and enabled"
   ```

3. **Test** save action feedback:
   ```bash
   node dist/src/cli.js act "click the save button"
   node dist/src/cli.js assert "a success notification or toast message appears"
   node dist/src/cli.js screenshot
   ```

4. **Test** delete confirmation:
   ```bash
   node dist/src/cli.js act "click the delete button"
   node dist/src/cli.js assert "a confirmation dialog is shown"
   node dist/src/cli.js act "click cancel in the confirmation dialog"
   node dist/src/cli.js assert "the item is still present on the page"
   ```

5. **Close**:
   ```bash
   node dist/src/cli.js close
   ```

---

### Example 13: Data Display Verification

**User request**: "Verify the product list page shows correct data"

**Workflow**:

1. **Navigate** to product list:
   ```bash
   node dist/src/cli.js navigate http://localhost:3000/products
   ```

2. **Verify** list rendering:
   ```bash
   node dist/src/cli.js assert "the product list is visible with at least 1 item"
   node dist/src/cli.js assert "each product shows name, price, and image"
   ```

3. **Extract** and verify data:
   ```bash
   node dist/src/cli.js query "How many products are displayed on the page?"
   node dist/src/cli.js query "Extract the first 3 product names and prices as JSON"
   ```

4. **Verify** pagination:
   ```bash
   node dist/src/cli.js assert "pagination controls are visible at the bottom"
   node dist/src/cli.js act "click the next page button"
   node dist/src/cli.js assert "the product list updated with different products"
   ```

5. **Verify** empty state:
   ```bash
   node dist/src/cli.js navigate http://localhost:3000/products?search=nonexistent
   node dist/src/cli.js assert "an empty state message like 'No products found' is shown"
   ```

6. **Close**:
   ```bash
   node dist/src/cli.js close
   ```

---

### Example 14: Responsive Layout Verification

**User request**: "Check if the page layout is correct on mobile"

**Note**: This requires launching Chrome with mobile emulation or resizing the viewport. Currently this can be done by navigating with specific viewport parameters or through Chrome DevTools.

**Workflow**:

1. **Navigate** to the page:
   ```bash
   node dist/src/cli.js navigate http://localhost:3000
   ```

2. **Verify** desktop layout:
   ```bash
   node dist/src/cli.js assert "the navigation bar is visible at the top"
   node dist/src/cli.js assert "the sidebar is visible on the left"
   node dist/src/cli.js screenshot
   ```

3. **Verify** key content:
   ```bash
   node dist/src/cli.js assert "the main content area shows the expected content"
   node dist/src/cli.js assert "the footer is present at the bottom of the page"
   ```

4. **Close**:
   ```bash
   node dist/src/cli.js close
   ```

---

## Tips for Effective Use

### Natural Language Descriptions

**Good examples**:
- ✅ "click the blue Submit button at the bottom of the form"
- ✅ "type 'john@example.com' into the email field with placeholder 'Enter email'"
- ✅ "scroll down to the footer section"

**Less effective**:
- ❌ "click the button" (too vague)
- ❌ "type text" (missing what and where)
- ❌ "scroll" (missing direction and target)

### Query Formatting

**Structured data requests**:
- ✅ "Extract product data in JSON format: {name, price, rating, inStock}"
- ✅ "List all items as comma-separated values"
- ✅ "Get the table data as a JSON array of objects"

**Specific questions**:
- ✅ "What is the current temperature shown on the page?"
- ✅ "How many items are in the shopping cart?"
- ✅ "What error message is displayed?"

### Assertion Best Practices

**Clear conditions**:
- ✅ "the login button is visible and enabled"
- ✅ "the page title contains 'Dashboard'"
- ✅ "there are exactly 10 items in the list"
- ✅ "the success message says 'Order placed successfully'"

**Avoid vague assertions**:
- ❌ "the page is correct"
- ❌ "everything is fine"
- ❌ "it works"

### Error Recovery

If a command fails:

1. **Check the screenshot**: See what the page actually looks like
2. **Use query**: Ask "What elements are visible on the page?"
3. **Be more specific**: Add more context to your action or query
4. **Wait if needed**: Pages might need time to load dynamic content
5. **Try alternative approach**: If clicking doesn't work, try keyboard navigation

### Performance Tips

1. **Keep browser open**: Don't close between related tasks
2. **Chain commands**: Execute multiple operations in sequence
3. **Use assertions**: Verify state before proceeding
4. **Take screenshots**: Visual verification catches issues early
5. **Batch queries**: Extract multiple pieces of data in one query when possible
