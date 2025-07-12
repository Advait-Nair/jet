<script>
	import { removeClass } from '$lib/utils/Utils.js';
    // import '../styling/component_styling/organise/main.scss';
    let { w=100, my=2,mb=-1,mt=-1,...props } = $props();



    let dontDefinePY = my < 0;
    let dontDefinePB = mb < 0;
    let dontDefinePT = mt < 0;

    let pyStyling = dontDefinePY ? '' : `margin-top: calc(var(--spacing) * ${my}); margin-bottom: calc(var(--spacing) * ${my});`;
    let pbStyling = dontDefinePB ? '' : `margin-bottom: calc(var(--spacing) * ${mb});`;
    let ptStyling = dontDefinePT ? '' : `margin-top: calc(var(--spacing) * ${mt});`;
    let style = `${pyStyling} ${pbStyling} ${ptStyling}`;
    if (w < 0 || w > 100) {
        console.warn('Width must be between 0 and 100, defaulting to 100%');
        w = 100;
    }
</script>

<div {...removeClass(props)} class="jo jo-divider {props['class'] || ''}" style="width: {w}%; {style}">
</div>