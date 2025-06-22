# Web 4X Game Project Context

## Project Overview
Turn-based, asynchronous web 4X game designed for 2-week matches with multiple daily sessions. Abstract resource mechanics focused on capacity discovery and development.

## Architecture
- **Current**: Client-server architecture (Node.js + Socket.io) - Required for testing
- **Focus**: Single-player experience with refined pacing and progression
- **Tick-based system**: Clean time management with acceleration support
- **Debug mode**: Speed acceleration for testing (see config)
- **Code organization**: Keep all files under 250 lines, refactor into smaller components as needed

## Key Documentation

### Design & Vision
- **@game-design-doc.md** - Core game design, mechanics, and progression
- **@development-plan.md** - Implementation phases and testing protocols

### Testing Architecture
- **@client-server-architecture.md** - Technical architecture (needed for testing)
- **@multiplayer-development-plan.md** - Setup instructions for development server

### Code Organization
- **File size limit**: Maximum 250 lines per file
- **Component separation**: Split large files into focused, single-responsibility modules
- **Refactoring priority**: Break down complex functions and maintain clean architecture

### Configuration
- **@game-config.json** - All balance parameters and game constants

### Development Status
- **Phase 1 Enhanced**: Core loop with resource management complete
- **Current**: Single-player experience refinement and pacing optimization
- **Focus**: Research system, advanced mechanics, and long-term progression balance

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

### Development Server (for testing)
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

### Client-Server Architecture (Testing)
- Guest ID system: Persistent accounts using localStorage + UUID
- WebSocket communication: Real-time state synchronization
- Server authority: All game logic runs server-side
- In-memory storage: No database required for development

## Implementation Priorities
1. ✅ Core explore→develop loop
2. ✅ Resource management with caps
3. ✅ Debug speed mode
4. ✅ Client-server architecture (for testing)
5. 🔄 Research system and tech progression
6. 🔄 Advanced single-player mechanics
7. 🔄 Long-term progression and pacing refinement

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