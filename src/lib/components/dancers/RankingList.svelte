<script lang="ts">
	import type { DancerRanking } from '$lib/types/breakbase';
	import CountryFlag from '../shared/CountryFlag.svelte';
	let { rankings = [], accent = 'lime' }: { rankings?: DancerRanking[]; accent?: 'lime' | 'pink' } = $props();
</script>

<div class="ranking" class:pink={accent === 'pink'}>
	{#each rankings as dancer}
		<a class="row" href={`/dancers/${dancer.slug}`}><strong>{dancer.rank}</strong><span>{dancer.stageName}<small><CountryFlag code={dancer.countryCode} size="sm" /></small></span><b>{dancer.points.toLocaleString()} pts</b></a>
	{/each}
	{#if rankings.length === 0}<p>No ranking data yet.</p>{/if}
</div>

<style>
	.ranking { border-top: 3px solid var(--color-lime); }
	.ranking.pink { border-color: var(--color-pink); }
	.row { display: grid; grid-template-columns: 28px 1fr auto; align-items: center; gap: 10px; padding: 13px 4px; border-bottom: 1px solid #343d42; }
	.row { color: inherit; text-decoration: none; }
	.row:hover { background: rgba(255,255,255,.035); }
	strong { color: var(--color-lime); }
	.pink strong { color: var(--color-pink); }
	span { font-size: .78rem; font-weight: 700; text-transform: uppercase; }
	small { display: inline-flex; margin-left: 9px; vertical-align: middle; }
	b { color: #aeb6ba; font-size: .64rem; font-weight: 500; text-transform: uppercase; }
	p { color: #838d91; font-size: .7rem; }
</style>
