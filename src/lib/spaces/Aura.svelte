<script lang="ts">
	import { getClosestProperty, isPossibleURL } from '$lib/utils/Utils.js';
    import '../styling/component_styling/spaces/main.scss';
	import type AuraConfig from './AuraConfig.js';

    let defaultAuraConfig:AuraConfig[] = [
        {auraId:0, auraAccent1: '#2222ee', auraAccent2: '#6323ee', auraIntensity: 0, auraBg: '#222244'},
    ]
    let { fixed=true, absolute=false, auraConfig=defaultAuraConfig, defaultOpacity=1, blurIntensity=10, ...props } = $props();
    let defaultAccent2 = '#000000';
    let defaultBg = '#000000';

    // Aura is a subcomponent of spaces that are characterised by spectrums of colour, in order to create an aurora-like atmosphere that is visually appealing and immersive.

    if (!auraConfig || !Array.isArray(auraConfig) || auraConfig.length === 0 || auraConfig == defaultAuraConfig) {
        console.warn('jet.spaces.Aura: No valid auraConfig provided. Expect errors in-console. Please rectify this by providing prop: auraConfig:AuraConfig[] to jet.spaces.Aura.');
        auraConfig = defaultAuraConfig;
    }


    let auraOpacities:number[] = $state(auraConfig.map(_ => 0));
    let intersectionObserver: IntersectionObserver;

    let aura:HTMLElement|any = $state(null);
    let hashPad = $state('0');
    
    $effect(() => {
        hashPad = getClosestProperty('data-hash-pad', aura)+'px' || '0';
        console.log('jet.spaces.Aura: hashPad set to', hashPad);
    });

    function blockOutRatio(ratio:number): number {
        // return the ratio snapped to nearest quarter
        if (ratio < 0.25) return 0;
        if (ratio < 0.5) return 0.25;
        if (ratio < 0.75) return 0.5;
        if (ratio < 0.9) return 0.75;
        return 1;
    }

    $effect(() => {
        if (typeof document !== 'undefined') {
            intersectionObserver = new IntersectionObserver(
                (entries) => {
                    // Sort entries by intersection ratio in descending order
                    const visibleEntries = entries
                        .filter(entry => entry.isIntersecting)
                        .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
                    // Update auraOpacities based on the intersection ratio of each id;
                    visibleEntries.forEach(entry => {
                        const id = entry.target.getAttribute('data-aura');
                        const ratio = entry.intersectionRatio;
                        auraOpacities[parseInt(id || '0')] = blockOutRatio(ratio);
                    });
                },
                // { threshold: [0, 0.2, 0.4, 0.6, 0.7, 0.8, 1] }
                {
                    threshold: [0, 0.1, 0.2, 0.25, 0.5, 0.75, 0.9, 1],
                    rootMargin: `0px 0px ${hashPad} 0px`
                }
            );
            
            // Observe all elements with jet-spaces-* that have data-aura
            document.querySelectorAll('.js[data-aura]').forEach(element => {
                // @ts-ignore;
                if (element.dataAura === -1) return;
                intersectionObserver.observe(element);
            });
            
            return () => {
                if (intersectionObserver) {
                    intersectionObserver.disconnect();
                }
            };
        }
    });

    function wrapInURL(url:string | undefined): string|any {
        if (isPossibleURL(url || '')) {
            if (!url) return '';
            return url ? `url('${url}')` : '';
        }
        return url;
    }

    function isBGM(property:string|undefined): boolean {
        return property?.includes('gradient') || false;
    }

    function imageControl(property:string|undefined, defaultP:string): string {
        return `${isPossibleURL(property || '') || isBGM(property || '') ? 'background-image' : 'background'}: ${wrapInURL(property) || wrapInURL(defaultP)}`;
    }

    
    let blurControl = $state('none');
    if (blurIntensity > 0) blurControl = `blur(${blurIntensity}px)`;

    function filterControl(cfg:any, property:string|number|any|undefined, defaultP:string|any): string {
        let chosenBlur = cfg.auraBlur !== undefined ? `blur(${cfg.auraBlur}px)` : blurControl;
        console.log(chosenBlur)
        if (!(isPossibleURL(cfg?.auraBg || '') || isPossibleURL(cfg?.auraAccent1 || '') || isPossibleURL(cfg?.auraAccent2 || ''))) {
            chosenBlur = '';
        }
        return `filter: opacity(${property || defaultP}) ${chosenBlur}; -webkit-filter: opacity(${property || defaultP}) ${chosenBlur}`;
    }
</script>

{#each auraConfig as cfg}
    <jet-spaces-aura bind:this={aura} class:jsa-image={true} style="opacity: {auraOpacities[cfg.auraId] < (cfg.auraIntensity || defaultOpacity) ? auraOpacities[cfg.auraId] : (cfg.auraIntensity || defaultOpacity)}; {imageControl(cfg.auraBg, defaultBg)}; {filterControl(cfg, cfg?.auraIntensity, defaultOpacity)}" class="js js-aura" class:jsa-fixed={fixed}>
        <div style="{imageControl(cfg.auraAccent1, defaultAccent2)}" class="js js-aura jsa-accent1"></div>
        <div style="{imageControl(cfg.auraAccent2, defaultAccent2)}" class="js js-aura jsa-accent2"></div>
    </jet-spaces-aura>
{/each}