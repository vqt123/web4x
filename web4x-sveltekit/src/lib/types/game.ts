export interface GameConfig {
	actionPoints: {
		starting: number;
		maximum: number;
		regenerationPerHour: number;
	};
	resources: {
		[key: string]: {
			startingAmount: number;
			startingGeneration: number;
			startingCapacity: number;
			storageCap: number;
		};
	};
	actions: {
		explore: {
			cost: number;
			discoveryRates: {
				[resourceType: string]: number;
			};
		};
		develop: {
			cost: number;
			timerTicks: number;
			productionTimerTicks: number;
		};
		expandStorage: {
			cost: number;
			capacityIncrease: number;
		};
	};
	timers: {
		development: {
			testingTicks: number;
			productionTicks: number;
		};
		research: {
			testingTicks: number;
			productionTicks: number;
		};
	};
	debug: {
		speedMultiplier: number;
		defaultMode: boolean;
	};
}

export interface Resource {
	amount: number;
	generation: number;
	capacity: number;
	cap: number;
}

export interface ActionPoints {
	current: number;
	max: number;
}

export interface Timer {
	id: string;
	resourceType: string;
	startTime: number;
	duration: number;
	type: 'development' | 'research';
}

export interface Player {
	guestId: string;
	resources: {
		[key: string]: Resource;
	};
	actionPoints: ActionPoints;
	activeTimers: Timer[];
	lastSeen: number;
	isBot?: boolean;
	aiStrategy?: 'explorer' | 'developer';
	nextActionTime?: number;
}

export interface GameState {
	players: {
		[guestId: string]: Player;
	};
	world: {
		startTime: number;
		currentTick: number;
		config: GameConfig;
		discoveryLog: DiscoveryLogEntry[];
	};
	metrics: {
		totalPlayers: number;
		activePlayers: number;
		ticksProcessed: number;
	};
}

export interface DiscoveryLogEntry {
	playerId: string;
	timestamp: number;
	message: string;
	resourceType: string;
}

export interface LeaderboardEntry {
	playerId: string;
	playerName: string;
	score: number;
	isBot: boolean;
}

export interface ActionResult {
	success: boolean;
	error?: string;
	data?: any;
}

export type ActionType = 'explore' | 'develop' | 'expandStorage' | 'toggleDebug';

export interface GameAction {
	type: ActionType;
	data?: {
		resourceType?: string;
		[key: string]: any;
	};
}

export interface WorldEvent {
	type: string;
	message: string;
	timestamp: number;
	playerCount?: number;
}