<script lang="ts">
	import { browser } from "$app/environment";

    let { modifiers } = $props();

    const BodyHandler = () => {
        if (!browser) return;
        Object.keys(modifiers).forEach((modifier: string) => {
            // @ts-ignore;
            document.body.setAttribute(modifier, modifiers[modifier]);
        });
    };
    
    BodyHandler();


</script>

