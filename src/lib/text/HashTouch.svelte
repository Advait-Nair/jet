<script lang="ts">
	import { browser } from "$app/environment";
	import { pushState } from "$app/navigation";
	import { getClosestProperty } from "$lib/utils/Utils.js";
	import { onMount } from "svelte";
	import { defaultPad } from "./TextUtils.js";

    const {padding=defaultPad} = $props();
    function hashControl() {
        if (!browser) return;

        document.querySelectorAll('.jtt-hash-touch').forEach((el) => {
            const htmlEl = el as HTMLElement;
            htmlEl.addEventListener('click', (e: MouseEvent) => {
                let target = e.target as HTMLElement;
                e.preventDefault();
                let hash = '#' + target.id;

                while (!target.id && target.parentElement) {
                    target = target.parentElement as HTMLElement;
                    hash = '#' + target.id;
                    if (target.tagName === 'body') break;
                }



                if (target) { 
                    // Scroll with padding at the top
                    let appliedPadding = padding;
                    // sometimes, the padding required varies. To accomodate for this, we bubble up the DOM tree to find the closest element with a data-hash-pad attribute
                    appliedPadding = getClosestProperty('data-hash-pad', target) || appliedPadding;
                    const targetPosition = target.getBoundingClientRect().top + window.scrollY - appliedPadding;
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
                history.pushState(null, '', hash);
            });
        });
    }

    hashControl();

    // If the page initially loads with a hash, scroll to the element
    onMount(() => {
        if (browser && window.location.hash) {
            const target = document.querySelector(window.location.hash);
            if (target) {
                scrollToTarget(target as HTMLElement);
            } else {
                // wait for target to be available
                const observer = new MutationObserver(() => {
                    const target = document.querySelector(window.location.hash);
                    if (target) {
                        scrollToTarget(target as HTMLElement);
                        observer.disconnect();
                    }
                });
                observer.observe(document.body, {
                    childList: true,
                    subtree: true,
                    attributes: true,
                    attributeFilter: ['id']
                });
                setTimeout(() => {
                    observer.disconnect();
                }, 9000); // Disconnect after 9 seconds if the target is not found
            }
        }
    })
    
    function scrollToTarget(target: HTMLElement) {
        const appliedPadding = getClosestProperty('data-hash-pad', target) || padding;
        const targetPosition = target.getBoundingClientRect().top + window.scrollY - appliedPadding;
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
        location.hash = '';
    }
</script>