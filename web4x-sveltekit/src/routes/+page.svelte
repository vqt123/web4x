<script lang="ts">
	import GameHeader from '$lib/components/GameHeader.svelte';
	import ResourcePanel from '$lib/components/ResourcePanel.svelte';
	import ActionButtons from '$lib/components/ActionButtons.svelte';
	import ActiveTimers from '$lib/components/ActiveTimers.svelte';
	import Leaderboard from '$lib/components/Leaderboard.svelte';
	import GameModal from '$lib/components/GameModal.svelte';
	import { worldEvents } from '$lib/stores/gameStore.js';
</script>

<svelte:head>
	<title>Web 4X Game</title>
	<meta name="description" content="Turn-based asynchronous 4X strategy game" />
</svelte:head>

<div class="container mx-auto px-4 py-6 max-w-6xl">
	<GameHeader />
	
	<div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
		<!-- Main game area -->
		<div class="lg:col-span-2 space-y-6">
			<ResourcePanel />
			<ActiveTimers />
			<ActionButtons />
		</div>
		
		<!-- Sidebar -->
		<div class="space-y-6">
			<Leaderboard />
			
			<!-- World Events -->
			<section class="terminal-window">
				<h4 class="text-lg mb-3">World Events</h4>
				
				{#if $worldEvents.length === 0}
					<p class="text-sm opacity-50">No recent events</p>
				{:else}
					<div class="space-y-1 max-h-40 overflow-y-auto">
						{#each $worldEvents as event}
							<div class="world-event">
								{event.message}
							</div>
						{/each}
					</div>
				{/if}
			</section>
		</div>
	</div>
</div>

<GameModal />

<style>
	:global(body) {
		@apply overflow-x-hidden;
	}
</style>