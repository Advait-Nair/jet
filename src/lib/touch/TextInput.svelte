<script lang="ts">
	import { removeClass } from '$lib/utils/Utils.js';
	import { onMount } from 'svelte';
    // import '../styling/component_styling/touch/main.scss';
	import { checkInputValidity, deduceIconType, FilterToInputType, validState } from './Input.js';
    let {
        children = undefined,
        filterType = FilterToInputType.Text,
        type = "text",
        icon = deduceIconType(filterType),
        title = undefined,
        value = $bindable(),
        textSize=undefined,
        small = false,
        large = false,
        placeholder = '',
        ...props
    } = $props();

    let internalValue:string = $state('');
    let focused = $state(false);
    let validityState = $state(validState);
    let inputElement: HTMLInputElement;

    function verifyInput() {
        validityState = checkInputValidity(internalValue, filterType);

        if (validityState.valid) {
            // ? We only push valid input to the hierarchy
            value = internalValue;
        }
    }

    onMount(() => {
        if (inputElement) {
            inputElement.addEventListener('focus', () => {
                focused = true;
            });

            inputElement.addEventListener('blur', () => {
                focused = false;
            });
        }
    })

</script>
<div class="jet overflow-hidden flex items-center justify-center jti-input relative" class:small class:large class:jti-invalid={!validityState.valid}>
    {#if icon}
        <div class="select-none jet gap-3 p-3 jti-icon flex items-center justify-center">
            <span class="material-symbols-outlined">
                {icon}
            </span>
            <!-- {#if title}
            <div class="jti-header whitespace-nowrap">
                {title}
            </div>
            {/if} -->
        </div>
    {/if}
    <input class:titled={title} bind:this={inputElement} placeholder={!title ? placeholder : ''} style="{textSize ? `font-size: ${textSize}rem` : ''}" onkeyup={verifyInput} bind:value={internalValue} {type} class="w-full jet jti-input-entry {props['class'] || ''}" {...removeClass(props)}>
    {#key validityState}
    {#if !validityState.valid}
    <div class="jet jti-input-feedback absolute">
        {validityState.feedback}
    </div>
    {/if}
    {/key}
    <div class="jti-input-description absolute" class:opacity-0={!validityState.valid} class:smallerised={internalValue?.length > 0 || focused}>
        {#if title}
            {title}
        {:else}
            {placeholder}
        {/if}
    </div>
</div>