<script lang="ts">
	import { showModal, modalData } from '$lib/stores/gameStore.js';
	import { develop, expandStorage } from '$lib/stores/socketStore.js';
	import { gameConfig } from '$lib/config.js';
	
	function closeModal() {
		showModal.set(null);
		modalData.set(null);
	}
	
	function handleDevelopResource(resourceType: string) {
		develop(resourceType);
		closeModal();
	}
	
	function handleExpandResource(resourceType: string) {
		expandStorage(resourceType);
		closeModal();
	}
	
	function capitalizeFirst(str: string): string {
		return str.charAt(0).toUpperCase() + str.slice(1);
	}
</script>

{#if $showModal}
	<div class="modal-overlay" on:click={closeModal} role="dialog" aria-modal="true">
		<div class="modal-content" on:click|stopPropagation>
			{#if $showModal === 'develop'}
				<h3 class="text-xl mb-4">Choose Resource to Develop</h3>
				<p class="text-sm mb-4 opacity-75">
					Build infrastructure to increase generation rate (2-hour timer)<br>
					<span class="text-yellow-400">You can only develop up to your discovered capacity</span>
				</p>
				
				<div class="space-y-2">
					{#each $modalData?.resources || [] as resource}
						<button 
							class="terminal-button w-full p-3 text-left"
							on:click={() => handleDevelopResource(resource.type)}
						>
							<div class="font-bold">Develop {capitalizeFirst(resource.type)}</div>
							<div class="text-sm opacity-75">
								Generation: {resource.currentGeneration} → {resource.newGeneration} per hour
								(Capacity: {resource.capacity}/hr)
							</div>
						</button>
					{/each}
				</div>
				
				<button class="terminal-button mt-4" on:click={closeModal}>
					Cancel
				</button>
				
			{:else if $showModal === 'expandStorage'}
				<h3 class="text-xl mb-4">Choose Resource Storage to Expand</h3>
				<p class="text-sm mb-4 opacity-75">
					Increase storage capacity by {gameConfig.actions.expandStorage.capacityIncrease} for selected resource
				</p>
				
				<div class="space-y-2">
					{#each $modalData?.resources || [] as resource}
						<button 
							class="terminal-button w-full p-3 text-left"
							on:click={() => handleExpandResource(resource.type)}
						>
							<div class="font-bold">Expand {capitalizeFirst(resource.type)} Storage</div>
							<div class="text-sm opacity-75">
								Capacity: {resource.currentCap} → {resource.newCap}
								({resource.percentFull}% full)
							</div>
						</button>
					{/each}
				</div>
				
				<button class="terminal-button mt-4" on:click={closeModal}>
					Cancel
				</button>
				
			{:else if $showModal === 'discovery'}
				<h3 class="text-xl mb-4">{$modalData?.title}</h3>
				<p class="mb-4">{$modalData?.message}</p>
				
				<button class="terminal-button" on:click={closeModal}>
					Continue
				</button>
			{/if}
		</div>
	</div>
{/if}