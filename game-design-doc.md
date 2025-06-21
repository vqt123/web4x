# Web 4X Game Design Document

## Core Concept
A turn-based, action-per-time based web 4X game inspired by RTS mechanics, designed to be played over a 2-week period with multiple short sessions per day. The game abstracts away spatial elements, focusing on resource capacity discovery and development through strategic action point allocation.

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

### Minutes 0-5: Discovery Phase
- Start with base generation: Food 5/hr, Production 3/hr, Gold 1/hr
- Each resource shows current/capacity (e.g., "Food: 5/5")
- **Explore Action** (5 AP): Roll for capacity increase
  - 60%: +1 Food capacity
  - 30%: +1 Production capacity  
  - 10%: +1 Gold capacity
- **Develop Action** (10 AP): Convert capacity to generation (2-hour timer)
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

### Resource System
- **Basic Resources**: Food, Production, Gold
- **Capacity vs Generation**: 
  - Capacity = Maximum possible generation (increased through exploration)
  - Generation = Actual per-hour income (increased through development)
- **Starting Values**:
  - Food: 5/hr (5 capacity)
  - Production: 3/hr (3 capacity)
  - Gold: 1/hr (1 capacity)
- **Growth Example**: Explore → Food capacity 5→6, then Develop → Food generation 5→6/hr

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

### MVP Approach: Text-Based
```
Day 3, 14:23 | Action Points: 23/40

=== Resources (per hour) ===
Food: 23/28 capacity (+23/hr)
Production: 18/22 capacity (+18/hr) 
Gold: 12/15 capacity (+12/hr)

=== Active Timers ===
- Farm Development completes in 1h 15m (+3 Food/hr)
- Efficiency Research completes in 3h 30m (1.2x multiplier)
- Trade Deal with Player 2 expires in 5h

=== Actions ===
[1] Explore (5 AP) - Discover new capacity
[2] Develop (10 AP) - Increase generation
[3] Research (15 AP) - Improve efficiency
[4] Trade (8 AP) - Exchange resources
```

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

### Implementation Priorities
1. Core action point system with regeneration
2. Exploration action with capacity discovery
3. Development action with timers
4. Resource display (capacity/generation)
5. Research and efficiency multipliers
6. Trading and resource conversion
7. Other players, competition, advanced features

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

## Next Steps

1. Build MVP focusing on first 30-minute experience
2. Test action point economy and regeneration rates
3. Validate that micro-decisions feel engaging
4. Iterate on timer durations for actions
5. Only after core loop is fun, add additional features

## Open Questions for Iteration

- Exact combat resolution mechanics
- Diplomacy system depth
- Technology tree design
- Mid and late game pacing
- Victory condition balance
- Player elimination vs. comeback mechanics

---

*This document represents the current design vision. Many details, especially mid and late game mechanics, will be refined through playtesting and iteration.*