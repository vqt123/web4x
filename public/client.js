// Web 4X Client-Server Communication
// Handles WebSocket connection and state synchronization

class GameClient {
  constructor() {
    this.socket = null;
    this.guestId = null;
    this.connected = false;
    this.gameState = null;
    this.worldInfo = null;
    this.sessionStartTime = Date.now();
    
    // Initialize client
    this.init();
  }
  
  init() {
    // Check for existing guest ID
    this.guestId = localStorage.getItem('guestId');
    console.log('Initializing client with guest ID:', this.guestId || 'new player');
    
    // Connect to server
    this.connect();
    
    // Update connection status in UI
    this.updateConnectionStatus('connecting');
  }
  
  connect() {
    this.socket = io();
    
    this.socket.on('connect', () => {
      console.log('Connected to server');
      this.connected = true;
      this.updateConnectionStatus('connected');
      
      // Join the game
      this.socket.emit('join', { guestId: this.guestId });
    });
    
    this.socket.on('disconnect', () => {
      console.log('Disconnected from server');
      this.connected = false;
      this.updateConnectionStatus('disconnected');
    });
    
    this.socket.on('welcome', (data) => {
      console.log('Welcome message received:', data);
      
      // Store guest ID if it's new
      if (!this.guestId || this.guestId !== data.guestId) {
        this.guestId = data.guestId;
        localStorage.setItem('guestId', this.guestId);
        console.log('Guest ID saved:', this.guestId);
      }
      
      // Update game state and world info
      this.gameState = data.state;
      this.worldInfo = data.worldInfo;
      
      // Update UI with initial state
      this.updateUI();
      
      // Show welcome message
      this.showWelcomeMessage(data);
    });
    
    this.socket.on('stateUpdate', (state) => {
      // Update game state from server
      this.gameState = state;
      
      // Update world info if provided (for currentTick)
      if (state.worldInfo) {
        this.worldInfo = { ...this.worldInfo, ...state.worldInfo };
      }
      
      this.updateUI();
    });
    
    this.socket.on('worldEvent', (event) => {
      console.log('World event:', event);
      this.handleWorldEvent(event);
    });
    
    this.socket.on('actionResult', (result) => {
      console.log('Action result:', result);
      this.handleActionResult(result);
    });
  }
  
  updateConnectionStatus(status) {
    const statusElement = document.getElementById('connection-status');
    if (statusElement) {
      statusElement.textContent = status;
      statusElement.className = `connection-status ${status}`;
    }
  }
  
  updateUI() {
    if (!this.gameState) return;
    
    // Update action points
    const apElement = document.querySelector('.action-points');
    if (apElement) {
      apElement.textContent = `Action Points: ${Math.floor(this.gameState.actionPoints.current)}/${this.gameState.actionPoints.max}`;
    }
    
    // Update resources
    this.updateResourceDisplay('food', this.gameState.resources.food);
    this.updateResourceDisplay('production', this.gameState.resources.production);
    this.updateResourceDisplay('gold', this.gameState.resources.gold);
    
    // Update timers
    this.updateTimersDisplay();
    
    // Update world info
    if (this.worldInfo) {
      const playerCountElement = document.getElementById('player-count');
      if (playerCountElement) {
        playerCountElement.textContent = `Players online: ${this.worldInfo.playerCount}`;
      }
    }
    
    // Update time displays
    this.updateTimeDisplays();
  }
  
  updateResourceDisplay(type, resource) {
    const element = document.getElementById(`${type}-display`);
    if (element) {
      element.textContent = `${type.charAt(0).toUpperCase() + type.slice(1)}: ${Math.floor(resource.amount)}/${resource.cap} (+${resource.generation}/Hr ${resource.capacity}/Hr Max)`;
    }
  }
  
  updateTimersDisplay() {
    const timersSection = document.getElementById('timers-section');
    const activeTimersDiv = document.getElementById('active-timers');
    
    if (!timersSection || !activeTimersDiv) return;
    
    if (!this.gameState.activeTimers || this.gameState.activeTimers.length === 0) {
      timersSection.style.display = 'none';
      return;
    }
    
    timersSection.style.display = 'block';
    activeTimersDiv.innerHTML = '';
    
    this.gameState.activeTimers.forEach((timer) => {
      const entry = document.createElement('div');
      entry.className = 'timer-entry';
      
      // Calculate remaining time (assuming we have currentTick from world info)
      const currentTick = this.worldInfo ? this.worldInfo.currentTick || 0 : 0;
      const remainingTicks = Math.max(0, timer.completionTick - currentTick);
      
      if (remainingTicks <= 0) {
        entry.className += ' completed';
        entry.textContent = `${timer.resourceType.charAt(0).toUpperCase() + timer.resourceType.slice(1)} development COMPLETE!`;
      } else {
        const hours = Math.floor(remainingTicks / 3600);
        const minutes = Math.floor((remainingTicks % 3600) / 60);
        const seconds = remainingTicks % 60;
        entry.textContent = `${timer.resourceType.charAt(0).toUpperCase() + timer.resourceType.slice(1)} development: ${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
      }
      
      activeTimersDiv.appendChild(entry);
    });
  }
  
  updateTimeDisplays() {
    // Update wall clock using server time (currentTick)
    if (this.worldInfo && typeof this.worldInfo.currentTick === 'number') {
      const totalSeconds = this.worldInfo.currentTick;
      const days = Math.floor(totalSeconds / (24 * 3600));
      const hours = Math.floor((totalSeconds % (24 * 3600)) / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;
      
      const wallClock = document.getElementById('wall-clock');
      if (wallClock) {
        wallClock.textContent = `Day ${days + 1}, ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
      }
    }
    
    // Update debug panel
    const debugModeIndicator = document.getElementById('debug-mode-indicator');
    const tickCounter = document.getElementById('tick-counter');
    const sessionTime = document.getElementById('session-time');
    
    if (debugModeIndicator && this.worldInfo) {
      debugModeIndicator.textContent = this.worldInfo.debugMode ? 'DEBUG MODE: 3600x' : 'Normal Speed';
    }
    
    if (tickCounter && this.worldInfo) {
      tickCounter.textContent = `Tick: ${this.worldInfo.currentTick || 0}`;
    }
    
    if (sessionTime) {
      const sessionSeconds = Math.floor((Date.now() - this.sessionStartTime) / 1000);
      sessionTime.textContent = `Session: ${sessionSeconds}s`;
    }
  }
  
  sendAction(actionType, data = {}) {
    if (!this.connected) {
      console.error('Not connected to server');
      return;
    }
    
    console.log('Sending action:', actionType, data);
    this.socket.emit('action', {
      type: actionType,
      data: data
    });
  }
  
  showWelcomeMessage(welcomeData) {
    const isNewPlayer = !localStorage.getItem('hasPlayedBefore');
    
    if (isNewPlayer) {
      localStorage.setItem('hasPlayedBefore', 'true');
      
      // Show welcome popup for new players
      const popup = document.createElement('div');
      popup.className = 'welcome-popup';
      popup.innerHTML = `
        <div class="popup-content">
          <h3>Welcome to Web 4X!</h3>
          <p>You've joined as ${welcomeData.guestId}</p>
          <p>There are ${welcomeData.worldInfo.playerCount} players in this world.</p>
          <p>Start by exploring to discover resources!</p>
          <button onclick="this.parentElement.parentElement.remove()">Let's Play!</button>
        </div>
      `;
      document.body.appendChild(popup);
      
      // Auto-remove after 10 seconds
      setTimeout(() => {
        if (popup.parentElement) {
          popup.remove();
        }
      }, 10000);
    }
  }
  
  handleWorldEvent(event) {
    // Show world events in UI
    const logElement = document.getElementById('world-events');
    if (logElement) {
      const eventDiv = document.createElement('div');
      eventDiv.className = 'world-event';
      eventDiv.textContent = event.message;
      logElement.appendChild(eventDiv);
      
      // Keep only last 5 events
      while (logElement.children.length > 5) {
        logElement.removeChild(logElement.firstChild);
      }
    }
    
    // Update player count if provided
    if (event.playerCount !== undefined && this.worldInfo) {
      this.worldInfo.playerCount = event.playerCount;
      const playerCountElement = document.getElementById('player-count');
      if (playerCountElement) {
        playerCountElement.textContent = `Players online: ${event.playerCount}`;
      }
    }
  }
  
  handleActionResult(result) {
    if (result.success) {
      console.log(`${result.type} action successful:`, result.result);
      
      // Handle different action types
      switch (result.type) {
        case 'explore':
          this.handleExploreResult(result.result);
          break;
        case 'develop':
          this.handleDevelopResult(result.result);
          break;
        case 'expandStorage':
          this.handleExpandStorageResult(result.result);
          break;
        case 'toggleDebug':
          this.handleToggleDebugResult(result.result);
          break;
      }
    } else {
      console.error(`${result.type} action failed:`, result.error);
      // Show error message to user
      this.showErrorMessage(result.error);
    }
  }
  
  handleExploreResult(result) {
    // Show discovery popup with server result
    this.showDiscoveryPopup(result.resourceType, result.message);
  }
  
  handleDevelopResult(result) {
    console.log('Development started:', result);
    // Development timer will be shown in next state update
  }
  
  handleExpandStorageResult(result) {
    console.log('Storage expanded:', result);
    // UI will update with next state update
  }
  
  handleToggleDebugResult(result) {
    console.log('Debug toggle result:', result.message);
  }
  
  showDiscoveryPopup(resourceType, message) {
    const popup = document.getElementById('discovery-popup');
    const title = document.getElementById('popup-title');
    const messageEl = document.getElementById('popup-message');
    
    if (popup && title && messageEl) {
      title.textContent = `${resourceType.charAt(0).toUpperCase() + resourceType.slice(1)} Discovery!`;
      messageEl.textContent = message;
      popup.style.display = 'block';
    }
  }
  
  showErrorMessage(error) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = error;
    document.body.appendChild(errorDiv);
    
    setTimeout(() => {
      if (errorDiv.parentElement) {
        errorDiv.remove();
      }
    }, 5000);
  }
}

// Global game client instance
let gameClient;

// Initialize when page loads
document.addEventListener('DOMContentLoaded', () => {
  console.log('Initializing multiplayer client...');
  gameClient = new GameClient();
});

// Action functions that will be called by buttons
function explore() {
  if (gameClient) {
    gameClient.sendAction('explore');
  }
}

function develop() {
  if (gameClient && gameClient.gameState) {
    // Show development popup to choose resource
    showDevelopmentPopup();
  }
}

function expandStorage() {
  if (gameClient && gameClient.gameState) {
    // Show expand storage popup to choose resource
    showExpandStoragePopup();
  }
}

function toggleDebugMode() {
  if (gameClient) {
    gameClient.sendAction('toggleDebug');
  }
}

// Show development popup with available resources
function showDevelopmentPopup() {
  const popup = document.getElementById('develop-popup');
  const choicesDiv = document.getElementById('resource-choices');
  
  if (!popup || !choicesDiv) return;
  
  choicesDiv.innerHTML = '';
  
  // Show only resources that have capacity > generation
  Object.keys(gameClient.gameState.resources).forEach(resourceType => {
    const resource = gameClient.gameState.resources[resourceType];
    if (resource.capacity > resource.generation) {
      const button = document.createElement('button');
      button.className = 'resource-choice';
      const potentialIncrease = Math.min(1, resource.capacity - resource.generation);
      button.innerHTML = `Develop ${resourceType.charAt(0).toUpperCase() + resourceType.slice(1)}<br>
          <small>Generation: ${resource.generation} → ${resource.generation + potentialIncrease} per hour<br>
          (Capacity: ${resource.capacity}/hr)</small>`;
      button.onclick = () => startDevelopment(resourceType);
      choicesDiv.appendChild(button);
    }
  });
  
  if (choicesDiv.children.length === 0) {
    choicesDiv.innerHTML = '<p>No resources available for development. Explore to increase capacity first!</p>';
  }
  
  popup.style.display = 'block';
}

// Show expand storage popup with all resources
function showExpandStoragePopup() {
  const popup = document.getElementById('expand-popup');
  const choicesDiv = document.getElementById('expand-choices');
  
  if (!popup || !choicesDiv) return;
  
  choicesDiv.innerHTML = '';
  
  // Show all resource types for expansion
  Object.keys(gameClient.gameState.resources).forEach(resourceType => {
    const resource = gameClient.gameState.resources[resourceType];
    const button = document.createElement('button');
    button.className = 'resource-choice';
    button.innerHTML = `Expand ${resourceType.charAt(0).toUpperCase() + resourceType.slice(1)} Storage<br>
        <small>Current cap: ${resource.cap} → ${resource.cap + 20}<br>
        Build warehouses and storage facilities</small>`;
    button.onclick = () => expandStorageResource(resourceType);
    choicesDiv.appendChild(button);
  });
  
  popup.style.display = 'block';
}

// Start development for specific resource
function startDevelopment(resourceType) {
  if (gameClient) {
    gameClient.sendAction('develop', { resourceType });
    closeDevelopPopup();
  }
}

// Expand storage for specific resource
function expandStorageResource(resourceType) {
  if (gameClient) {
    gameClient.sendAction('expandStorage', { resourceType });
    closeExpandPopup();
  }
}

// Close popup functions
function closePopup() {
  const popup = document.getElementById('discovery-popup');
  if (popup) popup.style.display = 'none';
}

function closeDevelopPopup() {
  const popup = document.getElementById('develop-popup');
  if (popup) popup.style.display = 'none';
}

function closeExpandPopup() {
  const popup = document.getElementById('expand-popup');
  if (popup) popup.style.display = 'none';
}