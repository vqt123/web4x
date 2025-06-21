// Web 4X Client-Server Communication
// Handles WebSocket connection and state synchronization

class GameClient {
  constructor() {
    this.socket = null;
    this.guestId = null;
    this.connected = false;
    this.gameState = null;
    this.worldInfo = null;
    
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
    
    // Update world info
    if (this.worldInfo) {
      const playerCountElement = document.getElementById('player-count');
      if (playerCountElement) {
        playerCountElement.textContent = `Players online: ${this.worldInfo.playerCount}`;
      }
    }
  }
  
  updateResourceDisplay(type, resource) {
    const element = document.getElementById(`${type}-display`);
    if (element) {
      element.textContent = `${type.charAt(0).toUpperCase() + type.slice(1)}: ${Math.floor(resource.amount)}/${resource.cap} (+${resource.generation}/Hr ${resource.capacity}/Hr Max)`;
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
      }
    } else {
      console.error(`${result.type} action failed:`, result.error);
      // Show error message to user
      this.showErrorMessage(result.error);
    }
  }
  
  handleExploreResult(result) {
    // Show discovery popup
    // This will integrate with existing discovery popup code
    console.log('Discovery made:', result);
  }
  
  handleDevelopResult(result) {
    console.log('Development started:', result);
  }
  
  handleExpandStorageResult(result) {
    console.log('Storage expanded:', result);
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
  if (gameClient) {
    gameClient.sendAction('develop');
  }
}

function expandStorage() {
  if (gameClient) {
    gameClient.sendAction('expandStorage');
  }
}

function toggleDebugMode() {
  if (gameClient) {
    gameClient.sendAction('toggleDebug');
  }
}