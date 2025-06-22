<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';
	import { initializeSocket } from '$lib/stores/socketStore.js';
	
	onMount(() => {
		initializeSocket();
	});
</script>

<main class="min-h-screen bg-terminal-bg text-terminal-green">
	<slot />
</main>