# Web 4X Game Project Context

## Project Overview
Turn-based, asynchronous web 4X game designed for 2-week matches with multiple daily sessions. Abstract resource mechanics focused on capacity discovery and development.

## Architecture
- **Current**: Single HTML file (`/index.html`) - Complete single-player implementation
- **Transitioning to**: Client-server architecture for multiplayer support
- **Tick-based system**: Clean time management with acceleration support
- **Debug mode**: Speed acceleration for testing (see config)
- **Multiplayer**: Node.js + Socket.io server with guest accounts (see @client-server-architecture.md)

## Key Documentation

### Design & Vision
- **@game-design-doc.md** - Core game design, mechanics, and progression
- **@development-plan.md** - Implementation phases and testing protocols

### Multiplayer Architecture
- **@client-server-architecture.md** - Technical architecture for multiplayer
- **@multiplayer-development-plan.md** - Step-by-step multiplayer implementation

### Configuration
- **@game-config.json** - All balance parameters and game constants

### Development Status
- **Phase 1 Enhanced**: Core loop with resource management complete
- **Current**: Tick-based architecture with storage caps and debug tools
- **Next**: Multiplayer implementation (Phase 2) - see @multiplayer-development-plan.md

## Quick Start

### Single-player (current)
```bash
# Start local server
python3 -m http.server 8000 &

# Open game
# http://localhost:8000

# Stop server
pkill -f "python3 -m http.server 8000"
```

### Multiplayer (in development)
```bash
# Install dependencies (first time)
npm install

# Start Node.js server in background
nohup npm run dev > server.log 2>&1 &

# Open game
# http://localhost:3000

# Stop server
pkill -f "nodemon.*server.js" || pkill -f "node.*server.js"
```

## Core Loop
1. **Explore** - Discover resource capacity
2. **Develop** - Convert capacity to generation
3. **Expand Storage** - Increase resource caps
4. **Debug Toggle** - Speed acceleration for testing

## Technical Notes

### Current Implementation
- Tick processing: `processGameTicks()` handles normal or accelerated time
- Resource format: `current/cap (+generation/Hr capacity/Hr Max)`
- Auto-completion: Timers complete automatically
- Time displays: Wall clock, session timer, tick counter

### Multiplayer Architecture
- Guest ID system: Persistent accounts using localStorage + UUID
- WebSocket communication: Real-time state synchronization
- Server authority: All game logic runs server-side
- In-memory storage: No database required for MVP

## Implementation Priorities
1. ✅ Core explore→develop loop
2. ✅ Resource management with caps
3. ✅ Debug speed mode
4. ✅ Multiplayer foundation (Phase 2 - complete)
5. 🔄 Research system
6. 🔄 Trading mechanics
7. 🔄 Multiple worlds & matchmaking

## Testing Requirements

### Background Processes
**IMPORTANT**: Always run long-running processes in the background using `nohup` and `&`:
```bash
# Correct way to start server
nohup npm run dev > server.log 2>&1 &

# Correct way to run tests
nohup node test-client.js > test.log 2>&1 &
```

### UI Testing
**IMPORTANT**: WSL/Windows environments cannot run Puppeteer/Chrome directly.
**Required**: Use Docker for all UI testing:

```bash
# Build Docker test environment
docker build -t web4x-test -f Dockerfile.test .

# Run UI tests in Docker
docker run --rm -p 3000:3000 web4x-test npm run test:ui

# Run multiplayer tests
docker run --rm -p 3000:3000 web4x-test npm run test:multiplayer
```

### Server-Side Testing
WebSocket and server logic can be tested directly with Node.js clients:
```bash
# Install test dependencies
npm install socket.io-client

# Run multiplayer simulation
nohup node test-client.js > test.log 2>&1 &
```