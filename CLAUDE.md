# Web 4X Game Project Context

## Project Overview
We are building a turn-based, asynchronous web 4X game designed to be played over 2 weeks with multiple daily sessions. The game uses abstract resource mechanics instead of spatial exploration - players discover resource capacity through exploration actions and convert it to actual generation through development.

## Key Design Documents
@game-design-doc.md
@development-plan.md

## Core Game Loop
1. **Explore** (5 AP) - Discover resource capacity
2. **Develop** (10 AP) - Convert capacity to generation (2-hour timer)
3. **Research** (15 AP) - Improve efficiency (4-hour timer)
4. **Trade** (8 AP) - Exchange resources with others

## Development Principles
- Start with text-based MVP to test pacing and mechanics
- Focus on the first 5 minutes (not 30)
- Build in 5-minute increments
- Test capacity/generation balance extensively
- No spatial/map elements - pure numbers game

## Current Development Status
**Status**: ✅ PHASE 1 COMPLETE - Core explore→develop loop implemented and tested
**Current**: Step 1.1-1.4 completed - Full MVP working
**Next Step**: Test 5-minute experience and gather feedback

## What We've Built (Steps 1.1-1.4 Complete)
```
Action Points: 150

Resources (current amount + generation rate)
Food: 15 (+5/hr)
Production: 9 (+3/hr) 
Gold: 3 (+1/hr)

Active Developments
Food development: 0:01:23

[EXPLORE - 5 AP]    [DEVELOP - 10 AP]
Discover capacity    Convert capacity into generation
```

## Implemented Features ✅
- **Core UI**: Action points, resource display with auto-generation
- **Exploration System**: 60% food, 30% production, 10% gold discovery rates
- **Development System**: 2-hour timers (10s for testing) to convert capacity→generation  
- **Real-time Updates**: Resources accumulate automatically, timers count down
- **Clear UX**: Action descriptions, tooltips, discovery popups
- **Activity Log**: Track all player actions and completions

## Key Design Decisions Made
- **NO MAPS**: Abstract resource discovery, not spatial exploration
- **Leaderboard**: No player elimination, score-based competition
- **Capacity vs Generation**: Two-step resource growth system
- **First 5 Minutes**: Must teach explore→develop loop

## Important Reminders
- Players start with 150 AP
- Actions regenerate at 10 AP/hour  
- Resources show as "current amount (+generation/hr)"
- Explore increases capacity, Develop increases generation up to capacity
- 2-hour timers create return hooks (10s for testing)
- Keep UI minimal and text-based for MVP

## Technical Stack ✅
- **Frontend**: Vanilla HTML/CSS/JavaScript (single file)
- **Styling**: Terminal green-on-black theme
- **Persistence**: LocalStorage (not yet implemented)
- **Timers**: Real-time JavaScript intervals
- **No frameworks**: Validated core loop first

## Testing Commands
```bash
# Start development server (background)
nohup python3 -m http.server 8000 > server.log 2>&1 &

# Check if server running
ps aux | grep "python3 -m http.server"

# Access game
# Open browser: http://localhost:8000

# Stop server
pkill -f "python3 -m http.server 8000"
```

## Architecture Decisions
- **Single HTML file**: Easier testing and deployment
- **Real-time updates**: 1-second intervals for smooth UX
- **Capacity vs Generation**: Two-step resource system works well
- **10-second timers**: For rapid testing (will be 2 hours in production)
- **No persistence yet**: Focus on core mechanics first