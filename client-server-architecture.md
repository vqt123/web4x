# Web 4X Client-Server Architecture

## Overview
This document outlines the minimal client-server implementation for transforming the single-player Web 4X game into a multiplayer experience. The architecture prioritizes simplicity and rapid development while maintaining the core game mechanics.

## Design Principles
1. **Minimal Complexity**: Start with the simplest possible multiplayer implementation
2. **In-Memory Storage**: No database required for initial version
3. **Guest Players**: No authentication system needed
4. **Single World**: One shared game world for all players (initially)
5. **Local Development**: Run and test everything locally first

## Architecture Components

### Server (Node.js + Express + Socket.io)
```
server.js
├── Express HTTP server
├── Socket.io WebSocket server
├── In-memory game state
├── Guest ID generator
└── Server-side game loop
```

### Client (Browser)
```
public/
├── index.html     (Updated UI)
├── client.js      (Server communication)
├── style.css      (Extracted styles)
└── game-config.json
```

## In-Memory Data Structure
```javascript
const gameState = {
  // Player data indexed by guestId
  players: {
    "guest-uuid-1234": {
      guestId: "guest-uuid-1234",
      resources: {
        food: { amount: 10, generation: 5, capacity: 5, cap: 50 },
        production: { amount: 6, generation: 3, capacity: 3, cap: 30 },
        gold: { amount: 2, generation: 1, capacity: 1, cap: 20 }
      },
      actionPoints: { current: 150, max: 250 },
      activeTimers: [],
      lastSeen: Date.now()
    }
  },
  
  // Single world configuration
  world: {
    startTime: Date.now(),
    currentTick: 0,
    config: gameConfig, // Loaded from game-config.json
    discoveryLog: []    // Shared world events
  },
  
  // Server metrics
  metrics: {
    totalPlayers: 0,
    activePlayers: 0,
    ticksProcessed: 0
  }
};
```

## Guest ID System
- Generated server-side using UUID v4
- Stored in browser localStorage
- No password or email required
- Players can return to same game state using their guest ID
- Guest IDs expire after 30 days of inactivity

### Guest ID Flow
1. Client connects to server
2. Client checks localStorage for existing `guestId`
3. If found: sends it with `join` event
4. If not found: server generates new UUID and sends it back
5. Client stores `guestId` in localStorage
6. All subsequent connections use this ID

## Communication Protocol

### WebSocket Events

#### Client → Server
```javascript
// Join game with existing or new guest ID
socket.emit('join', { guestId: localStorage.getItem('guestId') });

// Send game actions
socket.emit('action', {
  type: 'explore',    // or 'develop', 'expandStorage'
  data: { /* action specific data */ }
});

// Request current state (recovery)
socket.emit('requestState');
```

#### Server → Client
```javascript
// Welcome message with guest ID and initial state
socket.on('welcome', {
  guestId: 'guest-uuid-1234',
  state: { /* player's current game state */ },
  worldInfo: { /* world metadata */ }
});

// Regular state updates (every tick)
socket.on('stateUpdate', {
  resources: { /* current resources */ },
  actionPoints: { /* current AP */ },
  activeTimers: [ /* active developments */ ]
});

// Action results
socket.on('actionResult', {
  success: true,
  type: 'explore',
  result: { /* action specific result */ }
});

// World events (other players' actions)
socket.on('worldEvent', {
  type: 'playerJoined',
  message: 'A new player has joined the world',
  playerCount: 5
});
```

## Server-Side Game Loop
```javascript
// Main game tick (runs every second)
setInterval(() => {
  gameState.world.currentTick++;
  
  // Process each player
  for (const playerId in gameState.players) {
    const player = gameState.players[playerId];
    
    // Regenerate action points
    regenerateActionPoints(player);
    
    // Generate resources
    generateResources(player);
    
    // Process timers
    processTimers(player);
  }
  
  // Broadcast updates to connected clients
  broadcastStateUpdates();
}, 1000);
```

## Action Validation
All game actions are validated server-side:
1. Check if player has enough action points
2. Validate action parameters
3. Apply action effects
4. Update game state
5. Broadcast results

## File Structure
```
web4x/
├── server.js              # All server code
├── package.json           # Node dependencies
├── game-config.json       # Shared game configuration
├── public/               # Static files served to client
│   ├── index.html        # Game UI
│   ├── client.js         # Client-side logic
│   └── style.css         # Extracted styles
├── node_modules/         # Dependencies (git ignored)
└── README.md             # Setup instructions
```

## Dependencies
```json
{
  "name": "web4x-server",
  "version": "1.0.0",
  "dependencies": {
    "express": "^4.18.0",
    "socket.io": "^4.6.0",
    "uuid": "^9.0.0"
  },
  "devDependencies": {
    "nodemon": "^3.0.0"
  },
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  }
}
```

## Local Development Setup
```bash
# Install dependencies
npm install

# Run server in development mode
npm run dev

# Server runs on http://localhost:3000
# Open multiple browser windows to test multiplayer
```

## Client Storage (localStorage)
```javascript
// Stored in browser
{
  "guestId": "guest-uuid-1234",
  "lastServer": "http://localhost:3000",
  "settings": {
    "soundEnabled": false,
    "autoSave": true
  }
}
```

## Security Considerations
- No sensitive data stored (guest accounts only)
- Input validation on all actions
- Rate limiting on actions (max 10 per second)
- WebSocket connection limits (max 1000 concurrent)
- No chat system (prevents abuse)

## Performance Considerations
- In-memory storage limits to ~1000 concurrent players
- State updates batched every second
- Inactive players cleaned up after 30 days
- Single Node.js process (no clustering yet)

## Future Enhancements
1. **Multiple Worlds**: Support multiple 14-day game instances
2. **Persistent Storage**: PostgreSQL for data persistence
3. **User Accounts**: Optional registration for permanent accounts
4. **Horizontal Scaling**: Redis for shared state across servers
5. **Matchmaking**: Join specific worlds or auto-match
6. **Leaderboards**: Track high scores across worlds
7. **Chat System**: In-game communication (with moderation)
8. **Mobile Apps**: React Native clients

## Migration Path
The architecture is designed to evolve:
1. Start with single server, in-memory storage
2. Add PostgreSQL for persistence (minimal code changes)
3. Add Redis for multi-server support
4. Implement proper authentication system
5. Deploy to cloud with auto-scaling

## Deployment Options (Future)
- **Development**: Local Node.js server
- **Testing**: ngrok tunnel for external access
- **Staging**: Single server on Render.com (free tier)
- **Production**: Multi-region deployment on Fly.io

This minimal architecture provides a solid foundation for multiplayer gameplay while keeping complexity low for rapid development and testing.