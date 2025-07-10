<script lang="ts">
	import Card from '$lib/organise/Card.svelte';
    import Divider from '$lib/organise/Divider.svelte';
	import { removeClass } from '$lib/utils/Utils.js';
    import '../styling/component_styling/organise/main.scss';
	import { notifyIcons, NotifyLevel } from './Notify.js';
	import { fly } from 'svelte/transition';
	import Button from '$lib/touch/Button.svelte';
	import config from '$lib/config.js';
    let { children = ()=>{}, title='Notification', level=NotifyLevel.Info, icon='', message=null, visible=$bindable(false), ...props } = $props();

    let headerColor = $state('');
    $effect(() => {
        switch (level) {
            case NotifyLevel.Error:
                headerColor = 'text-red-400';
                break;
            case NotifyLevel.Warning:
                headerColor = 'text-yellow-500';
                break;
            case NotifyLevel.Success:
                headerColor = 'text-green-500';
                break;
            case NotifyLevel.Info:
            default:
                headerColor = 'text-white';
                break;
        }
    });
</script>

{#if visible}
<div in:fly={{duration: config.standardTransitionDuration, y:config.fastDisplacement}} out:fly={{duration: config.standardTransitionDuration, y:-config.fastDisplacement}} class="jet-notify-wrapper fixed top-10 z-50 flex items-center justify-center w-full {props['class'] || ''}" {...removeClass(props)}>
    <div class="max-w-lg w-full mx-2">
        <Card md glass dark class="jet-notify p-3 w-full">
            <div class="jet-notify-header select-none {headerColor} flex items-center justify-between">
                <div class="flex items-center justify-start gap-2">
                    <span class="material-symbols-outlined p-0.5 rounded-full {headerColor}">
                        {icon || notifyIcons[level as NotifyLevel]}
                    </span>
                    <h3 class="jet-notify-title text-xl">
                        {title}
                    </h3>
                </div>
                <Button onclick={() => visible = false} large quaternary icon="close" class="text-white opacity-50"></Button>
            </div>
            <Divider></Divider>
            <div class="jet-notify-content mt-3 mx-1">
                <div class="jet-notify-children">
                    {#if message} {message} {/if}
                    {@render children?.()}
                </div>
            </div>
        </Card>
    </div>
</div>
{/if}