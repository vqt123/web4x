<script lang="ts">
	import { leaderboard, guestId } from '$lib/stores/gameStore.js';
	
	function getMedalEmoji(rank: number): string {
		switch (rank) {
			case 1: return '🥇';
			case 2: return '🥈';
			case 3: return '🥉';
			default: return `${rank}.`;
		}
	}
	
	function getPlayerDisplayName(entry: any): string {
		if (entry.isBot) {
			return entry.playerName;
		}
		
		// Show last 8 characters of guest ID for human players
		return `Player ${entry.playerId.slice(-8)}`;
	}
</script>

<section class="terminal-window">
	<h4 class="text-lg mb-3">🏆 Leaderboard</h4>
	
	{#if $leaderboard.length === 0}
		<p class="text-sm opacity-75">Loading leaderboard...</p>
	{:else}
		<div class="space-y-1">
			{#each $leaderboard.slice(0, 10) as entry, index}
				<div 
					class="leaderboard-entry"
					class:current-player={entry.playerId === $guestId}
					class:bot={entry.isBot}
				>
					<div class="flex items-center gap-2">
						<span class="text-sm font-mono w-6">
							{getMedalEmoji(index + 1)}
						</span>
						<span class="text-sm">
							{getPlayerDisplayName(entry)}
						</span>
					</div>
					<span class="text-sm font-bold">
						{entry.score} pts
					</span>
				</div>
			{/each}
		</div>
	{/if}
</section>