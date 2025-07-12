<script lang="ts">
	import Card from '$lib/organise/Card.svelte';
	import { removeClass } from '$lib/utils/Utils.js';
    // import '../styling/component_styling/text/main.scss';
	import Button from './Button.svelte';
    let { children = ()=>{}, options, selectedOption = $bindable(), dropdownEnabled = $bindable(false), closeOnClick=true, ...props } = $props();

    let active:number = $state(options.indexOf(selectedOption) !== -1 ? options.indexOf(selectedOption) : 0);
    $effect(() => {
        $inspect(options, selectedOption, active);
    })
</script>

<Card mainContentClass="flex items-center justify-center flex-col p-1 gap-1 {props['class'] || ''}" {...removeClass(props)} glass z={100}>
    {#each options as option, i}
    {#key active}
        <Button quaternary={selectedOption.text !== option.text} primary={selectedOption.text === option.text} class="w-full button-pad-style" onclick={
            () => {
                console.log('Selected option:', option);
                selectedOption = option;
                active = i;
                if (closeOnClick) {
                    dropdownEnabled = false;
                }
            }
        }>{option.text}</Button>
    {/key}
    {/each}
</Card>