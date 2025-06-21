# Web 4X Game Design Document

## Core Concept
A turn-based, action-per-time based web 4X game inspired by RTS mechanics, designed to be played over a 2-week period with multiple short sessions per day. The game abstracts away spatial elements, focusing on resource capacity discovery and development through strategic action point allocation.

**Current Implementation Status**: Phase 1 Enhanced - Core mechanics with resource management and debug tools complete.

## Game Duration & Pacing
- **Total Game Length**: 14 days per match
- **Daily Sessions**: 3-4 times per day
- **Session Length**: 5-30 minutes (first session longest)
- **Design Philosophy**: Start with intense micro-management that naturally scales to macro strategy

## Action Point System

### Economy
- **Starting Points**: 150 AP (full tank for crucial opening)
- **Regeneration Rate**: 10 AP per hour (240 AP per day)
- **Maximum Storage**: 200-250 AP
- **Design Intent**: Encourages regular play without punishing missed sessions

### Action Scaling Over Time
**Days 1-2: Micro Management Phase**
- 1-5 AP per action
- Individual resource discoveries
- Capacity vs generation decisions
- Every decision is meaningful

**Days 3-7: Tactical Scale**
- 5-15 AP per action
- Multiple development projects
- Resource optimization
- Trade negotiations

**Days 8-14: Strategic Scale**
- 10-30 AP per action
- Economic warfare
- Mega-projects
- Alliance resource sharing

## First 30 Minutes - Critical Opening Session

### Minutes 0-5: Discovery Phase ✅ IMPLEMENTED
- Start with base generation: Food 5/hr, Production 3/hr, Gold 1/hr
- Resources display: "Food: 10/50 (+5/Hr 5/Hr Max)" format
- **Explore Action** (5 AP): Roll for capacity increase
  - 60%: +1 Food capacity
  - 30%: +1 Production capacity  
  - 10%: +1 Gold capacity
- **Develop Action** (10 AP): Convert capacity to generation (auto-completing timer)
- **Expand Storage** (20 AP): Increase resource storage caps by +20
- Make 10-15 meaningful decisions about exploration vs development

### Minutes 5-10: Strategic Development
- Balance exploration (building capacity) vs development (actualizing it)
- First development completes during this phase
- Introduction of **Research** (15 AP, 4-hour timer) for multipliers
- Resource conversion/trading unlocked

### Minutes 10-20: Optimization Phase
- Multiple developments running simultaneously
- Specialization decisions (focus on one resource or balance?)
- First research completes, improving future actions
- Introduction of competitive elements (other players' progress visible)

### Minutes 20-30: Engagement Hook
- Major decision point with accumulated resources
- Unlock advanced actions (military, diplomacy, mega-projects)
- Clear goals for next session
- 2-3 timers running to encourage return

## Core Mechanics

### Time-Based Actions
- **Development**: 2 hours (converts capacity to generation)
- **Research**: 4 hours (improves efficiency multipliers)
- **Major Projects**: 8-24 hours (game-changing effects)
- **Trade Deals**: 1 hour (resource conversion agreements)
- **Design Intent**: Creates anticipation and planning opportunities

### Resource System ✅ IMPLEMENTED
- **Basic Resources**: Food, Production, Gold
- **Capacity vs Generation**: 
  - Capacity = Maximum possible generation (increased through exploration)
  - Generation = Actual per-hour income (increased through development)
  - Storage Cap = Maximum resource accumulation (expandable)
- **Starting Values** (see @game-config.json):
  - Food: 10 amount, 5/hr generation, 5 capacity, 50 storage cap
  - Production: 6 amount, 3/hr generation, 3 capacity, 30 storage cap
  - Gold: 2 amount, 1/hr generation, 1 capacity, 20 storage cap
- **Growth Example**: Explore → Food capacity 5→6, then Develop → Food generation 5→6/hr
- **Storage Management**: Resources cap at storage limit, expansion available for +20 capacity

### End Game & Scoring
- **Leaderboard-based**: No elimination or bankruptcy
- **Score factors**:
  - Total resource generation rate
  - Efficiency ratios (generation/capacity)
  - Research milestones achieved
  - Successful trades completed
  - Special achievements/projects
- **Final 48 hours**: Score multipliers increase to create exciting finish
- **Post-game**: See detailed stats and start next 2-week cycle
- (Exact scoring formula to be refined through playtesting)

## User Interface Design

### Current Implementation: Text-Based ✅
```
Day 1, 00:05:23                           DEBUG MODE: 3600x
Action Points: 142/250                    Tick: 323
                                          Session: 45s

Resources
Food: 25/50 (+5/Hr 8/Hr Max)
Production: 18/30 (+3/Hr 6/Hr Max)
Gold: 12/20 (+1/Hr 4/Hr Max)

Active Developments
Food development: 0:00:07

[EXPLORE - 5 AP]  [DEVELOP - 10 AP]  [EXPAND STORAGE - 20 AP]  [DEBUG MODE]
```

**Key UI Features Implemented**:
- Wall clock showing game time progression
- Debug panel with speed mode and tick counter
- Resource format: current/cap (+generation/Hr capacity/Hr Max)
- Auto-completing timers
- Action point regeneration display

### Benefits of Text-First Development
- Rapid iteration on mechanics
- Focus on pacing and balance
- No graphics dependencies
- Easy to add complexity incrementally
- Clear action economy visibility

## Development Approach

### Philosophy
- **5-Minute Chunks**: Build and perfect the game in 5-minute increments
- **Discovery Phase First**: Perfect minutes 0-5 before moving to 5-10
- **Validate Each Phase**: Don't proceed until current phase is engaging
- **Tight Feedback Loops**: Test each 5-minute chunk extensively
- **Connected Experience**: Each chunk must flow naturally to the next

### Development Phases
1. **Minutes 0-5**: Discovery Phase - Exploration rolls, capacity discovery, first developments
2. **Minutes 5-10**: Decision Phase - Capacity vs generation balance, research introduction
3. **Minutes 10-15**: Optimization Phase - Multiple developments, specialization choices
4. **Minutes 15-20**: Competition Phase - See other players' progress, trade opportunities
5. **Minutes 20-30**: Engagement Hook - Advanced actions unlock, major projects

### Technical Considerations
- Browser-based for accessibility
- Persistent game state required
- Real-time timer processing
- Notification system for completed actions
- Mobile-friendly interface essential

### Implementation Status
1. ✅ Core action point system with regeneration
2. ✅ Exploration action with capacity discovery
3. ✅ Development action with auto-completing timers
4. ✅ Resource display (capacity/generation/storage)
5. ✅ Storage expansion mechanics
6. ✅ Debug speed mode for testing
7. ✅ Tick-based architecture
8. 🔄 Research and efficiency multipliers (planned)
9. 🔄 Trading and resource conversion (planned)
10. 🔄 Other players, competition, advanced features (planned)

## Game Progression Timeline

### Days 1-3: Foundation Phase
- 2-3 settlements established
- Basic economy running
- Territory borders beginning to meet
- Learning game systems

### Days 4-7: Expansion & Tension
- Resource competition intensifies
- First skirmishes occur
- Alliance formation begins
- Technology differences emerge

### Days 8-11: Major Conflicts
- Territory wars
- Economic warfare
- Alliance betrayals
- Power consolidation

### Days 12-14: Endgame
- Score multipliers activate
- Final efficiency pushes
- Leaderboard positions shift rapidly
- Rush to complete achievements
- No player elimination - everyone plays to the end

## Design Principles

1. **Every Action Matters**: Especially in early game, each AP spent should feel impactful
2. **Natural Progression**: Micro to macro gameplay happens organically
3. **Respect Player Time**: 2-week commitment with flexible scheduling
4. **Clear Feedback**: Always show what actions cost and when they complete
5. **Strategic Depth**: Simple actions combine into complex strategies
6. **Inclusive Competition**: Leaderboard focus means everyone can play to the end
7. **Positive Reinforcement**: No elimination or bankruptcy - always moving forward

## Implementation Notes

**Configuration**: All balance parameters are defined in `@game-config.json`

**Architecture**: Tick-based system with 1 tick = 1 second game time
- Normal mode: 1 tick processed per second
- Debug mode: 3600 ticks processed per second (1 hour game time = 1 real second)

**Current Testing Focus**:
1. ✅ Core loop validation (explore→develop)
2. ✅ Resource management balance (caps, expansion)
3. 🔄 Extended session engagement
4. 🔄 Action point regeneration balance
5. 🔄 Storage expansion economics

## Next Development Phases
1. **Research System**: 15 AP action with efficiency multipliers
2. **Trading Mechanics**: Resource conversion and player interaction
3. **Competition Elements**: Leaderboards and comparative progress
4. **Advanced Actions**: Late-game mechanics and mega-projects

## Current Balance Questions

**Resource Management**:
- Are starting storage caps (50/30/20) appropriate?
- Is storage expansion cost (20 AP for +20) balanced?
- Should storage caps scale differently per resource type?

**Action Point Economy**:
- Is 10 AP/hour regeneration with 250 cap optimal?
- Are action costs (5/10/20 AP) creating good decisions?
- How does debug mode affect balance testing?

**Timer Balance**:
- Should development be 2 hours in production vs 10 seconds testing?
- What's the optimal timer length for engagement hooks?

**Future Design Questions**:
- Research system implementation (efficiency multipliers)
- Trading mechanics design
- Competition and leaderboard systems
- Mid and late game progression
- Multiplayer interaction depth

---

## Configuration Reference
See `@game-config.json` for all balance parameters, action costs, and timer durations.

## Development Reference
See `@development-plan.md` for implementation phases, testing protocols, and architecture decisions.

*This document represents the current design vision. Balance parameters are externalized to game-config.json for easy iteration.*