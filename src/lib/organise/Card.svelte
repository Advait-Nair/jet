<script lang="ts">
	import { removeClass } from '$lib/utils/Utils.js';
    // import '../styling/component_styling/organise/main.scss';
    let { children = ()=>{}, bg='', bgIntensity=.5, aura=false, xl=false, md=false, glass=false, dark=false, z=1, mainContentClass='', wrapperClass='', nofw=false, scale=1.05, ...props } = $props();

    let filterControl = $state('');
    if (bgIntensity > 0)
        filterControl = `backdrop-filter: brightness(${bgIntensity}); -webkit-filter: brightness(${bgIntensity});`;

</script>
<div class:xl class:md class:w-full={!nofw} class:dark class:glass-card={glass} class="jo jo-card {wrapperClass}" style="z-index: {z}; {props['style'] || ''}">
    {#if aura}
        <div class="jo-aura" style="opacity: {bgIntensity}"></div>
    {/if}
    <div class:w-full={!nofw} class="jo-main-content h-full {props['class'] || ''}" {...removeClass(props)}>
        {@render children?.()}
    </div>
    {#if bg}
        <!-- <div class="jo-backdrop-filter-controller" style="{filterControl}"></div> -->
        <div class="jo-bg w-full" style="background-image: url({bg}); {filterControl}"></div>
        {#if aura}
        <div class="jo-bg-blur w-full" style="background-image: url({bg}); opacity: {bgIntensity*1.2}; transform: scale({scale});"></div>
        {/if}
    {/if}
</div>