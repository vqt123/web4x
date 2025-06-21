const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const PORT = process.env.PORT || 3000;

// Load game configuration
let gameConfig;
try {
  gameConfig = JSON.parse(fs.readFileSync('./game-config.json', 'utf8'));
  console.log('Game configuration loaded successfully');
} catch (error) {
  console.error('Failed to load game-config.json:', error.message);
  process.exit(1);
}

// In-memory game state
const gameState = {
  players: {},
  world: {
    startTime: Date.now(),
    currentTick: 0,
    config: gameConfig,
    discoveryLog: []
  },
  metrics: {
    totalPlayers: 0,
    activePlayers: 0,
    ticksProcessed: 0
  }
};

// Serve static files from public directory
app.use(express.static('public'));

// API endpoint to get server status
app.get('/api/status', (req, res) => {
  res.json({
    status: 'running',
    players: gameState.metrics.activePlayers,
    uptime: Math.floor((Date.now() - gameState.world.startTime) / 1000),
    tick: gameState.world.currentTick
  });
});

// Socket.io connection handling
io.on('connection', (socket) => {
  console.log(`Client connected: ${socket.id}`);
  
  socket.on('join', (data) => {
    let guestId = data.guestId;
    
    // Generate new guest ID if not provided or doesn't exist
    if (!guestId || !gameState.players[guestId]) {
      guestId = `guest-${uuidv4()}`;
      gameState.players[guestId] = createNewPlayer(guestId);
      gameState.metrics.totalPlayers++;
      console.log(`New player created: ${guestId}`);
    } else {
      console.log(`Returning player: ${guestId}`);
    }
    
    // Update player's last seen and socket
    gameState.players[guestId].lastSeen = Date.now();
    gameState.players[guestId].socketId = socket.id;
    socket.guestId = guestId;
    
    // Update active players count
    updateActivePlayersCount();
    
    // Send welcome message with guest ID and current state
    socket.emit('welcome', {
      guestId: guestId,
      state: getPlayerState(guestId),
      worldInfo: {
        startTime: gameState.world.startTime,
        currentTick: gameState.world.currentTick,
        playerCount: gameState.metrics.activePlayers
      }
    });
    
    // Broadcast new player joined (if actually new)
    if (data.guestId !== guestId) {
      socket.broadcast.emit('worldEvent', {
        type: 'playerJoined',
        message: 'A new player has joined the world',
        playerCount: gameState.metrics.activePlayers
      });
    }
  });
  
  socket.on('disconnect', () => {
    console.log(`Client disconnected: ${socket.id}`);
    
    // Find and update player's last seen
    for (const playerId in gameState.players) {
      if (gameState.players[playerId].socketId === socket.id) {
        gameState.players[playerId].lastSeen = Date.now();
        delete gameState.players[playerId].socketId;
        break;
      }
    }
    
    updateActivePlayersCount();
  });
});

// Helper function to create new player
function createNewPlayer(guestId) {
  return {
    guestId: guestId,
    resources: {
      food: {
        amount: gameConfig.resources.food.startingAmount,
        generation: gameConfig.resources.food.startingGeneration,
        capacity: gameConfig.resources.food.startingCapacity,
        cap: gameConfig.resources.food.storageCap
      },
      production: {
        amount: gameConfig.resources.production.startingAmount,
        generation: gameConfig.resources.production.startingGeneration,
        capacity: gameConfig.resources.production.startingCapacity,
        cap: gameConfig.resources.production.storageCap
      },
      gold: {
        amount: gameConfig.resources.gold.startingAmount,
        generation: gameConfig.resources.gold.startingGeneration,
        capacity: gameConfig.resources.gold.startingCapacity,
        cap: gameConfig.resources.gold.storageCap
      }
    },
    actionPoints: {
      current: gameConfig.actionPoints.starting,
      max: gameConfig.actionPoints.maximum
    },
    activeTimers: [],
    lastSeen: Date.now(),
    createdAt: Date.now()
  };
}

// Helper function to get player state for sending to client
function getPlayerState(guestId) {
  const player = gameState.players[guestId];
  if (!player) return null;
  
  return {
    resources: player.resources,
    actionPoints: player.actionPoints,
    activeTimers: player.activeTimers
  };
}

// Helper function to update active players count
function updateActivePlayersCount() {
  const now = Date.now();
  const activeThreshold = 30000; // 30 seconds
  
  gameState.metrics.activePlayers = Object.values(gameState.players)
    .filter(player => player.socketId || (now - player.lastSeen) < activeThreshold)
    .length;
}

// Game tick loop (runs every second)
function gameTick() {
  gameState.world.currentTick++;
  gameState.metrics.ticksProcessed++;
  
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
  
  // Broadcast state updates to connected players
  broadcastStateUpdates();
  
  // Clean up inactive players (older than 30 days)
  cleanupInactivePlayers();
}

// Regenerate action points
function regenerateActionPoints(player) {
  const regenPerTick = gameConfig.actionPoints.regenerationPerHour / 3600;
  player.actionPoints.current = Math.min(
    player.actionPoints.max,
    player.actionPoints.current + regenPerTick
  );
}

// Generate resources
function generateResources(player) {
  const genPerTick = 1 / 3600; // 1 hour = 3600 ticks
  
  for (const resourceType in player.resources) {
    const resource = player.resources[resourceType];
    const generated = resource.generation * genPerTick;
    resource.amount = Math.min(resource.cap, resource.amount + generated);
  }
}

// Process timers (placeholder for now)
function processTimers(player) {
  // Timer processing will be implemented when we add actions
  // For now, just filter out completed timers
  player.activeTimers = player.activeTimers.filter(timer => 
    timer.completionTick > gameState.world.currentTick
  );
}

// Broadcast state updates to all connected players
function broadcastStateUpdates() {
  for (const playerId in gameState.players) {
    const player = gameState.players[playerId];
    if (player.socketId) {
      const socket = io.sockets.sockets.get(player.socketId);
      if (socket) {
        socket.emit('stateUpdate', getPlayerState(playerId));
      }
    }
  }
}

// Clean up players inactive for more than 30 days
function cleanupInactivePlayers() {
  const now = Date.now();
  const thirtyDays = 30 * 24 * 60 * 60 * 1000;
  
  for (const playerId in gameState.players) {
    if (now - gameState.players[playerId].lastSeen > thirtyDays) {
      delete gameState.players[playerId];
      console.log(`Cleaned up inactive player: ${playerId}`);
    }
  }
}

// Start the game tick loop
setInterval(gameTick, 1000);

// Start the server
server.listen(PORT, () => {
  console.log(`🎮 Web 4X Server running on port ${PORT}`);
  console.log(`📊 Game tick loop started`);
  console.log(`🌍 Single world mode active`);
  console.log(`👥 Ready for players at http://localhost:${PORT}`);
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\\n🛑 Shutting down server...');
  server.close(() => {
    console.log('✅ Server closed');
    process.exit(0);
  });
});