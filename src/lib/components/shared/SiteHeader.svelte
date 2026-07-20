<script lang="ts">
	let { active = 'home' }: { active?: 'home' | 'events' | 'archive' | 'dancers' } = $props();

	const items = [
		{ id: 'home', label: 'Home' },
		{ id: 'events', label: 'Events' },
		{ id: 'archive', label: 'Archive' },
		{ id: 'dancers', label: 'Dancers' }
	] as const;
</script>

<header class="header">
	<a class="brand" href="#home">Breakbase</a>
	<nav aria-label="Main navigation">
		{#each items as item}
			<a href={'#' + item.id} class:active={active === item.id}>{item.label}</a>
		{/each}
	</nav>
	<div class="actions">
		<button aria-label="Search">⌕</button>
		<button class="login">Login</button>
	</div>
</header>

<style>
	.header { height: 70px; display: grid; grid-template-columns: 1fr auto 1fr; align-items: center; padding: 0 34px; border-bottom: 1px solid #343b3f; background: #111516; }
	.brand { color: var(--color-cream); font-family: 'Archivo Black', sans-serif; font-size: 1.45rem; font-style: italic; text-transform: uppercase; text-decoration: none; }
	nav { display: flex; gap: 28px; }
	nav a { position: relative; padding: 25px 0 22px; color: #c7cbcc; font-size: .72rem; font-weight: 700; letter-spacing: .06em; text-decoration: none; text-transform: uppercase; }
	nav a.active { color: var(--color-cream); }
	nav a.active::after { position: absolute; right: 0; bottom: 0; left: 0; height: 3px; background: var(--color-blue); content: ''; }
	.actions { display: flex; justify-content: flex-end; gap: 10px; }
	button { min-width: 38px; height: 38px; color: var(--color-cream); background: transparent; border: 1px solid #343b3f; border-radius: 5px; cursor: pointer; }
	.login { padding: 0 14px; font-size: .7rem; font-weight: 700; text-transform: uppercase; }
	@media (max-width: 760px) { .header { grid-template-columns: 1fr auto; height: 62px; padding: 0 18px; } nav { position: fixed; z-index: 10; right: 0; bottom: 0; left: 0; justify-content: space-around; gap: 0; padding: 0 10px; background: #111516; border-top: 1px solid #343b3f; } nav a { padding: 16px 8px; } .actions { display: none; } }
</style>
