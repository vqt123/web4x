<script lang="ts">
	import { activeTimers, currentTick } from '$lib/stores/gameStore.js';
	
	function formatTimeRemaining(timer: any, currentTick: number): string {
		const elapsed = currentTick - timer.startTime;
		const remaining = Math.max(0, timer.duration - elapsed);
		
		const hours = Math.floor(remaining / 3600);
		const minutes = Math.floor((remaining % 3600) / 60);
		const seconds = remaining % 60;
		
		return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
	}
	
	function capitalizeFirst(str: string): string {
		return str.charAt(0).toUpperCase() + str.slice(1);
	}
</script>

{#if $activeTimers.length > 0}
	<section class="terminal-window">
		<h3 class="text-lg mb-3">Active Developments</h3>
		
		<div class="space-y-2">
			{#each $activeTimers as timer}
				<div class="timer-display">
					{capitalizeFirst(timer.resourceType)} development: {formatTimeRemaining(timer, $currentTick)}
				</div>
			{/each}
		</div>
	</section>
{/if}