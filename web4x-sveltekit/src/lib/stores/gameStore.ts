import { writable } from 'svelte/store';
import type { 
	Player, 
	ActionPoints, 
	Resource, 
	Timer, 
	LeaderboardEntry, 
	WorldEvent,
	DiscoveryLogEntry 
} from '../types/game.js';

// Player state
export const player = writable<Player | null>(null);
export const guestId = writable<string>('');
export const isConnected = writable<boolean>(false);

// Game state
export const actionPoints = writable<ActionPoints>({ current: 150, max: 250 });
export const resources = writable<{ [key: string]: Resource }>({
	food: { amount: 10, generation: 5, capacity: 5, cap: 50 },
	production: { amount: 6, generation: 3, capacity: 3, cap: 30 },
	gold: { amount: 2, generation: 1, capacity: 1, cap: 20 }
});
export const activeTimers = writable<Timer[]>([]);

// Game time and debug
export const gameTime = writable<string>('Day 1, 00:00:00');
export const currentTick = writable<number>(0);
export const sessionTime = writable<number>(0);
export const isDebugMode = writable<boolean>(false);
export const playersOnline = writable<number>(1);

// Leaderboard and events
export const leaderboard = writable<LeaderboardEntry[]>([]);
export const worldEvents = writable<WorldEvent[]>([]);
export const discoveryLog = writable<DiscoveryLogEntry[]>([]);

// UI state
export const showModal = writable<string | null>(null);
export const modalData = writable<any>(null);

// Computed stores
export const totalScore = writable<number>(0);

// Actions
export function updatePlayerScore() {
	resources.subscribe(($resources) => {
		const score = Object.values($resources).reduce((sum, resource) => sum + resource.amount, 0);
		totalScore.set(score);
	});
}

export function formatGameTime(ticks: number): string {
	const totalSeconds = Math.floor(ticks);
	const days = Math.floor(totalSeconds / 86400) + 1;
	const hours = Math.floor((totalSeconds % 86400) / 3600);
	const minutes = Math.floor((totalSeconds % 3600) / 60);
	const seconds = totalSeconds % 60;
	
	return `Day ${days}, ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

export function formatResourceDisplay(resource: Resource): string {
	return `${resource.amount}/${resource.cap} (+${resource.generation}/Hr ${resource.capacity}/Hr Max)`;
}