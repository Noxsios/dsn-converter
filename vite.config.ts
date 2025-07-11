import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
	plugins: [
		tailwindcss(),
		sveltekit(),
		VitePWA({
			registerType: 'autoUpdate',
			manifest: {
				name: 'DSN to Commercial Number Converter',
				short_name: 'DSN Converter',
				theme_color: '#373737',
				background_color: '#252627',
				display: 'standalone',
				icons: [
					{
						src: 'favicon.ico',
						sizes: '64x64 32x32 24x24 16x16',
						type: 'image/x-icon'
					},
					{
						src: 'logo192.png',
						sizes: '192x192',
						type: 'image/png'
					},
					{
						src: 'logo512.png',
						sizes: '512x512',
						type: 'image/png'
					}
				]
			}
		})
	]
});
