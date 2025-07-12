<script lang="ts">
	import { removeClass } from '$lib/utils/Utils.js';
    // import '../styling/component_styling/text/main.scss';
	import HashTouch from './HashTouch.svelte';
    let { children = ()=>{}, id='', nohashlink=false, scrollPad=defaultPad, ...props } = $props();
    import { defaultPad, generateId, procHash, warn } from './TextUtils.js';

    warn(id);
    let h3:any = $state(null);
</script>

<h3 bind:this={h3} class:jtt-hash-touch={!nohashlink} id={procHash(id || generateId('heading', h3))} class="jtt jtt-heading {props['class'] || ''}" {...removeClass(props)}>
    {@render children?.()}
</h3>

<HashTouch padding={scrollPad}></HashTouch>