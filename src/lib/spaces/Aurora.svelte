<script lang="ts">
    import Gradient from "./gradient.js";

    import { browser } from "$app/environment";
	import { onMount } from "svelte";
	import { removeClass } from "$lib/utils/Utils.js";

    const uniqueId = Math.random().toString(36).substring(2, 15);

    onMount(() => {
        if(!browser) return;
        // There may be more than one gradient with the same, e.g. with aura-card aura blurring duplicating gradients for the effect

        var gradient = new Gradient();
        // @ts-ignore;
        gradient.initGradient('#gradient-canvas-'+uniqueId)
        gradient.connect();
        gradient.updateFrequency(0.00005);
    })

    let defaultColors = [
        '#222299',
        '#0781ff',
        '#000000',
        '#000055'
    ];

    let {
        height = '100%',
        width = '100%',
        colors = defaultColors,
        ...props
    } = $props();

    let colorsCompiled = colors.map((color, index) => `--gradient-color-${index + 1}: ${color};`).join(' ');


</script>



<canvas class="pointer-events-none {props['class'] || ''}" {...removeClass(props)} style="height:{height}; width: {width}; {colorsCompiled}" id="gradient-canvas-{uniqueId}"></canvas>


<style lang="scss">
    body {
        margin:0;
        padding:0;
    }
    #gradient-canvas {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        pointer-events: none;
        // z-index: 1;

        // fades in the gradient
        // opacity: 0;
        // animation: fadeIn 1s 700ms linear forwards;

        // @keyframes fadeIn {
        //     0% {
        //         opacity: 0;
        //     }
        //     100% {
        //         opacity: 1;
        //     }
        // }
    }
</style>