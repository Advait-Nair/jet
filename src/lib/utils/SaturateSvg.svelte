<script lang="ts">
	import { removeClass } from '$lib/utils/Utils.js';
    import '../styling/component_styling/organise/main.scss';
    let { children = ()=>{}, saturation, svg, maskPos="center", opacity=40, ...props } = $props();


</script>

<div class="jet-saturate-svg w-full h-full">
    <div class="jet-masked-svg {props['class'] || ''}" {...removeClass(props)} style="mask-image: url({svg}); mask-position: {maskPos}; -webkit-backdrop-filter: saturate({saturation}%); backdrop-filter: saturate({saturation}%); background: rgba(255,255,255,{opacity/100}"></div>
</div>

<style>
    .jet-masked-svg {
        mask-repeat: no-repeat;
        mask-size: contain;
    }
</style>