<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
    import jet from '$lib/index.js';
	import type AuraConfig from '$lib/spaces/AuraConfig.js';
	import Hero from '$lib/text/Hero.svelte';
	import { FilterToInputType } from '$lib/touch/Input.js';
	import { writable } from 'svelte/store';

    const { spaces, touch, text, organise, utils } = jet;

    const auraConfig:AuraConfig[] = [
        // { auraId: 0, auraAccent1: '#0f0'},
        // { auraId: 1, auraAccent1: '#f00'},
        // { auraId: 2, auraAccent1: '#00f'},
        { auraId: 0, auraAccent1: 'https://photos.advaitnair.org/api/94'},
        { auraId: 1, auraAccent1: 'https://photos.advaitnair.org/api/84'},
        { auraId: 2, auraAccent1: 'https://photos.advaitnair.org/api/255'},
    ];

    let isLightMode = $state(false);
    let settingsOpen = $state(false);

    let options = [
        'Roasted',
        "Balled",
        'Fried',
        'Steamed',
        'Grilled'
    ]
    let SampleOptions = Array.from({ length: options.length }, (_, i) => ({
        text: options[i],
        onClick: () => {
            console.log(`Option ${i + 1} clicked`);
            selectedOption = SampleOptions[i];
        }
    }));
    let selectedOption = $state(SampleOptions[0])

    let notification = writable()
    
    // notifyUser(notification, 'Connection Established', 'The remote daemon has established connection with the main control interace. Actions are now transmittable within an established tunnel with ±2.5 latency.', NotifyLevel.Success)
    // setTimeout(() => {
    //     notifyUser(notification, 'Connection is cooked', 'The remote daemon got cooked by Gordon Ramsay and is unavailable for further transmission of instructions.', NotifyLevel.Error)
    // },5000)

</script>

<jet.utils.PageModifiers modifiers={{'data-hash-pad':120}}></jet.utils.PageModifiers>

<spaces.Aura defaultOpacity={1} {auraConfig}>
</spaces.Aura>

<nav class="px-10 py-4 fixed top-0 z-10 w-full glass-card-before mask-fade-bottom standard-colouring">
    <div class="cont flex items-center justify-between">
        <div class="left flex items-center justify-center gap-7">
            <touch.Button large onclick={() => goto('/')} quaternary>Home</touch.Button>
            <touch.Button large onclick={() => goto('/components')} quaternary>Components</touch.Button>
            <touch.Button active onclick={() => goto('/docs')} large quaternary>Documentation</touch.Button>
            <touch.Button onclick={() => browser ? window.location.href = "https://software.advaitnair.org" : null} icon="open_in_new" large quaternary>Adva Software</touch.Button>
        </div>
        <div class="right flex items-center justify-center gap-2">
            <touch.Button tertiary>Get Started</touch.Button>
            <touch.Button tertiary bind:toggled={isLightMode} enabledIcon="light_mode" icon="dark_mode"></touch.Button>
            <touch.Button tertiary bind:toggled={settingsOpen} enabledIcon="close" icon="settings"></touch.Button>

        </div>
    </div>
</nav>


<spaces.GenericSpace cont>
    <div class="h-screen px-4 py-20 pt-30 select-none">
        <organise.AuraCard xl aura class="h-full grid place-items-center overflow-hidden">
            <div class="hero flex flex-col items-center justify-center gap-1">
                <text.Hero>Documentation</text.Hero>
                <h4 class="text-xl max-w-xl w-full text-center px-2 opacity-70 jet-secondary-text mt-5">Learn JET UI inside out! There's nothing here right now though.</h4>
                <div class="action flex items-center justify-center gap-4 mt-8">
                    <touch.Button onclick={() => browser ? window.location.href = "https://advaitnair.org" : null} icon="arrow_forward" tertiary>Want to see my portfolio?</touch.Button>
                </div>
            </div>
            <!-- <img src="https://photos.advaitnair.org/api/random" class="aura-bg image-fit" alt="Hero"> -->
            <spaces.Aurora width={"100svw"} height={"100svh"} class="aura-bg"></spaces.Aurora>
        </organise.AuraCard>
    </div>
</spaces.GenericSpace>
