import adapter from '@sveltejs/adapter-netlify';
import { sveltePreprocess } from 'svelte-preprocess';

const config = {
	preprocess: sveltePreprocess(),
	kit: { adapter: adapter() }
};

export default config;
