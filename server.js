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
  
  socket.on('action', (actionData) => {
    const guestId = socket.guestId;
    if (!guestId || !gameState.players[guestId]) {
      socket.emit('actionResult', {
        success: false,
        error: 'Player not found'
      });
      return;
    }
    
    console.log(`Action received from ${guestId}:`, actionData);
    processPlayerAction(guestId, actionData, socket);
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
    activeTimers: player.activeTimers,
    worldInfo: {
      currentTick: gameState.world.currentTick
    }
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

// Process timers
function processTimers(player) {
  const currentTick = gameState.world.currentTick;
  const completedTimers = [];
  
  // Find completed timers
  player.activeTimers = player.activeTimers.filter(timer => {
    if (timer.completionTick <= currentTick) {
      completedTimers.push(timer);
      return false; // Remove from active timers
    }
    return true; // Keep active
  });
  
  // Process completed timers
  completedTimers.forEach(timer => {
    if (timer.type === 'development') {
      // Increase generation
      const resource = player.resources[timer.resourceType];
      resource.generation = Math.min(resource.capacity, resource.generation + 1);
      
      // Add completion log
      const logEntry = `${new Date().toLocaleTimeString()}: ${timer.resourceType} development completed! +1 generation/hour`;
      gameState.world.discoveryLog.push({
        playerId: player.guestId,
        timestamp: Date.now(),
        message: logEntry,
        resourceType: timer.resourceType
      });
      
      console.log(`Development completed for ${player.guestId}: ${timer.resourceType} +1 generation`);
    }
  });
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

// Process player actions
function processPlayerAction(guestId, actionData, socket) {
  const player = gameState.players[guestId];
  const { type, data } = actionData;
  
  try {
    let result;
    
    switch (type) {
      case 'explore':
        result = processExploreAction(player);
        break;
      case 'develop':
        result = processDevelopAction(player, data);
        break;
      case 'expandStorage':
        result = processExpandStorageAction(player, data);
        break;
      case 'toggleDebug':
        result = processToggleDebugAction(player);
        break;
      default:
        throw new Error(`Unknown action type: ${type}`);
    }
    
    if (result.success) {
      // Update player's last seen
      player.lastSeen = Date.now();
      
      // Send success result to player
      socket.emit('actionResult', {
        success: true,
        type: type,
        result: result.data
      });
      
      // Broadcast world event if applicable
      if (result.worldEvent) {
        io.emit('worldEvent', result.worldEvent);
      }
      
      console.log(`${type} action successful for ${guestId}`);
    } else {
      // Send error result
      socket.emit('actionResult', {
        success: false,
        type: type,
        error: result.error
      });
      
      console.log(`${type} action failed for ${guestId}: ${result.error}`);
    }
  } catch (error) {
    console.error(`Error processing ${type} action for ${guestId}:`, error);
    socket.emit('actionResult', {
      success: false,
      type: type,
      error: 'Internal server error'
    });
  }
}

// Validate if player has enough action points
function validateActionPoints(player, cost) {
  return player.actionPoints.current >= cost;
}

// Deduct action points from player
function deductActionPoints(player, cost) {
  player.actionPoints.current = Math.max(0, player.actionPoints.current - cost);
}

// Process explore action
function processExploreAction(player) {
  const cost = gameConfig.actions.explore.cost;
  
  // Validate action points
  if (!validateActionPoints(player, cost)) {
    return {
      success: false,
      error: `Not enough action points. Need ${cost}, have ${Math.floor(player.actionPoints.current)}`
    };
  }
  
  // Deduct action points
  deductActionPoints(player, cost);
  
  // Roll for discovery
  const roll = Math.random();
  const rates = gameConfig.actions.explore.discoveryRates;
  
  let discoveredResource = null;
  let cumulativeRate = 0;
  
  for (const [resourceType, rate] of Object.entries(rates)) {
    cumulativeRate += rate;
    if (roll <= cumulativeRate) {
      discoveredResource = resourceType;
      break;
    }
  }
  
  if (discoveredResource) {
    // Increase capacity
    const resource = player.resources[discoveredResource];
    const oldCapacity = resource.capacity;
    resource.capacity += 1;
    
    // Add to discovery log
    const logEntry = `${new Date().toLocaleTimeString()}: Explored and found ${discoveredResource} capacity +1`;
    gameState.world.discoveryLog.push({
      playerId: player.guestId,
      timestamp: Date.now(),
      message: logEntry,
      resourceType: discoveredResource
    });
    
    // Keep only last 100 entries
    if (gameState.world.discoveryLog.length > 100) {
      gameState.world.discoveryLog = gameState.world.discoveryLog.slice(-100);
    }
    
    return {
      success: true,
      data: {
        resourceType: discoveredResource,
        oldCapacity: oldCapacity,
        newCapacity: resource.capacity,
        message: getDiscoveryMessage(discoveredResource)
      },
      worldEvent: {
        type: 'discovery',
        message: `A player discovered ${discoveredResource} capacity`,
        playerCount: gameState.metrics.activePlayers
      }
    };
  } else {
    return {
      success: false,
      error: 'No resources discovered this time. Try again!'
    };
  }
}

// Process develop action
function processDevelopAction(player, data) {
  const cost = gameConfig.actions.develop.cost;
  
  // Validate action points
  if (!validateActionPoints(player, cost)) {
    return {
      success: false,
      error: `Not enough action points. Need ${cost}, have ${Math.floor(player.actionPoints.current)}`
    };
  }
  
  const resourceType = data.resourceType;
  if (!resourceType || !player.resources[resourceType]) {
    return {
      success: false,
      error: 'Invalid resource type'
    };
  }
  
  const resource = player.resources[resourceType];
  
  // Check if there's capacity to develop
  if (resource.generation >= resource.capacity) {
    return {
      success: false,
      error: `${resourceType} generation is already at maximum capacity. Explore first to increase capacity.`
    };
  }
  
  // Deduct action points
  deductActionPoints(player, cost);
  
  // Create development timer
  const completionTick = gameState.world.currentTick + gameConfig.timers.development.productionTicks;
  const timer = {
    id: `${player.guestId}-${resourceType}-${Date.now()}`,
    playerId: player.guestId,
    type: 'development',
    resourceType: resourceType,
    completionTick: completionTick,
    startTick: gameState.world.currentTick
  };
  
  player.activeTimers.push(timer);
  
  // Add to discovery log
  const logEntry = `${new Date().toLocaleTimeString()}: Started developing ${resourceType} (+1 generation in ${Math.floor(gameConfig.timers.development.productionTicks / 3600)} hours)`;
  gameState.world.discoveryLog.push({
    playerId: player.guestId,
    timestamp: Date.now(),
    message: logEntry,
    resourceType: resourceType
  });
  
  return {
    success: true,
    data: {
      resourceType: resourceType,
      completionTick: completionTick,
      timerId: timer.id
    }
  };
}

// Process expand storage action
function processExpandStorageAction(player, data) {
  const cost = gameConfig.actions.expandStorage.cost;
  
  // Validate action points
  if (!validateActionPoints(player, cost)) {
    return {
      success: false,
      error: `Not enough action points. Need ${cost}, have ${Math.floor(player.actionPoints.current)}`
    };
  }
  
  const resourceType = data.resourceType;
  if (!resourceType || !player.resources[resourceType]) {
    return {
      success: false,
      error: 'Invalid resource type'
    };
  }
  
  // Deduct action points
  deductActionPoints(player, cost);
  
  // Expand storage
  const resource = player.resources[resourceType];
  const oldCap = resource.cap;
  const increase = gameConfig.actions.expandStorage.capacityIncrease;
  resource.cap += increase;
  
  // Add to discovery log
  const logEntry = `${new Date().toLocaleTimeString()}: Expanded ${resourceType} storage capacity by ${increase} (now ${resource.cap})`;
  gameState.world.discoveryLog.push({
    playerId: player.guestId,
    timestamp: Date.now(),
    message: logEntry,
    resourceType: resourceType
  });
  
  return {
    success: true,
    data: {
      resourceType: resourceType,
      oldCap: oldCap,
      newCap: resource.cap,
      increase: increase
    }
  };
}

// Process toggle debug action (placeholder)
function processToggleDebugAction(player) {
  // For now, just acknowledge the action
  // In a full implementation, this might toggle server-side debug features
  return {
    success: true,
    data: {
      message: 'Debug mode toggle acknowledged (server-side debug not implemented yet)'
    }
  };
}

// Get discovery message based on resource type
function getDiscoveryMessage(resourceType) {
  const messages = {
    food: "You've discovered fertile lands perfect for agriculture! Your food production capacity has increased.",
    production: "You've found a site rich in materials and perfect for manufacturing! Your production capacity has increased.",
    gold: "You've discovered a valuable trade route and mineral deposits! Your gold generation capacity has increased."
  };
  
  return messages[resourceType] || "You've made an important discovery!";
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