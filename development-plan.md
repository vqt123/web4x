# Web 4X Development Plan

## Current Status
- Date: 2025-06-22
- Phase: ✅ Phase 2 COMPLETED - Client-Server Architecture (for testing)
- Status: Architecture implemented, focus shifted to single-player experience
- Current Goal: Single-player pacing refinement and research system
- Configuration: All balance parameters in @game-config.json
- Code Quality: Maximum 250 lines per file, refactor as needed

## Phase 1: Minutes 0-5 - Discovery Phase

### Overview
**Goal**: Create an engaging first 5 minutes where players understand the core loop of exploration → capacity → development

**Player Experience Target**:
- Spend portion of starting AP pool
- Make multiple meaningful decisions
- Perform several explore actions
- Start developments
- See clear resource growth potential
- End with excitement about optimization

### Step 1.1: Core UI & Resource Display ✅
**Implementation**:
- [x] Create index.html with minimal UI
- [x] Display action points at top
- [x] Show resources with generation rates
- [x] Format: "current amount (+generation/hr)" with auto-updates
- [x] Action buttons with costs shown

**Success Criteria**: ✅ ACHIEVED
- Resources display clearly with generation rates
- Actions have clear descriptions and tooltips

### Step 1.2: First Exploration ✅
**Implementation**:
- [x] Click "Explore": Deduct AP cost
- [x] Roll discovery with configured distribution rates
- [x] Result popup with thematic discovery messages
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
- [x] Start timer with configured duration
- [x] Show development progress with real-time countdown

**Success Criteria**: ✅ ACHIEVED
- Clear explore → develop loop understanding
- Engaging timer system with completion notifications

### Step 1.4: Strategic Decisions ✅
**Implementation**:
- [x] Continue exploring: All resource types discoverable
- [x] Discovery log shows timestamped history
- [x] Multiple explore/develop cycles create capacity gaps
- [x] Decision point: Develop accumulated capacity or keep exploring?
- [x] AP regeneration implemented with tick system

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
- [x] Players can spend meaningful portion of AP easily
- [x] Multiple timers can run simultaneously
- [x] Timer completion creates return motivation
- [x] Core loop completely functional

**Next Steps for 1.5**:
- Add smart tips/hints system
- Preview of research unlock
- Multiplayer leaderboard preview

## ✅ MAJOR ENHANCEMENTS COMPLETED

### Phase 1.6: Tick-Based Architecture ✅
**Implementation**:
- [x] Redesigned entire game to use tick-based time system
- [x] Clean time management with configurable rates
- [x] Action Point regeneration: per-tick calculation
- [x] Resource generation: per-tick accumulation with caps
- [x] Auto-completing timers (no manual collection needed)

### Phase 1.7: Resource Management System ✅
**Implementation**:
- [x] Storage caps per resource type (configurable)
- [x] Resources can't exceed storage limits
- [x] Storage expansion action with configurable costs/benefits
- [x] Clear UI format: "current/cap (+generation/Hr capacity/Hr Max)"
- [x] Explore increases "Max", Develop increases current generation

### Phase 1.8: Debug & Time Systems ✅
**Implementation**:
- [x] Debug mode: Configurable speed acceleration
- [x] Wall clock: Game time display always visible
- [x] Session timer: Real-world time tracking
- [x] Always-visible debug panel with tick counter
- [x] Clean speed toggle with visual indicators

### What We're NOT Building Yet:
- Research system (efficiency multipliers)
- Trading mechanics
- Resource conversion
- Other players' actions
- Competition elements
- Advanced developments
- Mega projects

### Testing Protocol for Extended Sessions:
1. **5-Minute Session**: Core loop validation
   - Explore/develop understanding clear
   - Resource caps create decisions
   - Debug mode enables rapid testing
2. **30-Minute Session**: Resource management testing
   - Storage expansion decisions
   - AP regeneration balance
   - Multiple timer management
3. **2-Hour Session**: Long-term pacing validation
   - Session return hooks
   - Progress satisfaction
   - Capacity vs generation balance

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

## Phase 2: Multiplayer Foundation ✅ COMPLETED

### Overview
Transform the single-player game into a multiplayer experience with minimal complexity. Focus on getting multiple players into the same world with synchronized state.

### Status
- **Completed**: 2025-06-21
- **Architecture**: @client-server-architecture.md
- **Implementation Guide**: @multiplayer-development-plan.md

### Goals
1. ✅ Create Node.js server with Socket.io
2. ✅ Implement guest ID system (no auth required)
3. ✅ Move game logic to server
4. ✅ Synchronize state across clients
5. ✅ Support 10+ concurrent players

### Success Criteria
- ✅ Multiple players can join same world
- ✅ Actions validated server-side
- ✅ State updates broadcast to all clients
- ✅ Guest IDs persist in localStorage
- ✅ Graceful disconnect/reconnect handling

### Implementation Results
- Node.js server with Express and Socket.io
- Guest ID system using UUID and localStorage
- Server-side game logic and state management
- Real-time synchronization across clients
- Comprehensive testing infrastructure

## Future Phases (Refocused on Single-Player)

### Phase 3: Research & Progression System
- Research system with tech tree
- Advanced resource mechanics
- Long-term progression goals
- Enhanced decision complexity
- Efficiency multipliers

### Phase 4: Advanced Single-Player Features
- Extended time periods (multiple days/weeks)
- Complex resource chains
- Achievement system
- Multiple strategic paths
- End-game content and scoring

### Phase 5: Polish & Optimization
- Mobile-responsive design
- Performance optimization
- Code refactoring (250-line limit)
- Enhanced UI/UX
- Comprehensive testing

## Technical Decisions Log

### Decided:
- ✅ **Tick-Based Architecture**: Clean time management foundation
- ✅ **Debug Speed Mode**: Configurable acceleration for testing
- ✅ **Resource Caps**: Storage limits with expansion mechanics
- ✅ **Auto-Timers**: Automatic completion, no manual collection
- ✅ **Action Point Regeneration**: Configurable rates and caps
- ✅ **Always-Visible Time**: Wall clock and debug info persistent
- ✅ **Single HTML File**: Proven architecture for MVP testing
- ✅ **Text-Based UI**: Clean, focused on mechanics over graphics
- ✅ **External Configuration**: Balance parameters in game-config.json

### To Decide:
- [ ] Server architecture for multiplayer
- [ ] Database choice for persistence
- [ ] Research system implementation
- [ ] Trading mechanics design
- [ ] Framework migration (if needed)
- [ ] LocalStorage persistence implementation

## Questions to Answer Through Testing

1. **Storage Cap Balance**: Are current storage caps appropriate?
2. **AP Regeneration**: Is regeneration rate balanced with action costs?
3. **Development Timer**: Optimal timer duration for production?
4. **Storage Expansion Cost**: Is expansion cost/benefit balanced?
5. **Resource Discovery Rates**: Are discovery distribution rates working?
6. **Session Length**: How long do players stay engaged per session?
7. **Debug Mode Usage**: How does speed acceleration affect testing?

*All specific values are configurable in @game-config.json*

## Design Pivots/Changes
### Major Changes from Original Design:
1. **Tick-Based Architecture**: Complete system redesign
   - **Reason**: Time management was inconsistent, needed clean foundation
   - **Impact**: Predictable, testable, scalable time system

2. **Resource Caps**: Added storage limits and expansion mechanics
   - **Reason**: Infinite accumulation made decisions meaningless
   - **Impact**: Created resource management decisions and expansion pressure

3. **Debug Speed Mode**: 3600x time acceleration
   - **Reason**: Testing 2-hour cycles was impractical
   - **Impact**: Can test full day cycles in seconds

4. **Auto-Timer Completion**: No manual collection needed
   - **Reason**: Clicking to collect was tedious busy work
   - **Impact**: Smoother progression, focuses on decisions not clicking

5. **Enhanced UI Format**: "25/50 (+5/Hr 8/Hr Max)"
   - **Reason**: Previous format didn't clearly show capacity vs generation
   - **Impact**: Much clearer progression understanding

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