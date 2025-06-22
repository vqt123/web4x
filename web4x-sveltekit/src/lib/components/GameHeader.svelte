<script lang="ts">
	import { actionPoints, gameTime, currentTick, sessionTime, isDebugMode, playersOnline } from '$lib/stores/gameStore.js';
	import { isConnected } from '$lib/stores/gameStore.js';
	
	function formatTime(seconds: number): string {
		const minutes = Math.floor(seconds / 60);
		const secs = seconds % 60;
		return `${minutes}:${secs.toString().padStart(2, '0')}`;
	}
</script>

<header class="terminal-window mb-6">
	<div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
		<div class="flex items-center gap-4">
			<div class="status-indicator">
				<span class="inline-block w-2 h-2 rounded-full mr-2" 
				      class:bg-green-500={$isConnected} 
				      class:bg-red-500={!$isConnected}></span>
				{$isConnected ? 'connected' : 'disconnected'}
			</div>
			<div class="text-sm">Players online: {$playersOnline}</div>
		</div>
		
		<h1 class="text-2xl font-bold text-center">Web 4X Game</h1>
		
		<div class="flex flex-col items-end gap-2">
			<div class="text-lg">Action Points: {Math.floor($actionPoints.current)}/{$actionPoints.max}</div>
			
			<div class="flex gap-4 text-sm">
				<div>{$gameTime}</div>
				{#if $isDebugMode}
					<div class="debug-panel">DEBUG MODE: 3600x</div>
				{:else}
					<div class="debug-panel">Normal Speed</div>
				{/if}
			</div>
			
			<div class="flex gap-4 text-xs">
				<div class="debug-panel">Tick: {$currentTick}</div>
				<div class="debug-panel">Session: {formatTime($sessionTime)}</div>
			</div>
		</div>
	</div>
</header>