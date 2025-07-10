<script lang="ts">
	import Aurora from '$lib/spaces/Aurora.svelte';
    import { fade } from 'svelte/transition';
    import config from '$lib/config.js';

    let { enabled = false, zindex = 30 } = $props();
</script>

{#if enabled}
    <div class="jet-anim-cont fixed inset-0 z-{zindex}" transition:fade={{duration: config.standardTransitionDuration}} class:blur-into-unexistence={!enabled}>
        <Aurora class="fixed inset-0 z-30 fade-in-aurora blur-sm scale-105"></Aurora>
    </div>
{/if}

