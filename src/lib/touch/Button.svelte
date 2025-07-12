<script lang="ts">
    import TouchTypes from "./TouchTypes.js";
    import Dropdown from "./ButtonDropdown.svelte";
    // import '../styling/component_styling/touch/main.scss';
	import { json } from "@sveltejs/kit";
	import { onDestroy, onMount } from "svelte";
	import { fade, fly } from "svelte/transition";
	import { removeClass } from "$lib/utils/Utils.js";
	import config from "$lib/config.js";

    let { 
        children = null,
        primary = false, 
        secondary = false, 
        tertiary = false, 
        quaternary = false, 
        quaternaryUnderline = false, 
        blended = false, 
        solid = false, 
        tertiarySolid = false, 
        regular = false, 
        large = false, 
        small = false, 
        options = [],
        selectedOption = $bindable(null),
        underline = false, 
        noOutline = false,
        toggled = $bindable(null),
        dropdownEnabled = $bindable(false),
        forceOutline = false,
        icon = '',
        enabledIcon = icon,
        dropdown = false,
        onDropdownClick = () => {},
        active = false,
        dropdownCloseOnClick = true,
        timer=0,
        square = !children || false,
        onTimer = () => {},
        timerTrigger = onMount,
        enableAfterTimer = false,
        autoClickAfterTimer = false,
        erroff = false, // Suppress error messages
        ...props 
    } = $props();

    let toggle = $state(toggled !== null);



    let noUnderline = $state(!underline || false);
    
    
    $effect(() => {
        if (quaternary || quaternaryUnderline || tertiarySolid || (timerBegun && timer)) noUnderline = false
        else noUnderline = !underline || false;
        
        toggleLogic();
    })
    
    
    // Determine button type
    const type = solid ? TouchTypes.Button.Types.solid : TouchTypes.Button.Types.blended;
    
    // Determine button style with priority order
    let determinedStyle:any;
    evalStyle();
    
    function evalStyle() {
        determinedStyle = tertiarySolid ? TouchTypes.Button.Styles.tertiarySolid :
        primary ? TouchTypes.Button.Styles.primary :
        secondary ? TouchTypes.Button.Styles.secondary :
        tertiary ? TouchTypes.Button.Styles.tertiary :
        quaternary ? TouchTypes.Button.Styles.quaternary :
        quaternaryUnderline ? TouchTypes.Button.Styles.quaternaryUnderline :
        TouchTypes.Button.Styles.primary;

        if (determinedStyle === TouchTypes.Button.Styles.primary && toggle) {
            determinedStyle = TouchTypes.Button.Styles.secondary;
        }
    }
    let style = $state(determinedStyle);

    // Determine button size
    const size = 
        large ? TouchTypes.Button.Sizes.large :
        small ? TouchTypes.Button.Sizes.small :
        TouchTypes.Button.Sizes.regular;


    // Handle timer functionality

    let timerComplete = $state(false);

    let button: HTMLButtonElement;

    if (enableAfterTimer && autoClickAfterTimer && !erroff) {
        console.warn('jet.touch.Button: Both enableAfterTimer and autoClickAfterTimer are set to true! Ensure this is the intended behavior. Suppress this error with prop: erroff')
    }

    let disabled = $state(props.disabled || false);
    let cancelTimeouts:any[] = [];

    let timerBegun = $state(false);
    timerTrigger(() => {
        if (enableAfterTimer) disabled = true;

        beginTimer();

        cancelTimeouts.push(setTimeout(() => {
            closeTimer();
            if (enableAfterTimer) {
                disabled = false;
            }
            if (autoClickAfterTimer) {
                button.classList.add('jtb-active');
                setTimeout(() => {
                    button.classList.remove('jtb-active');
                }, 400);
                props.onclick?.();
            }
            onTimer();
        }, timer*1000));
    })
    onDestroy(() => {
        clearTimeouts();
    });

    


    function clearTimeouts() {
        cancelTimeouts.forEach(clearTimeout);
    }

    function closeTimer() {
        timerBegun = false;
        timerComplete = false;
    }

    function beginTimer() {
        timerBegun = true;
        timerComplete = false;
    }

    function onClick() {
        if (disabled) return;
        clearTimeouts(); closeTimer(); props.onclick?.();
        if (toggle) toggled = !toggled;
        toggleLogic();
        selectedOption?.onClick?.();
    }

    function toggleLogic() {
        // if toggle is enabled, we increase the class of the button to indicate it is active
        if (toggled) {
            style = TouchTypes.Button.Styles.primary;
        } else style = determinedStyle;
    }

    function onDD() {
        dropdownEnabled = !dropdownEnabled;
        onDropdownClick(dropdownEnabled);
    }
    $effect(() => {
        evalStyle();
        if (toggled !== null) toggle = true;
        else toggle = false;
    });

    let hovering = $state(false);

    $effect(() => {
        console.log(selectedOption);
    });

</script>

{#if dropdown}
<div class="jtb-dropdown-wrapper flex items-center justify-center {!tertiarySolid ? 'gap-0.5' : ''}">
    {#key selectedOption}
    {@render JETButton(true, selectedOption.text)}
    {/key}
    <button class="jtb jtb-dropdown flex gap-2 items-center justify-center jtb-{style} jtb-{size} jtb-{type}" class:jtb-active={active} class:jtb-no-active-scaling={active} onmouseleave={() => hovering = false} {...((props))} {disabled} data-type={type} data-style={style} data-size={size} onclick={onDD} class:jtb-iconised={icon} class:jtb-no-underline={noUnderline} class:jtb-force-hover-outline={forceOutline} class:jtb-no-hover-outline={noOutline}>
        <span class="material-symbols-outlined" class:rotate-180={dropdownEnabled}>
             expand_more
        </span>
    </button>
    {#if dropdownEnabled}
    <div class="jtb-dropdown-position-controller" in:fade={{duration: config.fastTransitionDuration}} out:fade={{duration: config.standardTransitionDuration}}>
        <Dropdown closeOnClick={dropdownCloseOnClick} bind:dropdownEnabled={dropdownEnabled} bind:selectedOption={selectedOption} {options}></Dropdown>
    </div>
    {/if}
</div>
{:else}
    {@render JETButton()}
{/if}

{#snippet JETButton(disableJtbOutline=false, content=null)}
<button bind:this={button} onmouseenter={() => hovering = true} class:jtb-dd-aside={dropdown} class:jtb-active={active} class:jtb-no-active-scaling={active} onmouseleave={() => hovering = false} {...(removeClass(props))} {disabled} data-type={type} data-style={style} data-size={size} onclick={onClick} class:jtb-iconised={icon} class="jtb flex gap-2 items-center justify-center jtb-{type} jtb-{style} jtb-{size} {props['class'] || ''}" class:jtb-no-underline={noUnderline} class:jtb-force-hover-outline={forceOutline} class:jtb-no-hover-outline={noOutline} class:overflow-hidden={timerBegun} class:jtb-timer={timer} class:jtb-square={square}>
    {#if icon}
        <span class="jtb-icon material-symbols-outlined">{toggle ? (toggled ? enabledIcon : icon) : icon}</span>
    {/if}

    {#if !square}
    <div class="jtb-text">
        {#if content}
            {content}
        {:else}
            {@render children?.()}
        {/if}
    </div>
    {/if}

    {#if timer && timerBegun}
    <div transition:fade={{duration: config.slowTransitionDuration}} class="timer" class:opacity-0={hovering} style="animation: jtb-timer {timer}s linear;">
    </div>
    {/if}
    {#if !disableJtbOutline}
    <div class="jtb jtb-outline"></div>
    {/if}
</button>
{/snippet}

