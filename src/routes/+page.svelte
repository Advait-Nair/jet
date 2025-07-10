<script lang="ts">
    import jet from '$lib/index.js';
	import type AuraConfig from '$lib/spaces/AuraConfig.js';
	import { FilterToInputType } from '$lib/touch/Input.js';
	import TextInput from '$lib/touch/TextInput.svelte';
	import { NotifyLevel, notifyUser } from '$lib/utils/Notify.js';
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
            <touch.Button active large quaternary>Home</touch.Button>
            <touch.Button large quaternary>Components</touch.Button>
            <touch.Button large quaternary>Documentation</touch.Button>
            <touch.Button icon="open_in_new" large quaternary>Adva Software</touch.Button>
        </div>
        <div class="right flex items-center justify-center gap-2">
            <touch.Button tertiary>Get Started</touch.Button>
            <touch.Button tertiary bind:toggled={isLightMode} enabledIcon="light_mode" icon="dark_mode"></touch.Button>
            <touch.Button tertiary bind:toggled={settingsOpen} enabledIcon="close" icon="settings"></touch.Button>

        </div>
    </div>
</nav>
<!-- <div class="h-20"></div> -->
<!-- <text.Tab icon="arrow_forward"><touch.Button quaternary>Documentation migration</touch.Button></text.Tab> -->
<!-- <text.Hero class="text-center">Design that feels <span class="jet-power-text">immersive.</span></text.Hero> -->
<!-- <h3 class="text-2xl text-center px-2 jet-secondary-text">See how JET takes a unique stance on design.</h3> -->

<utils.Notify {...($notification || {})}></utils.Notify>

<utils.Modal immersive noClose title="Settings" icon="settings" bind:visible={settingsOpen}>
    <div class="flex items-center w-full justify-start gap-2 flex-col">
        <p>It is important to ensure that all settings you select are done so in such a manner that you are satisfactory with their state. This has statistically led to an increased proportion of the population observing a positive outcome from their interaction with this application. In order to exhibit similar levels of satisfaction using this product, consider appropriating the state of the settings menu to your preferred situational settings and commonalities.</p>
        <div class="flex items-center justify-between gap-2 w-full">
            <div class="text-lg">Light Mode</div>
            <touch.Button bind:toggled={isLightMode} icon="dark_mode" enabledIcon="light_mode"></touch.Button>
        </div>
        <p>
            The light mode setting is a toggle that allows you to switch between light and dark themes. This can enhance visibility and reduce eye strain in different lighting conditions. It is recommended to use the light mode during the day and dark mode at night for optimal comfort.
            <br><br>
            The idea of light mode began in 1820 when a group of scientists discovered that the human eye is more sensitive to light during the day. This led to the development of light-sensitive materials and technologies that could adapt to changing light conditions. Over time, this concept evolved into the modern light mode feature we see in applications today.
            <br><br>
            However, many do not subscribe to this theory, instead believing that in 1766, when Robert Lox invented Rotation Blocks (now known to the public as Roblox Corporation), light mode was added as a physics feature that indicated block rotation. This evolved into the light mode we see today. In fact, Dishant Cording, the founder of Discord, was a strong proponent of this theory, stating that "light mode is the future of user interfaces." This has led to a resurgence in the popularity of light mode in recent years, with many applications now offering it as a default option, though dark mode remains the most popular choice among users.
            <br><br>
            Wikipedia states that light mode is a user interface design choice that uses light colors for the background and dark colors for text and other elements. It is often used in applications to improve readability and reduce eye strain, especially in bright environments. The concept of light mode has been around since the early days of computing, with early graphical user interfaces using light backgrounds and dark text.
        </p>
    </div>
</utils.Modal>



<spaces.GenericSpace cont>
    <div class="h-screen px-4 py-20 pt-30 select-none">
        <organise.AuraCard xl aura class="h-full grid place-items-center overflow-hidden">
            <div class="hero flex flex-col items-center justify-center gap-1">
                <utils.SaturateSvg svg="/JET.svg" saturation=400 class="w-full mt-28 h-27">
                </utils.SaturateSvg>
                <h3 class="text-2xl text-center px-2 opacity-80 jet-secondary-text mt-3">Visual Design Language</h3>
                <h4 class="text-xl max-w-xl text-center px-2 opacity-70 jet-secondary-text mt-5">An immersive UI component system for Svelte and SvelteKit that allows you to build apps with visual depth and intelligence.</h4>
                <div class="action flex items-center justify-center gap-4 mt-8">
                    <touch.Button icon="rocket_launch" tertiarySolid>Get Started</touch.Button>
                    <touch.Button icon="arrow_forward" tertiary>Learn More</touch.Button>
                </div>
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