<script lang="ts">
	import { removeClass } from '$lib/utils/Utils.js';
    import '../styling/component_styling/text/main.scss';
    let { children = ()=>{}, ...props } = $props();

    
</script>

<h4 class="jtt jtt-category {props.class}" {...removeClass(props)}>
    {@render children?.()}
</h4>