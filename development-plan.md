# Web 4X Development Plan

## Current Status
- Date: 2025-06-21
- Phase: Pre-MVP Planning
- Next Goal: Build core action point system

## Immediate Next Steps (MVP - First 30 Minutes)

### Step 1: Core Action Point System
**Goal**: Validate AP economy feels right
**Implementation**:
- [ ] Create index.html with basic UI
- [ ] Display current AP (start at 150)
- [ ] Simple "Spend AP" button (-2 AP per click)
- [ ] Implement regeneration (+10 AP/hour)
- [ ] Show regeneration timer
- [ ] LocalStorage persistence
- [ ] Action history log

**Success Criteria**:
- Spending AP feels responsive
- Regeneration rate encourages return visits
- Can close/reopen browser without losing state

### Step 2: Basic Map & Scout Movement
**Goal**: Test tile-by-tile movement engagement
**Implementation**:
- [ ] Create 10x10 grid display (just coordinates)
- [ ] Place scout unit at (5,5)
- [ ] Click scout to select
- [ ] Show movement options (adjacent tiles)
- [ ] Movement costs 2 AP
- [ ] 30-second movement timer
- [ ] Show active timers panel

**Success Criteria**:
- Moving one tile at a time feels strategic
- Timer creates anticipation
- Can track multiple movements

### Step 3: Fog of War & Exploration
**Goal**: Make exploration rewarding
**Implementation**:
- [ ] Hide all tiles except 3x3 around scout
- [ ] Reveal tiles when scout moves
- [ ] Add terrain types (Plains, Forest, River, Stone)
- [ ] "Examine tile" action (1 AP)
- [ ] Show terrain bonuses in UI
- [ ] Discovery notification system

**Success Criteria**:
- Revealing map feels exciting
- Terrain differences matter
- Players want to explore more

### Step 4: Settlement Placement
**Goal**: First major strategic decision
**Implementation**:
- [ ] "Mark settlement site" action (1 AP)
- [ ] Show cumulative bonuses for marked site
- [ ] "Found settlement" action (10 AP, 2-hour timer)
- [ ] Settlement name input
- [ ] Show resource generation preview
- [ ] Active settlements panel

**Success Criteria**:
- Choosing location feels important
- 2-hour timer creates commitment
- Clear understanding of benefits

### Step 5: Basic Production Queue
**Goal**: Long-term planning mechanics
**Implementation**:
- [ ] Settlement menu (0 AP to view)
- [ ] Queue Worker (8 AP, 2 hours)
- [ ] Queue Scout (5 AP, 1 hour)
- [ ] Show production queue
- [ ] Auto-start next item when complete
- [ ] Production complete notifications

**Success Criteria**:
- Queuing feels strategic
- Costs/times are balanced
- Want to plan ahead

## Testing Checkpoints

### After Each Step:
1. **Playtest**: Full 30-minute session
2. **Measure**: AP spent, actions taken, engagement
3. **Adjust**: Costs, timers, regeneration
4. **Document**: What worked, what didn't

### Key Metrics to Track:
- AP spent in first session
- Number of actions taken
- Time between sessions
- Which actions used most/least
- Points where players get stuck

## Future Phases (Less Detailed)

### Phase 2: Multi-Session Loop
- Second settlement
- Resource accumulation  
- Worker tile improvements
- Basic AI neighbor

### Phase 3: Conflict Introduction  
- Unit combat
- Territory control
- Defensive structures
- Simple diplomacy

### Phase 4: Full Game Loop
- Victory conditions
- Research tree
- Advanced buildings
- Multiplayer infrastructure

## Technical Decisions Log

### Decided:
- Start with vanilla HTML/CSS/JavaScript
- Use LocalStorage for persistence
- Text-based UI initially
- All timers in real-time

### To Decide:
- [ ] Server architecture for multiplayer
- [ ] Database choice
- [ ] Framework for final UI
- [ ] Notification system approach

## Questions to Answer Through Testing

1. **Is 30 seconds per tile movement too fast/slow?**
2. **Should examine tile be free or cost 1 AP?**
3. **Is 150 starting AP too much/little?**
4. **Should settlements take 2 hours or less?**
5. **How many actions before players feel "done" with a session?**

## Design Pivots/Changes
<!-- Document any changes from original design -->

## Playtesting Notes
<!-- Record feedback and observations -->

---

*This is a living document. Update after each development session and playtest.*