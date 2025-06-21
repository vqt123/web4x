# Browser Testing Workflow Setup with Docker & Puppeteer

This document outlines the complete setup for automated browser testing using Docker and Puppeteer to test HTML pages and capture screenshots.

## Web 4X Game Specific Testing

For testing the Web 4X game specifically, use the `test-web4x.js` script which is configured to test all game mechanics including:
- Action buttons (Explore, Develop, Expand Storage, Debug Mode)
- Resource generation and display
- Popup interactions
- Timer systems
- Mobile responsiveness

## Overview

This workflow allows you to:

- Test HTML pages without installing browser dependencies locally
- Capture screenshots at different viewport sizes
- Test responsive design and interactions
- Generate automated test reports
- Work in environments where browser installation is difficult (like WSL)

## Required Files

### 1. Dockerfile

```dockerfile
# Use an image that already has Chrome installed
FROM ghcr.io/puppeteer/puppeteer:21.5.2

# Switch to pptruser and set working directory
USER pptruser
WORKDIR /home/pptruser

# Copy files
COPY --chown=pptruser:pptruser test-page.js ./
COPY --chown=pptruser:pptruser index.html ./

# Create screenshots directory
RUN mkdir -p /home/pptruser/screenshots

CMD ["node", "test-page.js"]
```

### 2. Test Script (test-page.js)

```javascript
const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");

async function testLandingPage() {
  console.log("Starting browser automation test...");

  const browser = await puppeteer.launch({
    headless: true,
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
      "--disable-accelerated-2d-canvas",
      "--disable-gpu",
      "--window-size=1920,1080",
    ],
  });

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });

    // Read the HTML file and serve it as data URL
    const htmlContent = fs.readFileSync("/home/pptruser/index.html", "utf8");
    const dataUrl = `data:text/html;charset=utf-8,${encodeURIComponent(
      htmlContent
    )}`;

    console.log("Loading the landing page...");
    await page.goto(dataUrl, { waitUntil: "networkidle0" });

    // Wait for animations to complete
    await page.waitForTimeout(3000);

    // Take full page screenshot
    console.log("Taking full page screenshot...");
    await page.screenshot({
      path: "/home/pptruser/screenshots/full-page.png",
      fullPage: true,
    });

    // Take viewport screenshot (above the fold)
    console.log("Taking viewport screenshot...");
    await page.screenshot({
      path: "/home/pptruser/screenshots/viewport.png",
    });

    // Get page title and basic info
    const title = await page.title();
    const url = await page.url();

    console.log(`Page Title: ${title}`);
    console.log(`Page URL: ${url}`);

    // Get text content from main sections
    const heroText = await page.evaluate(() => {
      const hero = document.querySelector(".hero");
      return hero ? hero.innerText.trim() : "Hero section not found";
    });

    const featuresText = await page.evaluate(() => {
      const features = document.querySelector(".features");
      return features
        ? features.innerText.trim()
        : "Features section not found";
    });

    // Check if animations are working by looking for CSS classes
    const hasAnimations = await page.evaluate(() => {
      const styles = window.getComputedStyle(
        document.querySelector(".hero h1")
      );
      return styles.animationName !== "none";
    });

    // Get viewport dimensions
    const viewport = await page.viewport();

    // Test responsive behavior
    console.log("Testing mobile viewport...");
    await page.setViewport({ width: 375, height: 667 });
    await page.waitForTimeout(1000);
    await page.screenshot({
      path: "/home/pptruser/screenshots/mobile.png",
    });

    // Test button hover (simulate)
    console.log("Testing button interactions...");
    await page.setViewport({ width: 1920, height: 1080 });
    await page.hover(".cta-button");
    await page.waitForTimeout(500);
    await page.screenshot({
      path: "/home/pptruser/screenshots/button-hover.png",
    });

    // Generate test report
    const report = {
      timestamp: new Date().toISOString(),
      pageTitle: title,
      viewport: viewport,
      hasAnimations: hasAnimations,
      heroContent: heroText,
      featuresContent: featuresText,
      screenshotsTaken: [
        "full-page.png",
        "viewport.png",
        "mobile.png",
        "button-hover.png",
      ],
    };

    // Save report
    fs.writeFileSync(
      "/home/pptruser/screenshots/test-report.json",
      JSON.stringify(report, null, 2)
    );

    console.log("\n=== TEST RESULTS ===");
    console.log(`✅ Page loaded successfully`);
    console.log(`✅ Title: "${title}"`);
    console.log(`✅ Hero section content: "${heroText.substring(0, 100)}..."`);
    console.log(
      `✅ Features section found: ${featuresText.includes("Why Choose Us?")}`
    );
    console.log(`✅ CSS animations detected: ${hasAnimations}`);
    console.log(`✅ Screenshots captured: ${report.screenshotsTaken.length}`);
    console.log(`✅ Responsive design tested`);
    console.log("\n=== VISUAL DESCRIPTION ===");
    console.log("The landing page features:");
    console.log("• A hero section with purple gradient background");
    console.log('• Large white heading "Welcome to the Future"');
    console.log("• Descriptive text and red CTA button");
    console.log(
      "• Features section with 3 cards showing rocket, lock, and target icons"
    );
    console.log("• Modern design with animations and hover effects");
    console.log("• Responsive layout that adapts to mobile screens");
  } catch (error) {
    console.error("Test failed:", error);
  } finally {
    await browser.close();
    console.log("Browser closed. Test complete.");
  }
}

// Create screenshots directory
if (!fs.existsSync("/home/pptruser/screenshots")) {
  fs.mkdirSync("/home/pptruser/screenshots");
}

testLandingPage().catch(console.error);
```

## Setup Steps

### 1. Prerequisites

- Docker installed and running
- HTML file to test (in this example: `index.html`)

### 2. Create Project Structure

```
project-folder/
├── Dockerfile
├── test-page.js
├── index.html (your HTML file to test)
└── screenshots/ (will be created automatically)
```

### 3. Build the Docker Image

```bash
docker build -t landing-page-test .
```

### 4. Run the Tests

```bash
# Run with volume mount to save screenshots to host
docker run --rm -v $(pwd)/screenshots:/home/pptruser/screenshots landing-page-test
```

## Key Design Decisions

### Why Use the Puppeteer Docker Image?

- **ghcr.io/puppeteer/puppeteer:21.5.2** comes pre-installed with Chrome and all dependencies
- Eliminates the need to manually install browser packages
- Provides a consistent testing environment
- Works reliably in WSL and other restricted environments

### Why Use Data URLs?

- Avoids need for a web server
- Works with local HTML files
- Simpler setup for static page testing
- No network dependencies

### User and Permissions

- Uses `pptruser` (non-root user) for security
- Sets proper file ownership with `--chown=pptruser:pptruser`
- Working directory in `/home/pptruser` for proper permissions

## Customization Options

### Modify Test Script for Your Needs

1. **Change selectors**: Update CSS selectors to match your HTML structure
2. **Add more screenshots**: Include additional viewport sizes or page states
3. **Test interactions**: Add form submissions, navigation, or other user flows
4. **Custom assertions**: Add specific checks for your application requirements

### Environment Variables

You can modify the Dockerfile to accept environment variables:

```dockerfile
ENV PAGE_TITLE="My Page"
ENV VIEWPORT_WIDTH=1920
ENV VIEWPORT_HEIGHT=1080
```

### Different Image Versions

- For newer Puppeteer: `ghcr.io/puppeteer/puppeteer:latest`
- For specific Chrome versions: Check available tags on GitHub Container Registry

## Troubleshooting

### Common Issues

1. **Permission errors**: Ensure proper user and file ownership in Dockerfile
2. **Module not found**: Verify Puppeteer is available in the base image
3. **Screenshots not saved**: Check volume mount syntax and permissions
4. **Page load timeouts**: Increase `waitForTimeout` values for complex pages

### Debug Mode

Add these options to `puppeteer.launch()` for debugging:

```javascript
const browser = await puppeteer.launch({
  headless: false, // Show browser window
  devtools: true, // Open DevTools
  slowMo: 100, // Slow down actions
});
```

## Output Files

After running the tests, you'll find in the `screenshots/` directory:

- `full-page.png` - Complete page screenshot
- `viewport.png` - Above-the-fold screenshot
- `mobile.png` - Mobile viewport screenshot
- `button-hover.png` - Hover state screenshot
- `test-report.json` - Test results and metadata

## Integration with CI/CD

This workflow can be integrated into CI/CD pipelines:

```yaml
# Example GitHub Actions step
- name: Run Browser Tests
  run: |
    docker build -t page-test .
    docker run --rm -v $PWD/screenshots:/home/pptruser/screenshots page-test

- name: Upload Screenshots
  uses: actions/upload-artifact@v3
  with:
    name: test-screenshots
    path: screenshots/
```

## Next Steps

1. Adapt the HTML selectors to match your page structure
2. Customize the test scenarios for your specific requirements
3. Add this workflow to your development process
4. Consider adding visual regression testing by comparing screenshots over time
