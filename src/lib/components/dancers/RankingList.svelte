<script lang="ts">
	import { dancers } from '$lib/data/breakbase';
	let { accent = 'lime' }: { accent?: 'lime' | 'pink' } = $props();
</script>

<div class="ranking" class:pink={accent === 'pink'}>
	{#each dancers as dancer}
		<div class="row"><strong>{dancer.rank}</strong><span>{dancer.name}<small>{dancer.country}</small></span><b>{dancer.points.toLocaleString()} pts</b></div>
	{/each}
</div>

<style>
	.ranking { border-top: 3px solid var(--color-lime); }
	.ranking.pink { border-color: var(--color-pink); }
	.row { display: grid; grid-template-columns: 28px 1fr auto; align-items: center; gap: 10px; padding: 13px 4px; border-bottom: 1px solid #343d42; }
	strong { color: var(--color-lime); }
	.pink strong { color: var(--color-pink); }
	span { font-size: .78rem; font-weight: 700; text-transform: uppercase; }
	small { margin-left: 9px; color: #838d91; font-size: .61rem; }
	b { color: #aeb6ba; font-size: .64rem; font-weight: 500; text-transform: uppercase; }
</style>
