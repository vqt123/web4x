#!/usr/bin/env node
const puppeteer = require('puppeteer');

async function testUI() {
    console.log('🧪 Starting UI tests...');
    
    const browser = await puppeteer.launch({
        headless: true,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-gpu'
        ]
    });

    try {
        const page = await browser.newPage();
        
        // Test 1: Basic page load
        console.log('📄 Testing page load...');
        await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
        
        const title = await page.title();
        console.log(`✅ Page loaded - Title: ${title}`);
        
        // Test 2: Check if game elements are present
        console.log('🎮 Testing game elements...');
        
        const actionButtons = await page.$$('.action-button');
        console.log(`✅ Found ${actionButtons.length} action buttons`);
        
        const resourceDisplay = await page.$('#resources');
        if (resourceDisplay) {
            console.log('✅ Resource display found');
        } else {
            console.log('❌ Resource display not found');
        }
        
        // Test 3: Test action buttons
        console.log('🔘 Testing explore action...');
        
        const exploreButton = await page.$('#exploreBtn');
        if (exploreButton) {
            await exploreButton.click();
            console.log('✅ Explore button clicked');
            
            // Wait for action result
            await page.waitForTimeout(2000);
            
            const activityLog = await page.$('#activity-log');
            if (activityLog) {
                const logText = await page.evaluate(el => el.textContent, activityLog);
                if (logText.includes('discovered')) {
                    console.log('✅ Explore action successful - discovery logged');
                } else {
                    console.log('❌ Explore action may have failed');
                }
            }
        } else {
            console.log('❌ Explore button not found');
        }
        
        // Test 4: Test multiplayer connection
        console.log('🌐 Testing multiplayer connection...');
        
        const connectionStatus = await page.evaluate(() => {
            return window.socket ? window.socket.connected : false;
        });
        
        if (connectionStatus) {
            console.log('✅ WebSocket connection established');
        } else {
            console.log('❌ WebSocket connection failed');
        }
        
        // Test 5: Test guest ID persistence
        console.log('🆔 Testing guest ID...');
        
        const guestId = await page.evaluate(() => {
            return localStorage.getItem('guestId');
        });
        
        if (guestId) {
            console.log(`✅ Guest ID found: ${guestId}`);
        } else {
            console.log('❌ Guest ID not found');
        }
        
        console.log('🎉 UI tests completed!');
        
    } catch (error) {
        console.error('❌ Test failed:', error.message);
    } finally {
        await browser.close();
    }
}

// Run tests
testUI().catch(console.error);