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
**Status**: Design complete, NO CODE written yet
**Next Step**: Implement Step 1.1 from development-plan.md - Create minimal HTML with AP display and resource counters

## What We're Building First (Step 1.1)
```
Action Points: 150

Food: 5/5 | Production: 3/3 | Gold: 1/1
(format: generation/capacity per hour)

[EXPLORE - 5 AP]
```

## Key Design Decisions Made
- **NO MAPS**: Abstract resource discovery, not spatial exploration
- **Leaderboard**: No player elimination, score-based competition
- **Capacity vs Generation**: Two-step resource growth system
- **First 5 Minutes**: Must teach explore→develop loop

## Important Reminders
- Players start with 150 AP
- Actions regenerate at 10 AP/hour  
- Resources show as "current/capacity"
- Explore increases capacity, Develop increases generation
- 2-hour timers create return hooks
- Keep UI minimal and text-based for MVP

## Technical Stack (TBD)
- Start with vanilla HTML/CSS/JavaScript
- Use localStorage for persistence
- No frameworks until core loop validated

## Testing Commands
<!-- Add test/lint commands here as we discover them -->

## Architecture Decisions
<!-- Document key technical decisions as we make them -->