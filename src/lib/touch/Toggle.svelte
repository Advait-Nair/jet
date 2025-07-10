<script lang="ts">
	import Card from '$lib/organise/Card.svelte';
	import { removeClass } from '$lib/utils/Utils.js';
    import '../styling/component_styling/text/main.scss';
    let { enabled = $bindable(false), ...props } = $props();

    function toggle() {
        enabled = !enabled;
    }
</script>


<div class:jet-toggle-enabled={enabled} class="jet-toggle-touch cursor-pointer" role="button" tabindex="0" onclick={toggle} onkeypress={toggle}>
    <Card xl nofw wrapperClass="w-14 p-1 h-9 jet-toggle {props['class'] || ''}" {...removeClass(props)}>
        <div class="jet-toggle-white w-6 h-6 bg-white rounded-full"></div>
    </Card>
</div>