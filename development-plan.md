# Web 4X Development Plan

## Current Status
- Date: 2025-06-21
- Phase: Pre-MVP Planning
- Next Goal: Build core action point system

## Phase 1: Minutes 0-5 - Discovery Phase

### Overview
**Goal**: Create an engaging first 5 minutes where players understand the core loop of exploration → capacity → development

**Player Experience Target**:
- Spend ~20-30 AP
- Make 10-15 meaningful decisions
- Perform 4-6 explore actions
- Start 1-2 developments
- See clear resource growth potential
- End with excitement about optimization

### Step 1.1: Core UI & Resource Display
**Implementation**:
- [ ] Create index.html with minimal UI
- [ ] Display: "Action Points: 150" at top
- [ ] Show resources: "Food: 5/5 | Production: 3/3 | Gold: 1/1"
- [ ] Format: "current generation/capacity per hour"
- [ ] Big "Explore" button (5 AP cost shown)

**Success Criteria**:
- Understand capacity vs generation immediately
- Click explore within 10 seconds

### Step 1.2: First Exploration
**Implementation**:
- [ ] Click "Explore": Deduct 5 AP (animate 150 → 145)
- [ ] Roll discovery (show dice animation or spinner)
- [ ] Result popup: "Fertile lands discovered! Food capacity +1"
- [ ] Update display: "Food: 5/6" (capacity increased)
- [ ] Hint: "Your farms can now produce up to 6 food/hour!"

**Success Criteria**:
- Discovery feels exciting (randomness)
- Understand capacity increased but not generation

### Step 1.3: Development Introduction
**Implementation**:
- [ ] After 2-3 explores, highlight "Develop" button
- [ ] Tooltip: "Convert capacity into actual production"
- [ ] Click Develop: Choose resource (Food highlighted since 5/6)
- [ ] Cost 10 AP, start 2-hour timer
- [ ] Show: "Developing farms... When complete: Food 5→6/hour"

**Success Criteria**:
- Understand the explore → develop loop
- Feel invested in the 2-hour timer

### Step 1.4: Strategic Decisions
**Implementation**:
- [ ] Continue exploring: Show all 3 resource types can be found
- [ ] Discovery log shows history: "Found: Food +1, Production +1, Food +1"
- [ ] After ~4 explores, show capacity like "Food: 5/8, Production: 3/4"
- [ ] Decision point: Develop more or keep exploring?
- [ ] Show AP regen timer: "+10 AP in 45 minutes"

**Success Criteria**:
- Feel the tension between exploration and development
- Start planning future actions

### Step 1.5: Hook for Return
**Implementation**:
- [ ] At ~30 AP spent, show: "Pro tip: Develop when capacity > generation!"
- [ ] Display active timer prominently: "Farm development: 1:58:00"
- [ ] Tease next unlock: "Research unlocks at 10 total generation!"
- [ ] Show other players' stats: "Player 2: Food 6/hr, Production 3/hr"
- [ ] End state: 1-2 developments running, clear goals

**Success Criteria**:
- Player has spent 25-35 AP
- Has 1-2 timers running
- Wants to return when development completes
- Understands core loop completely

### What We're NOT Building Yet:
- Research system
- Trading mechanics
- Resource conversion
- Other players' actions
- Competition elements
- Advanced developments
- Mega projects

### Testing Protocol for 5-Minute Session:
1. **Fresh User Test**: No instructions except "Play"
2. **Measure**:
   - Time to first action
   - Number of explores done
   - Capacity vs generation understanding
   - Development decisions made
   - Where they stop/get confused
3. **Success Metrics**:
   - Complete in 4-6 minutes
   - Start at least 1 development
   - Want to return when timer completes
   - No confusion about capacity/generation

## Future Phases (High Level Only)

### Phase 2: Minutes 5-10 - Optimization Phase
- Multiple developments running
- Resource specialization choices
- Introduction of Research action
- First glimpse of other players

### Phase 3: Minutes 10-15 - Competition Phase  
- Trading system unlocked
- Efficiency multipliers from research
- Competitive pressure visible

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