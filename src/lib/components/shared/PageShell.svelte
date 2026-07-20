<script lang="ts">
	import type { Snippet } from 'svelte';
	import SiteHeader from './SiteHeader.svelte';

	let { active, children }: { active: 'home' | 'events' | 'archive' | 'dancers'; children: Snippet } = $props();
</script>

<div class="shell">
	<SiteHeader {active} />
	<main>{@render children()}</main>
</div>

<style>
	.shell { min-height: 100vh; overflow: hidden; color: var(--color-cream); background: radial-gradient(circle at 70% 12%, #17232b 0, #111516 32%, #0d1011 68%); }
	main { width: min(1440px, 100%); margin: 0 auto; padding: 34px; }
	@media (max-width: 760px) { main { padding: 22px 18px 92px; } }
</style>
