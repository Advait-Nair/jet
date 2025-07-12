<script lang="ts">
	import { removeClass } from '$lib/utils/Utils.js';
    // import '../styling/component_styling/text/main.scss';
	import HashTouch from './HashTouch.svelte';
	import { defaultPad, generateId, procHash, warn } from './TextUtils.js';
    let { children = ()=>{}, divider=false, icon='', id="", scrollPad=defaultPad, nohashlink=false, notoppad=false, ...props } = $props();

    warn(id);

    let h4:HTMLHeadingElement|any = $state(null);
</script>

<div bind:this={h4} class="jtt-wrapper flex items-center justify-between" class:pt-2={!notoppad} class:jtt-hash-touch={!nohashlink} id={procHash(id || generateId('tab', h4, icon))}>
    <h4 class="jtt jtt-tab flex items-center cursor-pointer justify-center gap-2 {props['class'] || ''}" {...removeClass(props)}>
        {#if icon}
            <span class="material-symbols-outlined">{icon}</span>
        {/if}
        <div class="text">
            {@render children?.()}
        </div>
    </h4>
    {#if divider}
        <div class="jtt-divider"></div>
    {/if}
</div>

<HashTouch padding={scrollPad}></HashTouch>