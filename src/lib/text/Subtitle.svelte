<script lang="ts">
	import { removeClass } from '$lib/utils/Utils.js';
    import '../styling/component_styling/text/main.scss';
	import HashTouch from './HashTouch.svelte';
	import { defaultPad, generateId, procHash, warn } from './TextUtils.js';
    let { children = ()=>{}, icon="", id='', nohashlink=false, scrollPad=defaultPad, ...props } = $props();

    warn(id);

    let h2:HTMLHeadingElement|any = $state(null);
</script>

<h2 bind:this={h2} class:jtt-hash-touch={!nohashlink} id={procHash(id || generateId('subtitle', h2, icon))} class="jtt jtt-subtitle flex items-center justify-start gap-3 {props['class'] || ''}" {...removeClass(props)}>
    {#if icon}
        <span class="material-symbols-outlined">{icon}</span>
    {/if}
    {@render children?.()}
</h2>

<HashTouch padding={scrollPad}></HashTouch>