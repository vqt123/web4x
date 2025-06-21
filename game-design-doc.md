# Web 4X Game Design Document

## Core Concept
A turn-based, action-per-time based web 4X game inspired by RTS mechanics, designed to be played over a 2-week period with multiple short sessions per day.

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
- 1-3 AP per action
- Individual unit movements
- Tile-by-tile exploration
- Every decision is meaningful

**Days 3-7: Tactical Scale**
- 5-10 AP per action
- Group movements
- Multi-queue production
- Area commands

**Days 8-14: Strategic Scale**
- 10-20 AP per action
- Army movements
- City management
- Alliance operations

## First 30 Minutes - Critical Opening Session

### Minutes 0-5: Discovery Phase
- Player starts with 150 AP and one scout unit
- Move scout tile by tile (2 AP per move, 30-second timer)
- Reveal terrain gradually (fog of war)
- Examine tiles for bonuses (1 AP, instant)
- Find ideal settlement location

### Minutes 10-15: Foundation
- Found first settlement (10 AP, 2-hour timer)
- Name civilization
- See resource generation preview
- Understand basic economy

### Minutes 15-25: First Decisions
- Queue worker production (8 AP)
- Set research priority (2 AP)
- Continue scouting borders
- Discover neighbors or resources
- Plan expansion strategy

### Minutes 25-30: Planning Ahead
- ~100 AP spent, 50 remaining
- Multiple active timers (settlement construction, unit movement)
- Clear understanding of next actions
- Excitement to return

## Core Mechanics

### Time-Based Actions
- **Unit Movement**: 30 seconds per tile initially
- **Building Construction**: 2-24 hours depending on building
- **Unit Production**: 1-4 hours
- **Research**: 6-48 hours
- **Design Intent**: Creates anticipation and planning opportunities

### Resource System
- **Basic Resources**: Food, Production, Gold
- **Generation**: Automatic per hour from controlled structures
- **Tile Bonuses**: 
  - Forest: +2 Food, +1 Production
  - River: +3 Food, +1 Gold, allows irrigation
  - Stone: +2 Production

### Victory Conditions
- Control 60% of map territory
- Eliminate all opponents
- Achieve specific victory points
- (Details to be refined through playtesting)

## User Interface Design

### MVP Approach: Text-Based
```
Day 3, 14:23 | Action Points: 23/40

=== Active Orders ===
- Scout arriving at (12,8) in 2h 15m
- Barracks completes in 5h 30m
- Warrior training completes in 8h

=== Available Actions ===
[1] View Settlements (0 AP)
[2] Issue Movement Orders (1-2 AP)
[3] Queue Production (3 AP)
[4] View Map Reports (0 AP)
```

### Benefits of Text-First Development
- Rapid iteration on mechanics
- Focus on pacing and balance
- No graphics dependencies
- Easy to add complexity incrementally
- Clear action economy visibility

## Development Approach

### Philosophy
- Start simple with core action loop
- Test pacing extensively before adding features
- Build connected experience, not isolated features
- Focus intensely on first session perfection

### Technical Considerations
- Browser-based for accessibility
- Persistent game state required
- Real-time timer processing
- Notification system for completed actions
- Mobile-friendly interface essential

### Implementation Priorities
1. Core action point system with regeneration
2. Basic movement and timers
3. Fog of war and exploration
4. Settlement placement and resources
5. Production queues
6. Other players (AI first, then multiplayer)
7. Combat, diplomacy, advanced features

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
- Final victory pushes
- Desperate defenses
- Score maximization
- Climactic battles

## Design Principles

1. **Every Action Matters**: Especially in early game, each AP spent should feel impactful
2. **Natural Progression**: Micro to macro gameplay happens organically
3. **Respect Player Time**: 2-week commitment with flexible scheduling
4. **Clear Feedback**: Always show what actions cost and when they complete
5. **Strategic Depth**: Simple actions combine into complex strategies
6. **Social Gameplay**: Asynchronous multiplayer enables diplomacy and conflict

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