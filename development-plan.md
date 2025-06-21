# Web 4X Development Plan

## Current Status
- Date: 2025-06-21
- Phase: Pre-MVP Planning
- Next Goal: Build core action point system

## Phase 1: Minutes 0-5 - Discovery Phase

### Overview
**Goal**: Create an engaging first 5 minutes where players learn basic controls and get excited about exploration

**Player Experience Target**:
- Spend ~20-30 AP
- Make 10-15 meaningful decisions
- Move scout 3-5 times
- Reveal 10-15 map tiles
- Discover 2-3 different terrain types
- End with clear next goal

### Step 1.1: Minimal AP Display & First Action
**Implementation**:
- [ ] Create index.html with minimal UI
- [ ] Show only: "Action Points: 150" at top
- [ ] Display scout at center of visible 3x3 grid
- [ ] Simple instruction: "Click your scout"
- [ ] When clicked, show: "Click an adjacent tile to move (2 AP)"

**Success Criteria**:
- First click within 5 seconds
- Understand AP cost immediately

### Step 1.2: First Movement
**Implementation**:
- [ ] Highlight valid adjacent tiles when scout selected
- [ ] Click tile: Spend 2 AP, start 30s timer
- [ ] Show: "Scout moving..." with countdown
- [ ] Animate AP: 150 → 148 (visible deduction)
- [ ] During movement, show "Movement will reveal new tiles!"

**Success Criteria**:
- Movement feels responsive
- 30s creates anticipation, not frustration

### Step 1.3: Terrain Reveal & Variety
**Implementation**:
- [ ] When movement completes, reveal 3x3 area
- [ ] Show terrain types with simple text:
  - "Plains" (beige text)
  - "Forest" (green text)  
  - "River" (blue text)
  - "Hills" (brown text)
- [ ] Auto-show popup: "Forest discovered! Click to examine (1 AP)"

**Success Criteria**:
- "Aha!" moment when terrain revealed
- Want to examine immediately

### Step 1.4: Examine Mechanic
**Implementation**:
- [ ] Click revealed terrain tile (not unit tile)
- [ ] Costs 1 AP, instant result
- [ ] Show bonus in popup: "Forest: +2 Food, +1 Production if settled"
- [ ] Log discovery in side panel
- [ ] Hint: "Find the best spot for your first settlement!"

**Success Criteria**:
- Examine 2+ different terrains
- Start thinking about settlement placement

### Step 1.5: Strategic Exploration
**Implementation**:
- [ ] After 2-3 moves, show: "Tip: Rivers and resources make great settlement spots!"
- [ ] Ensure at least one "special" discovery by move 4-5:
  - River confluence
  - Resource tile (Stone/Gold)
  - Ruins (teaser for later)
- [ ] Show running discoveries list
- [ ] End with: "Continue exploring to find the perfect settlement location..."

**Success Criteria**:
- Player has spent 20-30 AP
- Has clear goal (find settlement spot)
- Wants to continue immediately
- Understanding of core mechanics

### What We're NOT Building Yet:
- Settlement placement
- Resource generation
- Production queues
- Multiple units
- Fog of war beyond 3x3
- Any combat
- Other players

### Testing Protocol for 5-Minute Session:
1. **Fresh User Test**: No instructions except "Play"
2. **Measure**:
   - Time to first action
   - Number of tiles explored
   - AP spent
   - Tiles examined
   - Where they stop/get confused
3. **Success Metrics**:
   - Complete in 3-5 minutes
   - Want to continue playing
   - No confusion points
   - Clear about next goal

## Future Phases (High Level Only)

### Phase 2: Minutes 5-10 - Decision Phase
- Settlement site selection
- Marking potential spots
- Comparing locations

### Phase 3: Minutes 10-15 - Foundation Phase  
- Placing settlement
- Understanding timers
- First production choice

### Phase 4+: TBD based on testing

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