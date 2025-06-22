# Web 4X Game - SvelteKit Edition

A turn-based, asynchronous web 4X strategy game built with SvelteKit, TypeScript, and Tailwind CSS.

![SvelteKit Version](screenshots/sveltekit-initial.png)

## Features

- ✅ **Modern Tech Stack**: SvelteKit + TypeScript + Tailwind CSS
- ✅ **Real-time Multiplayer**: WebSocket connection to game server
- ✅ **Terminal-style UI**: Retro green-on-black aesthetic
- ✅ **Responsive Design**: Works on desktop and mobile
- ✅ **Type Safety**: Full TypeScript implementation
- ✅ **Component Architecture**: Modular Svelte components
- ✅ **State Management**: Svelte stores for reactive game state
- ✅ **AI Bot Competition**: 10 autonomous AI players creating dynamic gameplay

## Game Mechanics

### Core Loop
1. **Explore** - Discover resource capacity (5 AP)
2. **Develop** - Convert capacity to generation (10 AP, 2-hour timer)
3. **Expand Storage** - Increase resource caps (20 AP)
4. **Compete** - Real-time leaderboard with AI bots

### Resources
- **Food**: Starting 10/50 (+5/Hr, 5/Hr capacity)
- **Production**: Starting 6/30 (+3/Hr, 3/Hr capacity)  
- **Gold**: Starting 2/20 (+1/Hr, 1/Hr capacity)

### Action Points
- **Starting**: 150 AP
- **Maximum**: 250 AP
- **Regeneration**: 10 AP per hour

## Architecture

### Frontend (SvelteKit)
- **Framework**: SvelteKit with TypeScript
- **Styling**: Tailwind CSS with custom terminal theme
- **State**: Svelte stores for reactive data flow
- **WebSocket**: Real-time connection to game server

### Backend (Node.js)
- **Server**: Express.js with Socket.io for WebSocket support
- **Game Logic**: Server-authoritative with client UI updates
- **AI System**: 10 autonomous bots with different strategies
- **Real-time**: Live leaderboard and world events

### Component Structure
```
src/
├── lib/
│   ├── components/
│   │   ├── GameHeader.svelte      # Header with AP and time
│   │   ├── ResourcePanel.svelte   # Resource display
│   │   ├── ActionButtons.svelte   # Game action buttons
│   │   ├── ActiveTimers.svelte    # Development timers
│   │   ├── Leaderboard.svelte     # Real-time rankings
│   │   └── GameModal.svelte       # Action selection modals
│   ├── stores/
│   │   ├── gameStore.ts           # Game state management
│   │   └── socketStore.ts         # WebSocket communication
│   ├── types/
│   │   └── game.ts                # TypeScript type definitions
│   └── config.ts                  # Game configuration
└── routes/
    ├── +layout.svelte             # App layout with CSS imports
    └── +page.svelte               # Main game page
```

## Development Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Running with Game Server
The SvelteKit frontend connects to the original Node.js game server for WebSocket functionality.

1. **Start the game server** (in parent directory):
```bash
cd .. && npm run dev
```

2. **Start SvelteKit frontend**:
```bash
npm run dev
```

3. **Open game**: http://localhost:5173

## Project Structure

### TypeScript Types
All game entities are fully typed for better development experience:
- `Player`, `Resource`, `ActionPoints`, `Timer`
- `GameState`, `GameConfig`, `ActionResult`
- `LeaderboardEntry`, `WorldEvent`, `DiscoveryLogEntry`

### Reactive State Management
```typescript
// Game stores automatically update UI
import { resources, actionPoints, leaderboard } from '$lib/stores/gameStore.js';

// WebSocket actions
import { explore, develop, expandStorage } from '$lib/stores/socketStore.js';
```

### Tailwind Theme
Custom terminal-style color scheme:
```css
colors: {
  'terminal-green': '#00ff00',
  'terminal-bg': '#0a0a0a', 
  'terminal-border': '#333'
}
```

## Key Improvements Over Original

1. **Type Safety**: Full TypeScript implementation prevents runtime errors
2. **Component Architecture**: Modular, reusable Svelte components
3. **Reactive State**: Automatic UI updates with Svelte stores
4. **Modern Styling**: Tailwind CSS with consistent design system
5. **Development Experience**: Hot reload, better debugging, IDE support
6. **Responsive Design**: Mobile-friendly layout with CSS Grid
7. **Accessibility**: Better semantic HTML and ARIA attributes

## Testing

The application includes the same game mechanics as the original:
- ✅ Resource generation and management
- ✅ Action point system with regeneration
- ✅ Exploration and development cycles
- ✅ Storage expansion mechanics
- ✅ Real-time multiplayer with WebSocket
- ✅ AI bot competition system
- ✅ Dynamic leaderboard updates

## WebSocket Events

The frontend communicates with the game server through these events:
- `join` - Connect player to game world
- `action` - Send game actions (explore, develop, expand)
- `stateUpdate` - Receive game state updates
- `actionResult` - Get action success/failure results
- `worldEvent` - Receive world events and player updates

## Future Enhancements

- [ ] **Offline Mode**: Service worker for offline gameplay
- [ ] **PWA Support**: Installable web app
- [ ] **Enhanced Animations**: Smooth transitions and effects
- [ ] **Sound Effects**: Audio feedback for actions
- [ ] **Mobile Optimizations**: Touch-friendly controls
- [ ] **Dark/Light Themes**: Multiple color schemes
- [ ] **Accessibility**: Screen reader support
- [ ] **Internationalization**: Multi-language support

## License

MIT License - See parent project for details.

---

**Built with**: SvelteKit, TypeScript, Tailwind CSS, Socket.io