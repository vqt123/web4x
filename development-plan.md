# Web 4X Development Plan

## Current Status
- Date: 2025-06-21
- Phase: ✅ Phase 1 COMPLETE - Core MVP Implemented
- Next Goal: Test 5-minute experience and gather feedback

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

### Step 1.1: Core UI & Resource Display ✅
**Implementation**:
- [x] Create index.html with minimal UI
- [x] Display: "Action Points: 150" at top
- [x] Show resources: "Food: 15 (+5/hr) | Production: 9 (+3/hr) | Gold: 3 (+1/hr)"
- [x] Format: "current amount (+generation/hr)" with auto-updates
- [x] Big "Explore" button (5 AP cost shown)

**Success Criteria**: ✅ ACHIEVED
- Resources display clearly with generation rates
- Actions have clear descriptions and tooltips

### Step 1.2: First Exploration ✅
**Implementation**:
- [x] Click "Explore": Deduct 5 AP (150 → 145)
- [x] Roll discovery with 60/30/10% distribution (food/production/gold)
- [x] Result popup: "Fertile lands discovered! Food generation capacity +1"
- [x] Update capacity for future development
- [x] Clear explanation of capacity vs generation

**Success Criteria**: ✅ ACHIEVED
- Discovery feels exciting with thematic messages
- Clear understanding of capacity for future development

### Step 1.3: Development Introduction ✅
**Implementation**:
- [x] "Develop" button always visible with clear description
- [x] Tooltip: "Build infrastructure to increase resource generation rate"
- [x] Click Develop: Choose from available resources with capacity > generation
- [x] Cost 10 AP, start 2-hour timer (10s for testing)
- [x] Show: "Food development: 0:00:09" with real-time countdown

**Success Criteria**: ✅ ACHIEVED
- Clear explore → develop loop understanding
- Engaging timer system with completion notifications

### Step 1.4: Strategic Decisions ✅
**Implementation**:
- [x] Continue exploring: All 3 resource types discoverable
- [x] Discovery log shows timestamped history: "13:45:23: Explored and found food capacity +1"
- [x] Multiple explore/develop cycles create capacity gaps
- [x] Decision point: Develop accumulated capacity or keep exploring?
- [x] AP regeneration (not yet implemented - future feature)

**Success Criteria**: ✅ ACHIEVED
- Clear tension between exploration and development
- Activity log helps with decision planning

### Step 1.5: Hook for Return 🔄 PARTIALLY COMPLETE
**Implementation**:
- [ ] **TODO**: Smart tips based on game state
- [x] Display active timer prominently: "Food development: 0:00:07"
- [ ] **TODO**: Tease next unlock: "Research unlocks at 10 total generation!"
- [ ] **TODO**: Show other players' stats (multiplayer feature)
- [x] End state: Multiple developments possible, clear progression

**Success Criteria**: 🔄 PARTIALLY ACHIEVED
- [x] Players can spend 25-35 AP easily
- [x] Multiple timers can run simultaneously
- [x] Timer completion creates return motivation
- [x] Core loop completely functional

**Next Steps for 1.5**:
- Add smart tips/hints system
- Preview of research unlock
- Multiplayer leaderboard preview

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
### Major Changes from Original Design:
1. **Resource Display Format**: Changed from "generation/capacity" to "current amount (+generation/hr)"
   - **Reason**: User feedback - clearer understanding of auto-generation
   - **Impact**: Much better UX, resources feel more dynamic

2. **Timer Duration**: Using 10 seconds instead of 2 hours for development
   - **Reason**: Rapid testing and feedback cycles
   - **Future**: Will return to 2 hours for production

3. **Auto-Generation**: Added real-time resource accumulation
   - **Reason**: User feedback - resources should generate automatically
   - **Impact**: Game feels more alive and rewarding

## Playtesting Notes
### Session 1 (2025-06-21):
**User Feedback**:
- ✅ "Exploration feels good with the random discovery messages"
- ⚠️ "Wasn't clear what actions would do at first" → Fixed with tooltips
- ⚠️ "Expected resources to generate automatically" → Fixed with auto-generation
- ✅ "Development timers create good anticipation"
- ✅ "Easy to understand explore→develop loop after first cycle"

**Observed Metrics**:
- Time to first action: ~15 seconds (good)
- Actions in first 5 minutes: 8-12 explore/develop (target achieved)
- User retention: Wanted to continue after timers started

**Key Insights**:
- Core mechanics work well
- UX clarity crucial for first 30 seconds
- Auto-generation essential for resource games
- Discovery randomness creates engagement

---

*This is a living document. Update after each development session and playtest.*