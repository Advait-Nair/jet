<script lang="ts">
    // import '../styling/component_styling/text/main.scss';
	import Category from './Category.svelte';
    import Divider from '$lib/organise/Divider.svelte';
	import { defaultPad, generateId, procHash, warn } from './TextUtils.js';
	import HashTouch from './HashTouch.svelte';
	import { removeClass } from '$lib/utils/Utils.js';
    let { children = ()=>{}, category='', divider=false, removeTopPad=false, scrollPad=defaultPad, nohashlink=false, id='', ...props } = $props();

    warn(id);

    let h1:HTMLHeadingElement|any = $state(null);

</script>
{#if category}
    <Category class={`jtt-title-below ${removeTopPad ? 'jtt-no-top-pad' : ''}`}>{category}</Category>
{/if}
<h1 bind:this={h1} class:jtt-hash-touch={!nohashlink} class="jtt jtt-title {props['class'] || ''}" id={procHash(id || generateId('title', h1))} class:jtt-no-top-pad={removeTopPad && !category} class:jtt-category-above={category} {...removeClass(props)}>
    {@render children?.()}
</h1>
{#if divider}
    <Divider mt={4.5} mb={6} />
{/if}

<HashTouch padding={scrollPad}></HashTouch>