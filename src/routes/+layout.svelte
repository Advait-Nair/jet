<script lang="ts">
	import jet from '$lib/index.js';
	import '../app.css';
	
	let { children } = $props();

</script>


<jet.utils.Prerequisites></jet.utils.Prerequisites>

{@render children?.()}
