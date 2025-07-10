<script lang="ts">
	import { removeClass } from '$lib/utils/Utils.js';
    import '../styling/component_styling/organise/main.scss';
    let { children = ()=>{}, bgIntensity=.5, xl=false, glass=false, z=1, wrapperClass='', scale=1.05, ...props } = $props();

    let filterControl = $state('');
    if (bgIntensity > 0)
        filterControl = `backdrop-filter: brightness(${bgIntensity}); -webkit-filter: brightness(${bgIntensity});`;

</script>
<div class:xl class:glass-card={glass} class="jo jo-card jo-aura-card w-full h-full {wrapperClass}" style="z-index: {z}; {props['style'] || ''}">
    <div class="jo-aura" style="opacity: {bgIntensity}"></div>
    <div class:xl class="jo-main-content jo-aura-card-main-content w-full h-full {props['class'] || ''}" {...removeClass(props)}>
        {@render children?.()}
    </div>
    <div style="transform: scale({scale});" class="jo-bg-blur w-full h-full {props['class'] || ''}" {...removeClass(props)}>
        {@render children?.()}
    </div>
</div>