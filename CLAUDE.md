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

# Start Node.js server
npm run dev

# Open game
# http://localhost:3000
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
4. 🚧 Multiplayer foundation (Phase 2 - in progress)
5. 🔄 Research system
6. 🔄 Trading mechanics
7. 🔄 Multiple worlds & matchmaking