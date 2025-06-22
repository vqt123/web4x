<script lang="ts">
	import { actionPoints, resources } from '$lib/stores/gameStore.js';
	import { explore, develop, expandStorage, toggleDebugMode } from '$lib/stores/socketStore.js';
	import { gameConfig } from '$lib/config.js';
	import { showModal, modalData } from '$lib/stores/gameStore.js';
	
	function handleExplore() {
		explore();
	}
	
	function handleDevelop() {
		// Show resource selection modal
		const availableResources = Object.entries($resources)
			.filter(([_, resource]) => resource.capacity > resource.generation)
			.map(([type, resource]) => ({
				type,
				currentGeneration: resource.generation,
				newGeneration: resource.generation + 1,
				capacity: resource.capacity
			}));
		
		if (availableResources.length === 0) {
			alert('No resources available for development. Explore first to discover capacity!');
			return;
		}
		
		showModal.set('develop');
		modalData.set({ resources: availableResources });
	}
	
	function handleExpandStorage() {
		// Show resource selection modal for storage expansion
		const availableResources = Object.entries($resources)
			.map(([type, resource]) => ({
				type,
				currentCap: resource.cap,
				newCap: resource.cap + gameConfig.actions.expandStorage.capacityIncrease,
				amount: resource.amount,
				percentFull: Math.round((resource.amount / resource.cap) * 100)
			}));
		
		showModal.set('expandStorage');
		modalData.set({ resources: availableResources });
	}
	
	function handleToggleDebug() {
		toggleDebugMode();
	}
	
	$: canExplore = $actionPoints.current >= gameConfig.actions.explore.cost;
	$: canDevelop = $actionPoints.current >= gameConfig.actions.develop.cost;
	$: canExpandStorage = $actionPoints.current >= gameConfig.actions.expandStorage.cost;
</script>

<section class="terminal-window">
	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
		<button 
			class="terminal-button p-4 text-left"
			disabled={!canExplore}
			on:click={handleExplore}
		>
			<div class="font-bold">EXPLORE - {gameConfig.actions.explore.cost} AP</div>
			<div class="text-xs mt-1 opacity-75">Discover capacity for resource generation</div>
		</button>
		
		<button 
			class="terminal-button p-4 text-left"
			disabled={!canDevelop}
			on:click={handleDevelop}
		>
			<div class="font-bold">DEVELOP - {gameConfig.actions.develop.cost} AP</div>
			<div class="text-xs mt-1 opacity-75">Convert capacity into actual generation</div>
		</button>
		
		<button 
			class="terminal-button p-4 text-left"
			disabled={!canExpandStorage}
			on:click={handleExpandStorage}
		>
			<div class="font-bold">EXPAND STORAGE - {gameConfig.actions.expandStorage.cost} AP</div>
			<div class="text-xs mt-1 opacity-75">Increase maximum resource storage capacity</div>
		</button>
		
		<button 
			class="terminal-button p-4 text-left"
			on:click={handleToggleDebug}
		>
			<div class="font-bold">TOGGLE DEBUG MODE</div>
			<div class="text-xs mt-1 opacity-75">Speed up time: 1 hour = 1 second</div>
		</button>
	</div>
</section>