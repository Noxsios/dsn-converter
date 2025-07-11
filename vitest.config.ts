import { defineConfig } from 'vitest/config';
import { svelte } from '@sveltejs/vite-plugin-svelte';

export default defineConfig(({ mode }) => ({
	plugins: [svelte({ hot: !process.env.VITEST, compilerOptions: { dev: mode === 'development' } })],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}'],
		environment: 'jsdom',
		setupFiles: './vitest-setup.js',
		alias: {
			'$lib/': new URL('src/lib/', import.meta.url).pathname
		}
	}
}));
