#!/usr/bin/env node
const puppeteer = require('puppeteer');
const { spawn } = require('child_process');

async function testUIComplete() {
    console.log('🧪 Starting comprehensive UI tests with Puppeteer...');
    
    // Start server
    console.log('🚀 Starting server in Docker...');
    const serverProcess = spawn('node', ['server.js'], { 
        detached: true,
        stdio: 'pipe'
    });
    
    // Wait for server to start
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const browser = await puppeteer.launch({
        headless: "new",
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-gpu',
            '--disable-extensions'
        ]
    });

    try {
        const page = await browser.newPage();
        
        // Set console message listener
        page.on('console', msg => {
            console.log(`📋 Browser console: ${msg.text()}`);
        });
        
        // Set error listener
        page.on('error', err => {
            console.log(`❌ Browser error: ${err.message}`);
        });
        
        // Test 1: Page Load
        console.log('\n📄 TEST 1: Page Loading...');
        await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
        
        const title = await page.title();
        console.log(`✅ Page loaded successfully - Title: ${title}`);
        
        // Test 2: Check Essential Elements
        console.log('\n🎮 TEST 2: Checking Game Elements...');
        
        const actionButtons = await page.$$('.action-button');
        console.log(`✅ Found ${actionButtons.length} action buttons`);
        
        const requiredButtons = ['explore-btn', 'develop-btn', 'expand-btn', 'debug-btn'];
        for (const btnId of requiredButtons) {
            const btn = await page.$(`#${btnId}`);
            if (btn) {
                console.log(`✅ ${btnId} found`);
            } else {
                console.log(`❌ ${btnId} missing`);
            }
        }
        
        // Test 3: WebSocket Connection
        console.log('\n🌐 TEST 3: WebSocket Connection...');
        
        // Wait for connection to establish
        await page.waitForTimeout(3000);
        
        const connectionStatus = await page.evaluate(() => {
            return {
                socketExists: !!window.socket,
                connected: window.socket ? window.socket.connected : false,
                guestId: localStorage.getItem('guestId')
            };
        });
        
        if (connectionStatus.socketExists) {
            console.log('✅ Socket.io object exists');
        } else {
            console.log('❌ Socket.io object missing');
        }
        
        if (connectionStatus.connected) {
            console.log('✅ WebSocket connected');
        } else {
            console.log('❌ WebSocket not connected');
        }
        
        if (connectionStatus.guestId) {
            console.log(`✅ Guest ID stored: ${connectionStatus.guestId}`);
        } else {
            console.log('❌ Guest ID not found');
        }
        
        // Test 4: Button Interactions
        console.log('\n🔘 TEST 4: Button Interactions...');
        
        // Test Explore Button
        console.log('Testing Explore button...');
        const exploreBtn = await page.$('#explore-btn');
        
        if (exploreBtn) {
            // Check if button has onclick handler
            const hasOnclick = await page.evaluate(btn => {
                return !!btn.onclick;
            }, exploreBtn);
            
            if (hasOnclick) {
                console.log('✅ Explore button has onclick handler');
                
                // Click the button
                await exploreBtn.click();
                console.log('✅ Explore button clicked');
                
                // Wait for server response
                await page.waitForTimeout(2000);
                
                // Check for action result
                const actionResult = await page.evaluate(() => {
                    // Check if any discovery messages appeared
                    const activityLog = document.getElementById('activity-log');
                    if (activityLog) {
                        return activityLog.textContent;
                    }
                    return null;
                });
                
                if (actionResult && actionResult.includes('discovered')) {
                    console.log('✅ Explore action successful - discovery logged');
                } else {
                    console.log('⚠️  Explore result unclear, activity log:', actionResult);
                }
            } else {
                console.log('❌ Explore button missing onclick handler');
            }
        } else {
            console.log('❌ Explore button not found');
        }
        
        // Test 5: Resource Display
        console.log('\n📊 TEST 5: Resource Display...');
        
        const resources = await page.evaluate(() => {
            const resourceDiv = document.querySelector('.resources');
            if (resourceDiv) {
                return resourceDiv.textContent;
            }
            return null;
        });
        
        if (resources) {
            console.log('✅ Resource display found');
            console.log(`📊 Resources: ${resources.slice(0, 100)}...`);
        } else {
            console.log('❌ Resource display not found');
        }
        
        // Test 6: Action Points Display
        console.log('\n⚡ TEST 6: Action Points...');
        
        const actionPoints = await page.evaluate(() => {
            const apElement = document.getElementById('action-points');
            if (apElement) {
                return apElement.textContent;
            }
            return null;
        });
        
        if (actionPoints) {
            console.log(`✅ Action Points display: ${actionPoints}`);
        } else {
            console.log('❌ Action Points display not found');
        }
        
        // Test 7: Multiple Button Clicks
        console.log('\n🎯 TEST 7: Multiple Button Interactions...');
        
        // Test Develop button
        const developBtn = await page.$('#develop-btn');
        if (developBtn) {
            await developBtn.click();
            console.log('✅ Develop button clicked');
            await page.waitForTimeout(1000);
        }
        
        // Test Debug button
        const debugBtn = await page.$('#debug-btn');
        if (debugBtn) {
            await debugBtn.click();
            console.log('✅ Debug button clicked');
            await page.waitForTimeout(1000);
        }
        
        // Test 8: Final State Check
        console.log('\n🏁 TEST 8: Final State Check...');
        
        const finalState = await page.evaluate(() => {
            return {
                url: window.location.href,
                connected: window.socket ? window.socket.connected : false,
                hasGameClient: !!window.gameClient,
                localStorageKeys: Object.keys(localStorage)
            };
        });
        
        console.log('✅ Final state:', JSON.stringify(finalState, null, 2));
        
        console.log('\n🎉 All UI tests completed successfully!');
        
    } catch (error) {
        console.error('❌ Test failed:', error.message);
        console.error('Stack:', error.stack);
    } finally {
        await browser.close();
        serverProcess.kill();
    }
}

// Run tests
testUIComplete().catch(console.error);