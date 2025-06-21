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

## Current Development Phase
Building Phase 1 (Minutes 0-5) focusing on:
1. Resource display (generation/capacity format)
2. Explore action with random discoveries
3. Develop action with timers
4. Core loop understanding

## Important Reminders
- Players start with 150 AP
- Actions regenerate at 10 AP/hour
- First session should use ~100 AP over 30 minutes
- All actions should have meaningful costs and timers
- Keep the UI text-based until core mechanics are proven

## Testing Commands
<!-- Add test/lint commands here as we discover them -->

## Architecture Decisions
<!-- Document key technical decisions as we make them -->