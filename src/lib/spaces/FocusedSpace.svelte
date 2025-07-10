<script>
	import { removeClass } from '$lib/utils/Utils.js';
    import '../styling/component_styling/spaces/main.scss';
    let { children, p=0, auraId=-1, ...props } = $props();
</script>

<jet-spaces-focused class="js js-aura {props['class'] || ''}" data-aura={auraId == -1 ? false : auraId} style="padding: calc(var(--spacing) * {p})" role="region" {...removeClass(props)}>
    {@render children?.()}
</jet-spaces-focused>
