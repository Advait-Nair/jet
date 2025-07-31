<script lang="ts">
	import Card from '$lib/organise/Card.svelte';
    import Divider from '$lib/organise/Divider.svelte';
	import { removeClass } from '$lib/utils/Utils.js';
    // import '../styling/component_styling/organise/main.scss';
	import { fade, fly } from 'svelte/transition';
	import Button from '$lib/touch/Button.svelte';
	import Aurora from '$lib/spaces/Aurora.svelte';
	import ImmersionAurora from './ImmersionAurora.svelte';
	import config from '$lib/config.js';
    let { children = ()=>{}, title='', immersive=false, icon='', message=null, visible=$bindable(false), maxSize='lg', noOutclick=false, noClose=false, ...props } = $props();

    function onClickOutside(event:MouseEvent) {
        if (noOutclick || noClose) return;

        if ((event?.target as HTMLElement)?.classList.contains('jet-modal-wrapper')) {
            console.log('Clicked outside modal');
            visible = false;
        }
    }

    $effect(() => {
        if (visible) document.body.style.overflow = 'hidden';
        else document.body.style.overflow = '';
    });
</script>


{#if visible}
<div in:fly={{duration: config.standardTransitionDuration, y:config.standardDisplacement}} out:fly={{duration: config.standardTransitionDuration, y:-config.standardDisplacement}} onclick={onClickOutside} class="jet-modal-wrapper fixed max-h-screen inset-0 z-40 grid place-items-center w-full {props['class'] || ''}" {...removeClass(props)}>
    <div class="max-w-{maxSize} max-h-screen w-full mx-2">
        <Card xl dark class="jet-modal w-full max-h-screen overflow-hidden">
            <div class="jet-modal-header z-41 absolute top-0 px-4 pb-5 py-2 backdrop-blur-lg select-none w-full flex items-center justify-between">
                <div class="flex items-center justify-start gap-2">
                    {#if icon}
                    <span class="material-symbols-outlined p-0.5 rounded-full">
                        {icon}
                    </span>
                    {/if}
                    <h3 class="jet-modal-title text-xl">
                        {title}
                    </h3>
                </div>
                <!-- {#if !noClose} -->
                <Button onclick={() => visible = false} large quaternary icon="close" class="text-white opacity-50"></Button>
                <!-- {/if} -->
            </div>
            <!-- <Divider></Divider> -->
            <div class="jet-modal-content overflow-y-auto px-5 pb-5" style="max-height: calc(100vh - 9rem);">
                <div class="ghost opacity-0 py-6">{title}</div>
                <div class="jet-modal-children">
                    {#if message} {message} {/if}
                    {@render children?.()}
                </div>
            </div>
        </Card>
    </div>
</div>
<div class="z-30 fixed inset-0 bg-black"></div>
{/if}

{#if !immersive && visible}
<div transition:fade={{duration: config.standardTransitionDuration}} class="fixed inset-0 z-39 backdrop-blur-xl"></div>
{/if}

<ImmersionAurora enabled={immersive && visible}></ImmersionAurora>

<style lang="scss">
    .jet-modal-header {
        mask-image: linear-gradient(
        to bottom,
        black 60%,
        transparent 100%
        );
    }
    .jet-modal-content {
        mask-image: linear-gradient(
        to top,
        black 90%,
        transparent 100%
        );
    }
</style>