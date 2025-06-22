<script lang="ts">
	import { resources } from '$lib/stores/gameStore.js';
	import { formatResourceDisplay } from '$lib/stores/gameStore.js';
	
	function capitalizeFirst(str: string): string {
		return str.charAt(0).toUpperCase() + str.slice(1);
	}
</script>

<section class="terminal-window">
	<h3 class="text-xl mb-4">Resources</h3>
	
	<div class="space-y-2">
		{#each Object.entries($resources) as [resourceType, resource]}
			<div class="resource-display">
				<span class="font-semibold">{capitalizeFirst(resourceType)}:</span>
				{formatResourceDisplay(resource)}
			</div>
		{/each}
	</div>
	
	<div class="mt-4 p-3 bg-green-900/20 border border-green-500/30 rounded">
		<p class="text-sm">Ready to explore! Click EXPLORE to discover resource capacity.</p>
	</div>
</section>