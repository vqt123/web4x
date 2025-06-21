# Multiplayer Development Plan

## Overview
This document provides a step-by-step implementation guide for transforming the Web 4X game from single-player to multiplayer using the architecture defined in `client-server-architecture.md`.

## Development Phases

### Phase 1: Basic Server Setup ✅ COMPLETED
**Goal**: Create a working Node.js server that can serve the game files

**Tasks**:
1. [x] Create `package.json` with dependencies
2. [x] Create `server.js` with Express setup
3. [x] Move client files to `public/` directory
4. [x] Serve static files from Express
5. [x] Test that game still works when served from Node.js

**Success Criteria**:
- Game loads at `http://localhost:3000`
- All assets load correctly
- Single-player functionality unchanged

**Implementation**:
```javascript
// server.js skeleton
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

### Phase 2: WebSocket Integration ✅ COMPLETED
**Goal**: Establish real-time communication between client and server

**Tasks**:
1. [x] Add Socket.io to server
2. [x] Add Socket.io client library to index.html
3. [x] Create basic connection handlers
4. [x] Add connection status indicator to UI
5. [x] Test connection/disconnection events

**Success Criteria**:
- Client connects to server via WebSocket
- Connection status shown in UI
- Server logs connections/disconnections

### Phase 3: Guest ID System ✅ COMPLETED
**Goal**: Implement persistent guest accounts using localStorage

**Tasks**:
1. [x] Add UUID generation on server
2. [x] Implement guest ID check on client connect
3. [x] Store guest ID in localStorage
4. [x] Create player state structure in server memory
5. [x] Send welcome message with guest ID

**Success Criteria**:
- New players receive unique guest ID
- Returning players use existing guest ID
- Player state persists during session

**Implementation Details**:
```javascript
// Client-side guest ID management
let guestId = localStorage.getItem('guestId');
socket.emit('join', { guestId });

socket.on('welcome', (data) => {
  if (!guestId) {
    guestId = data.guestId;
    localStorage.setItem('guestId', guestId);
  }
});
```

### Phase 4: Game State Migration ✅ COMPLETED
**Goal**: Move game logic from client to server

**Tasks**:
1. [x] Extract game state from client code
2. [x] Create server-side game state manager
3. [x] Move tick processing to server
4. [x] Implement server-side action validation
5. [x] Update client to be display-only

**Key Migrations**:
- `gameState` object → server memory
- `processGameTicks()` → server game loop
- `explore()`, `develop()` → server action handlers
- Resource calculations → server-side only

**Success Criteria**:
- All game logic runs on server
- Client only handles UI updates
- No game state in browser

### Phase 5: Action System ✅ COMPLETED
**Goal**: Implement action sending and validation

**Tasks**:
1. [x] Create action event handlers on server
2. [x] Add action validation (AP costs, requirements)
3. [x] Update client to send actions via WebSocket
4. [x] Implement action result broadcasting
5. [x] Add optimistic UI updates

**Action Flow**:
```
Client clicks "Explore" 
→ Send action to server
→ Server validates action
→ Server updates game state
→ Server sends result to client
→ Client updates UI
```

**Success Criteria**:
- All actions processed server-side
- Invalid actions rejected with error messages
- UI updates immediately (optimistic updates)

### Phase 6: Real-time State Sync ✅ COMPLETED
**Goal**: Keep all clients synchronized with server state

**Tasks**:
1. [x] Implement state broadcast system
2. [x] Add tick-based update loop on server
3. [x] Create state update handlers on client
4. [x] Optimize data sent (only deltas)
5. [x] Handle reconnection gracefully

**Success Criteria**:
- All clients see same game state
- Updates arrive every second
- Minimal bandwidth usage
- Reconnection restores state

### Phase 7: Multi-player Features ⏳
**Goal**: Add features that showcase multiplayer capabilities

**Tasks**:
1. [ ] Add active player counter
2. [ ] Show when other players take actions
3. [ ] Create shared discovery log
4. [ ] Add simple leaderboard
5. [ ] Implement world events

**Success Criteria**:
- Players aware of others in game
- Shared world events visible
- Basic competitive elements working

### Phase 8: Testing & Polish ⏳
**Goal**: Ensure stable multiplayer experience

**Tasks**:
1. [ ] Test with multiple clients locally
2. [ ] Add error handling and recovery
3. [ ] Implement inactive player cleanup
4. [ ] Add performance monitoring
5. [ ] Create multiplayer test scenarios

**Test Scenarios**:
- 10 concurrent players
- Client disconnect/reconnect
- Server restart recovery
- High-latency simulation
- Rapid action spam

## Implementation Timeline

### Week 1: Foundation
- Day 1-2: Phase 1 & 2 (Server setup)
- Day 3-4: Phase 3 (Guest ID system)
- Day 5-7: Phase 4 (Game state migration)

### Week 2: Core Multiplayer
- Day 8-9: Phase 5 (Action system)
- Day 10-11: Phase 6 (State sync)
- Day 12-14: Phase 7 & 8 (Features & testing)

## File Structure Evolution

### Before (Single-player)
```
web4x/
├── index.html
├── game-config.json
└── [documentation files]
```

### After Phase 1
```
web4x/
├── server.js
├── package.json
├── public/
│   ├── index.html
│   └── game-config.json
└── [documentation files]
```

### After Phase 7 (Complete)
```
web4x/
├── server.js
├── package.json
├── public/
│   ├── index.html
│   ├── client.js
│   ├── style.css
│   └── game-config.json
├── lib/
│   ├── gameEngine.js
│   ├── playerManager.js
│   └── actionValidator.js
└── [documentation files]
```

## Common Pitfalls & Solutions

### State Synchronization Issues
**Problem**: Client state drifts from server
**Solution**: Server is single source of truth, client never modifies state directly

### Race Conditions
**Problem**: Multiple actions processed simultaneously
**Solution**: Queue actions, process sequentially

### Memory Leaks
**Problem**: Disconnected players not cleaned up
**Solution**: Implement session timeout and cleanup

### Performance Issues
**Problem**: Broadcasting full state too expensive
**Solution**: Send only changed values (deltas)

## Success Metrics
- [ ] 10+ concurrent players supported
- [ ] <100ms action response time
- [ ] State updates every second
- [ ] Zero client-side game logic
- [ ] Graceful error handling
- [ ] Fun multiplayer experience!

## Next Steps After MVP
1. Add persistent storage (PostgreSQL)
2. Implement multiple worlds
3. Add user authentication
4. Deploy to cloud hosting
5. Implement matchmaking
6. Add social features

## Resources
- Socket.io documentation: https://socket.io/docs/
- Express.js guide: https://expressjs.com/
- UUID library: https://github.com/uuidjs/uuid
- Game networking articles: https://gafferongames.com/

## Testing Commands
```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Run production server
npm start

# Test with multiple clients
# Open multiple browser tabs/windows to http://localhost:3000
```

This plan provides a clear path from single-player to multiplayer while maintaining game stability at each phase.