#!/bin/bash

# Web 4X Game Testing Script

echo "🎮 Web 4X Game - Automated Browser Testing"
echo "=========================================="
echo ""

# Create screenshots directory if it doesn't exist
mkdir -p screenshots

# Build the Docker image
echo "📦 Building Docker image..."
docker build -t web4x-test . || {
    echo "❌ Failed to build Docker image"
    exit 1
}

echo ""
echo "🚀 Running tests..."
echo ""

# Run the tests with volume mount for screenshots
docker run --rm -v $(pwd)/screenshots:/home/pptruser/screenshots web4x-test || {
    echo "❌ Tests failed"
    exit 1
}

echo ""
echo "✅ Tests completed successfully!"
echo ""
echo "📸 Screenshots saved in ./screenshots/"
echo "📊 Test report available at ./screenshots/test-report.json"
echo ""

# List the generated files
echo "Generated files:"
ls -la screenshots/

echo ""
echo "To view the test report:"
echo "  cat screenshots/test-report.json | jq"
echo ""
echo "To view screenshots:"
echo "  open screenshots/  (on macOS)"
echo "  xdg-open screenshots/  (on Linux)"
echo "  explorer.exe screenshots  (on Windows/WSL)"