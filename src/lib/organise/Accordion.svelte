<script lang="ts">
	import Subtitle from '$lib/text/Subtitle.svelte';
	import { removeClass } from '$lib/utils/Utils.js';
	import { fly } from 'svelte/transition';
    // import '../styling/component_styling/organise/main.scss';
	import Divider from './Divider.svelte';
	import config from '$lib/config.js';
    let defaultIcon = 'expand_more';

    let { children = ()=>{}, title='', hideCollapseIcon=false, front=null, collapsed = $bindable(false), icon = defaultIcon, ...props } = $props();

    function onclick() {
        collapsed = !collapsed;
        console.log('Accordion clicked, collapsed:', collapsed);
    }

    let collapseIcon = $derived(!collapsed ? 'expand_less': defaultIcon);
    let applyIcon = $derived(icon === defaultIcon ? collapseIcon : icon);

    let contentRect: DOMRect | null = $state(null);
</script>
<div class="{props['class'] || ''}" {...removeClass(props)}>
    <div class="select-none cursor-pointer" {onclick} tabindex="0" role="button" onkeypress={onclick}>
        {#if front}
            {#if hideCollapseIcon}
                {@render front?.()}
            {:else}
            <div class="flex items-center justify-start gap-3">
                <span class="material-symbols-outlined l1-transition" class:rotate-180={collapsed}>
                    expand_less
                </span>
                <div class="jet-wrapper">
                    {@render front?.()}
                </div>
            </div>
            {/if}
        {:else}
            <Subtitle class="cursor-pointer" nohashlink icon={applyIcon}>{title}</Subtitle>
        {/if}
    </div>
    <Divider></Divider>
    <!-- {#key collapsed}
    <div bind:contentRect={contentRect} class="anim-cont l3-transition overflow-hidden" style="{`height: ${collapsed ? '0' : contentRect?.height}px;`}">
        {@render children?.()}
    </div>
    {/key} -->
    {#if !collapsed}
    <div class="anim-cont" transition:fly={{ x: config.standardDisplacement, duration: config.standardTransitionDuration }}>
        {@render children?.()}
    </div>
    {/if}
</div>