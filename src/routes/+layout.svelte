<script lang="ts">
	import '../app.css';
	import { ModeWatcher } from 'mode-watcher';

	let { children } = $props();
</script>

<svelte:head>
	<title>DSN Converter</title>
	<meta name="description" content="A DSN converter web app" />
	<meta name="theme-color" content="#000000" />
</svelte:head>

<ModeWatcher />
{@render children()}
