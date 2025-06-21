# Web 4X Game Project Context

## Project Overview
Turn-based, asynchronous web 4X game designed for 2-week matches with multiple daily sessions. Abstract resource mechanics focused on capacity discovery and development.

## Architecture
- **Single HTML file**: `/index.html` - Complete game implementation
- **Tick-based system**: Clean time management with acceleration support
- **Debug mode**: Speed acceleration for testing (see config)
- **No external dependencies**: Vanilla HTML/CSS/JavaScript

## Key Documentation

### Design & Vision
- **@game-design-doc.md** - Core game design, mechanics, and progression
- **@development-plan.md** - Implementation phases and testing protocols

### Configuration
- **@game-config.json** - All balance parameters and game constants

### Development Status
- **Phase 1 Enhanced**: Core loop with resource management complete
- **Current**: Tick-based architecture with storage caps and debug tools
- **Next**: Extended session testing and balance tuning

## Quick Start
```bash
# Start local server
python3 -m http.server 8000 &

# Open game
# http://localhost:8000

# Stop server
pkill -f "python3 -m http.server 8000"
```

## Core Loop
1. **Explore** - Discover resource capacity
2. **Develop** - Convert capacity to generation
3. **Expand Storage** - Increase resource caps
4. **Debug Toggle** - Speed acceleration for testing

## Technical Notes
- Tick processing: `processGameTicks()` handles normal or accelerated time
- Resource format: `current/cap (+generation/Hr capacity/Hr Max)`
- Auto-completion: Timers complete automatically
- Time displays: Wall clock, session timer, tick counter

## Implementation Priorities
1. ✅ Core explore→develop loop
2. ✅ Resource management with caps
3. ✅ Debug speed mode
4. 🔄 Research system
5. 🔄 Trading mechanics
6. 🔄 Multiplayer competition