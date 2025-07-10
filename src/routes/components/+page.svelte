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
            <touch.Button active large onclick={() => goto('/components')} quaternary>Components</touch.Button>
            <touch.Button onclick={() => goto('/docs')} large quaternary>Documentation</touch.Button>
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
        <organise.AuraCard xl aura class="grid place-items-center overflow-hidden">
            <div class="hero flex flex-col items-center justify-center gap-1">
                <text.Hero>Components</text.Hero>
                <h4 class="text-xl max-w-xl w-full text-center px-2 opacity-70 jet-secondary-text mt-5">Some components to ponder about with</h4>
            </div>
            <!-- <img src="https://photos.advaitnair.org/api/random" class="aura-bg image-fit" alt="Hero"> -->
            <spaces.Aurora width={"100svw"} height={"100svh"} class="aura-bg"></spaces.Aurora>
        </organise.AuraCard>
    </div>
</spaces.GenericSpace>



<spaces.GenericSpace auraId={0} cont p={10}>
    <text.Title removeTopPad category="TOUCH">Interactivity</text.Title>
    
    <!-- <text.Subtitle>Components are your friend</text.Subtitle> -->
    <p class="mt-2">
        Interactivity is at the heart of user experience design. By incorporating interactive elements, you can create a more engaging and dynamic interface that responds to user input and adapts to their needs.
    </p>
    
    <text.Tab divider>Example</text.Tab>
    <div class="flex items-center justify-start gap-3 h-full px-4">
        <touch.Button timer={10} autoClickAfterTimer icon="check" tertiarySolid>Tertiary Solid</touch.Button>
        <touch.Button timer={10} enableAfterTimer icon="check" tertiary>Tertiary</touch.Button>
        <touch.Button secondary>Secondary</touch.Button>
        <touch.Button dropdown options={SampleOptions} bind:selectedOption={selectedOption}>Dropdowns!</touch.Button>
        <touch.Button bind:toggled={settingsOpen} icon="settings"></touch.Button>
    </div>
    <div class="grid grid-cols-2 gap-9">
        <div class="item">
            <text.Tab>Buttons</text.Tab>
            <p>
                Buttons are the primary means of interaction in JET UI. They come in various styles, such as primary, secondary, tertiary, and quaternary, each serving different purposes. The <code>JETButton</code> component allows for easy customization with icons, toggled states, and dropdown functionality. Four main styles are available: <code>primary</code>, <code>secondary</code>, <code>tertiary</code>, and <code>quaternary</code>. Each style can be further customised with props like <code>icon</code>, <code>toggled</code>, and <code>dropdown</code>.
            </p>
        </div>
        <div class="item">
            <text.Tab>Timers</text.Tab>
            <p>
                Timed buttons can be used for actions that require a delay or confirmation, such as destructive operations or to prevent accidental clicks. The timer visually indicates the waiting period, and the button can either auto-click or become enabled after the timer completes. Use the <code>timer</code> prop to set the duration and the <code>autoClickAfterTimer</code> or <code>enableAfterTimer</code> props to control the button's behavior after the timer ends.
            </p>
        </div>
        <div class="item">
            <text.Tab>Dropdowns</text.Tab>
            <p>
                Dropdowns are useful for displaying additional options or actions without cluttering the interface. They can be toggled to show or hide content, and can also be used in conjunction with other buttons for more complex interactions. The <code>JETButton</code> component supports dropdown functionality with the <code>dropdown</code> prop.
            </p>
        </div>
        <div class="item">
            <text.Tab>Circular Buttons</text.Tab>
            <p>
                Circular buttons are icon-only buttons that provide a compact way to trigger actions. They are often used for quick access to frequently used features, such as settings or notifications. The <code>JETButton</code> component supports circular styles with icons for a clean and modern look using the <code>icon</code> prop being passed in without any text.
            </p>
        </div>
    </div>
    <div class="pt-6"></div>
    <organise.Accordion collapsed title="Send help">
        {#snippet front()}
            <h1>But what if I don't know what circular buttons are?</h1>
        {/snippet}
        <div class="item">
            <text.Tab notoppad>Circular Buttons</text.Tab>
            <p>
                Circular buttons are icon-only buttons that provide a compact way to trigger actions. They are often used for quick access to frequently used features, such as settings or notifications. The <code>JETButton</code> component supports circular styles with icons for a clean and modern look using the <code>icon</code> prop being passed in without any text.
            </p>
        </div>
    </organise.Accordion>
</spaces.GenericSpace>

<spaces.GenericSpace auraId={1} cont p={10}>
    <text.Title removeTopPad category="text" divider>Typography</text.Title>
    <touch.TextInput
    filterType={FilterToInputType.FloatingPoint}
    large
    title="Ask Damnus"
    placeholder="Ask Damnus anything you have on your mind..."
    /><br>
    <touch.TextInput
    filterType={FilterToInputType.Number}
    title="Ask Damnus"
    placeholder="Ask Damnus anything you have on your mind..."
    /><br>
    <touch.TextInput
    title="Ask Damnus"
    placeholder="Ask Damnus anything you have on your mind..."
    /><br>
    <touch.TextInput
    filterType={FilterToInputType.Integer}
    small
    title="Ask Damnus"
    placeholder="Ask Damnus anything you have on your mind..."
    />

    <div class="grid grid-cols-2 gap-5">
        <div class="left p-2">
            <text.Tab>Overview of Typography</text.Tab>
            <text.Subtitle icon="">Typography in JET UI</text.Subtitle>
            <text.Heading>The Importance of Typography</text.Heading>
            <p>
                Typography is a fundamental aspect of user interface design, influencing readability, accessibility, and the overall aesthetic of your application. Well-chosen fonts, sizes, and weights help users quickly scan content, understand hierarchy, and engage with your product. Consistent typography ensures a professional and cohesive look across all screens and devices.
            </p>
            <text.Heading>Integration of Typography into JET UI Design</text.Heading>
            <p>
                JET UI provides a robust set of typography components, such as <code>Title</code>, <code>Subtitle</code>, and <code>Heading</code>, to help you structure your content effectively. These components are designed to be flexible and accessible, supporting custom icons, dividers, and responsive sizing. By leveraging these components, you can maintain a clear visual hierarchy and improve the user experience throughout your application.
            </p>
        </div>
        <div class="right p-2">
            <text.Tab>Common Typography</text.Tab>
            <div class="flex flex-col items-start justify-start gap-3 pt-5">
                <text.Title removeTopPad>Title</text.Title>
                <text.Subtitle icon="info">Subtitle with Icon</text.Subtitle>
                <text.Heading>Heading</text.Heading>
                <p class="text-lg">This is a paragraph demonstrating the default text styling in JET UI.</p>
                <p class="text-sm">This is a smaller text for less important information.</p>
                <p class="text-xs">This is the smallest text size, typically used for footnotes or disclaimers.</p>
            </div>
        </div>
    </div>
</spaces.GenericSpace>

<spaces.GenericSpace auraId={2} cont p={10}>
    <text.Title removeTopPad category="organise" divider>Organisation</text.Title>

    <text.Subtitle icon="">Organising Your UI</text.Subtitle>
    <text.Heading>The Importance of Organisation</text.Heading>
    <p>
        Organising content and interface elements is crucial for creating intuitive and efficient user experiences. A well-organised UI helps users find information quickly, reduces cognitive load, and guides them through workflows seamlessly. Grouping related actions, using clear labels, and providing visual separation all contribute to a more usable interface.
    </p>
    <text.Heading>Integration of Organisation into JET UI Design</text.Heading>
    <p>
        JET UI offers layout and space components, such as <code>GenericSpace</code> and <code>Aura</code>, to help you structure your application. These components allow you to segment content into logical sections, apply consistent padding and spacing, and visually distinguish different areas of your app. By using these tools, you can create interfaces that are both visually appealing and easy to navigate.
    </p>
</spaces.GenericSpace>