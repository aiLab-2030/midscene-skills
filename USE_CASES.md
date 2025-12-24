# Midscene Skills - Use Cases & Examples

## 🎯 Real-World Application Scenarios

Here are practical use cases where Midscene Skills excels, leveraging its AI-powered visual understanding and natural language automation.

---

## 1. 🔍 Web Scraping & Data Extraction

### Scenario: E-commerce Price Monitoring
Monitor competitor prices across multiple e-commerce platforms without maintaining brittle CSS selectors.

**Example: Amazon Product Monitoring**
```bash
#!/bin/bash
# monitor-prices.sh

PRODUCTS=(
  "https://www.amazon.com/product-a"
  "https://www.amazon.com/product-b"
  "https://www.amazon.com/product-c"
)

for URL in "${PRODUCTS[@]}"; do
  echo "Checking: $URL"
  
  tsx src/cli.ts navigate "$URL"
  
  # Extract product info using natural language
  RESULT=$(tsx src/cli.ts query "Extract product name, price, and availability as JSON")
  
  # Save to database or send alert
  echo "$RESULT" | jq '.result' >> prices-$(date +%Y%m%d).json
  
  sleep 2
done

tsx src/cli.ts close
```

**Why Midscene?** 
- No need to reverse-engineer HTML structures
- Adapts to page layout changes automatically
- Works across different e-commerce platforms with the same commands

---

### Scenario: News Aggregation
Collect news articles from multiple sources for content curation.

**Example: Tech News Collector**
```bash
#!/bin/bash
# news-collector.sh

SOURCES=(
  "https://news.ycombinator.com"
  "https://techcrunch.com"
  "https://www.theverge.com"
)

for SOURCE in "${SOURCES[@]}"; do
  tsx src/cli.ts navigate "$SOURCE"
  
  # Natural language query adapts to each site's layout
  tsx src/cli.ts query "Extract the top 10 article titles, links, and authors as JSON array" > "news-${SOURCE//\//_}.json"
  
  sleep 3
done

tsx src/cli.ts close
```

---

## 2. 🧪 Automated Testing & QA

### Scenario: Cross-Browser UI Testing
Test user flows across your web application without writing complex test frameworks.

**Example: Login Flow Testing**
```bash
#!/bin/bash
# test-login-flow.sh

echo "=== Testing Login Flow ==="

# Navigate to login page
tsx src/cli.ts navigate "https://your-app.com/login"

# Verify login button exists
tsx src/cli.ts assert "Login button is visible"

# Fill in credentials
tsx src/cli.ts act "type 'testuser@example.com' in the email field"
tsx src/cli.ts act "type 'password123' in the password field"

# Click login
tsx src/cli.ts act "click the login button"

sleep 3

# Verify successful login
tsx src/cli.ts assert "User dashboard is visible"
tsx src/cli.ts assert "Welcome message contains 'testuser'"

# Take evidence screenshot
tsx src/cli.ts screenshot

# Verify user menu
tsx src/cli.ts act "click the user profile icon"
tsx src/cli.ts assert "Logout option is available"

echo "✅ Login flow test passed"

tsx src/cli.ts close
```

**Why Midscene?**
- Visual verification instead of brittle element selectors
- Natural language assertions are human-readable
- Screenshots provide test evidence automatically

---

### Scenario: Regression Testing
Quickly verify that UI changes haven't broken existing functionality.

**Example: Form Validation Testing**
```bash
#!/bin/bash
# test-form-validation.sh

tsx src/cli.ts navigate "https://your-app.com/signup"

# Test empty form submission
tsx src/cli.ts act "click the submit button"
tsx src/cli.ts assert "Error message appears for required fields"

# Test invalid email
tsx src/cli.ts act "type 'invalid-email' in the email field"
tsx src/cli.ts act "click submit"
tsx src/cli.ts assert "Email validation error is shown"

# Test valid submission
tsx src/cli.ts act "type 'valid@example.com' in the email field"
tsx src/cli.ts act "type 'SecurePass123' in the password field"
tsx src/cli.ts act "click submit"
tsx src/cli.ts assert "Success message appears"

tsx src/cli.ts close
```

---

## 3. 🤖 AI Agent Integration

### Scenario: Conversational Web Assistant
Use the interactive agent mode to let AI navigate and extract information based on user requests.

**Example: Research Assistant**
```bash
pnpm claude
```

Then ask:
```
You: Find the latest releases on GitHub for the 'midscenejs' organization and summarize them

AI: [Automatically navigates to GitHub, searches, extracts release notes, and summarizes]

You: Now check if there are any open issues tagged as 'bug'

AI: [Queries the issues page and reports findings]

You: Create a report with screenshots

AI: [Takes screenshots and compiles information]
```

**Why Midscene?**
- AI understands intent without explicit step-by-step instructions
- Adapts to different website layouts
- Can chain multiple operations intelligently

---

### Scenario: Competitive Intelligence
Automate competitor analysis by having AI browse and summarize information.

**Example: Feature Comparison**
```bash
pnpm claude "Visit our competitor's website at example.com, navigate to their pricing page, extract all plan features and prices, then compare with our pricing at our-site.com"
```

---

## 4. 📊 Monitoring & Alerting

### Scenario: Website Uptime & Content Monitoring
Check if critical pages are accessible and contain expected content.

**Example: Health Check Script**
```bash
#!/bin/bash
# health-check.sh

PAGES=(
  "https://your-site.com:Home page"
  "https://your-site.com/login:Login page"
  "https://your-site.com/api/docs:API documentation"
)

ERRORS=0

for PAGE in "${PAGES[@]}"; do
  URL="${PAGE%%:*}"
  NAME="${PAGE#*:}"
  
  echo "Checking: $NAME"
  
  RESULT=$(tsx src/cli.ts navigate "$URL")
  
  if echo "$RESULT" | jq -e '.success == true' > /dev/null; then
    echo "✅ $NAME is accessible"
  else
    echo "❌ $NAME is DOWN"
    ERRORS=$((ERRORS + 1))
    
    # Send alert (example with Slack webhook)
    curl -X POST $SLACK_WEBHOOK \
      -H 'Content-Type: application/json' \
      -d "{\"text\":\"🚨 $NAME is down!\"}"
  fi
  
  sleep 2
done

tsx src/cli.ts close

if [ $ERRORS -gt 0 ]; then
  exit 1
fi
```

**Setup as Cron Job:**
```bash
# Check every 5 minutes
*/5 * * * * /path/to/health-check.sh
```

---

### Scenario: Content Change Detection
Get notified when specific content changes on a webpage.

**Example: Product Stock Monitoring**
```bash
#!/bin/bash
# stock-monitor.sh

tsx src/cli.ts navigate "https://store.example.com/product/ps5"

STOCK=$(tsx src/cli.ts query "Is the product in stock? Answer yes or no")

if echo "$STOCK" | grep -i "yes" > /dev/null; then
  echo "🎉 Product is in stock!"
  
  # Send notification
  osascript -e 'display notification "PS5 is back in stock!" with title "Stock Alert"'
  
  # Or send email
  # mail -s "Product In Stock" you@example.com <<< "Check it out!"
else
  echo "❌ Still out of stock"
fi

tsx src/cli.ts close
```

**Run periodically:**
```bash
# Check every 15 minutes
*/15 * * * * /path/to/stock-monitor.sh
```

---

## 5. 📝 Content Creation & Documentation

### Scenario: Automated Screenshot Documentation
Generate visual documentation for your product or website changes.

**Example: Feature Documentation Generator**
```bash
#!/bin/bash
# document-features.sh

FEATURES=(
  "Dashboard overview"
  "User profile settings"
  "Payment methods"
  "Analytics page"
  "Admin panel"
)

mkdir -p documentation/screenshots

tsx src/cli.ts navigate "https://your-app.com/login"
tsx src/cli.ts act "login with credentials testuser@example.com / password123"

for FEATURE in "${FEATURES[@]}"; do
  echo "Documenting: $FEATURE"
  
  # Navigate to feature (AI understands intent)
  tsx src/cli.ts act "navigate to $FEATURE"
  
  sleep 2
  
  # Take screenshot
  tsx src/cli.ts screenshot
  
  # Get description
  DESCRIPTION=$(tsx src/cli.ts query "Describe what this page does and list main UI elements")
  
  echo "$DESCRIPTION" > "documentation/${FEATURE// /_}.md"
done

tsx src/cli.ts close

echo "📚 Documentation generated in documentation/"
```

---

### Scenario: Tutorial Video Script Generation
Create step-by-step guides by recording actions.

**Example: Onboarding Flow Documentation**
```bash
#!/bin/bash
# record-onboarding.sh

STEPS=(
  "Click sign up button"
  "Fill in email and password"
  "Verify email page appears"
  "Complete profile information"
  "Upload profile picture"
  "View dashboard tutorial"
)

tsx src/cli.ts navigate "https://your-app.com"

echo "# Onboarding Flow" > onboarding-guide.md
echo "" >> onboarding-guide.md

STEP_NUM=1
for STEP in "${STEPS[@]}"; do
  echo "Step $STEP_NUM: $STEP"
  
  tsx src/cli.ts act "$STEP"
  tsx src/cli.ts screenshot
  
  # Get screenshot path from output
  DESCRIPTION=$(tsx src/cli.ts query "What changed on the page after this action?")
  
  echo "## Step $STEP_NUM: $STEP" >> onboarding-guide.md
  echo "$DESCRIPTION" >> onboarding-guide.md
  echo "" >> onboarding-guide.md
  
  STEP_NUM=$((STEP_NUM + 1))
  sleep 2
done

tsx src/cli.ts close
```

---

## 6. 🔄 Data Migration & Synchronization

### Scenario: Multi-Platform Content Sync
Extract data from one platform and prepare it for import to another.

**Example: Blog Post Migration**
```bash
#!/bin/bash
# migrate-blog-posts.sh

OLD_BLOG_POSTS=(
  "https://old-blog.com/post-1"
  "https://old-blog.com/post-2"
  "https://old-blog.com/post-3"
)

mkdir -p migrated-posts

for POST_URL in "${OLD_BLOG_POSTS[@]}"; do
  echo "Migrating: $POST_URL"
  
  tsx src/cli.ts navigate "$POST_URL"
  
  # Extract post data
  POST_DATA=$(tsx src/cli.ts query "Extract the post title, author, date, content, and tags as JSON")
  
  # Save for import
  POST_ID=$(echo "$POST_URL" | sed 's|.*/||')
  echo "$POST_DATA" | jq '.result' > "migrated-posts/$POST_ID.json"
  
  sleep 2
done

tsx src/cli.ts close

echo "✅ Migration data prepared in migrated-posts/"
```

---

## 7. 🎮 Gaming & Entertainment

### Scenario: Game Stats Tracking
Automatically collect and track game statistics from web-based games or gaming platforms.

**Example: Leaderboard Scraper**
```bash
#!/bin/bash
# track-leaderboard.sh

tsx src/cli.ts navigate "https://game-site.com/leaderboard"

# Wait for page to load
sleep 3

# Extract current standings
STANDINGS=$(tsx src/cli.ts query "Extract the top 20 players with their ranks, names, and scores as JSON")

# Store with timestamp
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
echo "$STANDINGS" | jq '.result' > "leaderboard_$TIMESTAMP.json"

# Check your rank
YOUR_RANK=$(tsx src/cli.ts query "What is the rank for player 'YourUsername'?")

echo "Your current rank: $YOUR_RANK"

tsx src/cli.ts close
```

---

## 8. 🏢 Business Intelligence

### Scenario: Social Media Monitoring
Track brand mentions and engagement across social platforms.

**Example: Twitter/X Mention Tracker**
```bash
#!/bin/bash
# monitor-mentions.sh

SEARCH_TERM="YourBrandName"

tsx src/cli.ts navigate "https://twitter.com/search?q=$SEARCH_TERM"

# Get recent mentions
MENTIONS=$(tsx src/cli.ts query "Extract the 10 most recent tweets mentioning '$SEARCH_TERM' with author, text, and timestamp as JSON")

# Analyze sentiment (you could integrate with sentiment analysis API)
echo "$MENTIONS" | jq '.result[] | .text' > recent-mentions.txt

# Count mentions
COUNT=$(echo "$MENTIONS" | jq '.result | length')

echo "Found $COUNT recent mentions of $SEARCH_TERM"

tsx src/cli.ts close
```

---

## 🚀 Getting Started with These Use Cases

1. **Choose a use case** that fits your needs
2. **Copy the example script** and customize it
3. **Configure environment variables** (see [ENVIRONMENT_SETUP.md](./ENVIRONMENT_SETUP.md))
4. **Run the script** and iterate

### Tips for Success:

- **Start simple**: Begin with basic navigation and queries
- **Use natural language**: Describe actions as you would to a human
- **Add error handling**: Check for `success: true` in responses
- **Take screenshots**: Visual evidence helps debugging
- **Iterate**: Refine your descriptions based on results

### Combining Use Cases:

Many of these scenarios can be combined. For example:
- **Testing + Monitoring**: Run tests periodically and alert on failures
- **Scraping + Documentation**: Extract data and generate reports
- **AI Agent + BI**: Let AI explore data sources and create insights

---

## 📚 More Resources

- [User Guide](./USER_GUIDE.md) - Detailed usage instructions
- [Environment Setup](./ENVIRONMENT_SETUP.md) - Configuration guide
- [Midscene Documentation](https://midscenejs.com/) - Official docs

---

## 💡 Need Help?

If you have a use case not covered here, try:

1. **Interactive mode**: `pnpm claude` and describe what you want to do
2. **Start simple**: Break down your task into basic commands
3. **Experiment**: Midscene's AI is flexible and adapts to many scenarios

Happy automating! 🎉
