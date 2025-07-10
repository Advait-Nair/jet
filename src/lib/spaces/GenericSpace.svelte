<script>
    import { removeClass } from '$lib/utils/Utils.js';
    import '../styling/component_styling/spaces/main.scss';
    let { children = ()=>{}, solid = false, p=0, my=0, height="auto", cont=false, blur=false, completeBgBlur=false, r=false, auraId=-1, ...props } = $props();
</script>

<jet-spaces-generic class:rounded-xl={r} class:jsg-no-blur={!blur} class:js-before-bg-blur={(completeBgBlur !== false && cont) || completeBgBlur === true } class="js js-aura {props['class'] || ''}" data-aura={auraId == -1 ? false : auraId} class:cont style="padding: calc(var(--spacing) * {p}); margin-top:calc(var(--spacing) * {my});margin-bottom:calc(var(--spacing) * {my}); height: {height} !important;" class:jsg-solid={solid} role="region" {...removeClass(props)}>
    {@render children?.()}
</jet-spaces-generic>