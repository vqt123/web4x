import { writable } from 'svelte/store';
import { io, type Socket } from 'socket.io-client';
import type { GameAction, ActionResult, WorldEvent } from '../types/game.js';
import {
	player,
	guestId,
	isConnected,
	actionPoints,
	resources,
	activeTimers,
	gameTime,
	currentTick,
	sessionTime,
	isDebugMode,
	playersOnline,
	leaderboard,
	worldEvents,
	discoveryLog,
	showModal,
	modalData,
	formatGameTime,
	updatePlayerScore
} from './gameStore.js';
import { browser } from '$app/environment';

export const socket = writable<Socket | null>(null);

let socketInstance: Socket | null = null;
let sessionStartTime = 0;

export function initializeSocket() {
	if (!browser) return;
	
	sessionStartTime = Date.now();
	
	// Get or create guest ID
	let currentGuestId = localStorage.getItem('guestId');
	if (!currentGuestId) {
		currentGuestId = '';
	}
	guestId.set(currentGuestId);

	// Connect to socket
	socketInstance = io('http://localhost:3000', {
		withCredentials: true,
		transports: ['websocket', 'polling']
	});
	socket.set(socketInstance);

	// Connection events
	socketInstance.on('connect', () => {
		console.log('Connected to server');
		isConnected.set(true);
		socketInstance?.emit('join', { guestId: currentGuestId });
	});

	socketInstance.on('disconnect', () => {
		console.log('Disconnected from server');
		isConnected.set(false);
	});

	// Game events
	socketInstance.on('welcome', (data) => {
		console.log('Welcome received:', data);
		
		if (!currentGuestId) {
			currentGuestId = data.guestId;
			guestId.set(currentGuestId);
			localStorage.setItem('guestId', currentGuestId);
		}
		
		if (data.state) {
			player.set(data.state);
			actionPoints.set(data.state.actionPoints);
			resources.set(data.state.resources);
			activeTimers.set(data.state.activeTimers || []);
			updatePlayerScore();
		}
		
		if (data.worldInfo) {
			playersOnline.set(data.worldInfo.totalPlayers || 1);
		}
	});

	socketInstance.on('stateUpdate', (data) => {
		if (data.actionPoints) {
			actionPoints.set(data.actionPoints);
		}
		if (data.resources) {
			resources.set(data.resources);
			updatePlayerScore();
		}
		if (data.activeTimers) {
			activeTimers.set(data.activeTimers);
		}
		if (data.gameTime) {
			gameTime.set(formatGameTime(data.gameTime));
			currentTick.set(data.gameTime);
		}
		if (data.isDebugMode !== undefined) {
			isDebugMode.set(data.isDebugMode);
		}
		if (data.playersOnline) {
			playersOnline.set(data.playersOnline);
		}
		if (data.leaderboard) {
			leaderboard.set(data.leaderboard);
		}
		
		// Update session time
		const now = Date.now();
		const elapsed = Math.floor((now - sessionStartTime) / 1000);
		sessionTime.set(elapsed);
	});

	socketInstance.on('actionResult', (result: ActionResult) => {
		console.log('Action result:', result);
		
		if (!result.success && result.error) {
			// Handle error - could show a toast or modal
			console.error('Action failed:', result.error);
		}
		
		if (result.data && result.data.modal) {
			showModal.set(result.data.modal.type);
			modalData.set(result.data.modal.data);
		}
	});

	socketInstance.on('worldEvent', (event: WorldEvent) => {
		worldEvents.update(events => {
			const newEvents = [event, ...events];
			return newEvents.slice(0, 10); // Keep only last 10 events
		});
		
		if (event.playerCount) {
			playersOnline.set(event.playerCount);
		}
	});

	socketInstance.on('discoveryUpdate', (entry) => {
		discoveryLog.update(log => {
			const newLog = [entry, ...log];
			return newLog.slice(0, 50); // Keep only last 50 entries
		});
	});

	return socketInstance;
}

export function sendAction(action: GameAction): void {
	if (socketInstance && socketInstance.connected) {
		socketInstance.emit('action', action);
	} else {
		console.error('Socket not connected');
	}
}

export function disconnect(): void {
	if (socketInstance) {
		socketInstance.disconnect();
		socketInstance = null;
		socket.set(null);
		isConnected.set(false);
	}
}

// Action helpers
export function explore(): void {
	sendAction({ type: 'explore' });
}

export function develop(resourceType: string): void {
	sendAction({ type: 'develop', data: { resourceType } });
}

export function expandStorage(resourceType: string): void {
	sendAction({ type: 'expandStorage', data: { resourceType } });
}

export function toggleDebugMode(): void {
	sendAction({ type: 'toggleDebug' });
}