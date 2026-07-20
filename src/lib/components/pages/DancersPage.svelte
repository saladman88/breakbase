<script lang="ts">
	import PageShell from '../shared/PageShell.svelte';
	import type { DancerSummary } from '$lib/types/breakbase';

	let { dancers = [] }: { dancers?: DancerSummary[] } = $props();
	const tones = ['blue', 'pink', 'lime', 'yellow'];
</script>

<PageShell active="dancers">
	<header><span>Dancer index</span><h1>Meet the breakers</h1><p>Every name has a battle trail. Explore the dancers captured in the Breakbase archive.</p></header>
	<section class="summary"><strong>{dancers.length}</strong><span>documented dancers</span><i></i><span>Red Bull BC One · 2025</span></section>
	<section class="grid">
		{#each dancers as dancer, index}
			<a class={`card ${tones[index % tones.length]}`} href={`/dancers/${dancer.slug}`}>
				<div class="number">{String(index + 1).padStart(2, '0')}</div>
				<div class="avatar"><b>{dancer.stageName.slice(0, 2).toUpperCase()}</b></div>
				<div class="copy"><small>{dancer.countryCode ?? '—'} · {dancer.country}</small><h2>{dancer.stageName}</h2><p>{dancer.crew ?? 'Independent'}</p></div>
				<div class="meta"><span>{dancer.appearances} appearance{dancer.appearances === 1 ? '' : 's'}</span><strong>{dancer.bestPlacement ? (dancer.bestPlacement === 1 ? 'Champion' : dancer.bestPlacement === 2 ? 'Finalist' : `Top ${dancer.bestPlacement}`) : 'Competitor'}</strong></div>
			</a>
		{/each}
	</section>
</PageShell>

<style>
	header { min-height: 310px; padding-top: 75px; } header > span { padding: 5px 8px; color: #111; background: var(--color-pink); font-size: .65rem; font-weight: 800; text-transform: uppercase; } h1 { max-width: 900px; margin: 12px 0; font-size: clamp(4rem, 8vw, 8rem); line-height: .82; } header p { max-width: 580px; color: #9ca6aa; }
	.summary { display: flex; align-items: center; gap: 14px; margin: 15px 0 24px; padding: 16px 18px; border-block: 1px solid #354047; text-transform: uppercase; }.summary strong { color: var(--color-lime); font-family: 'Archivo Black'; font-size: 1.8rem; }.summary span { color: #8d979b; font-size: .62rem; font-weight: 800; }.summary i { flex: 1; height: 1px; background: #354047; }
	.grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; }.card { position: relative; display: grid; min-height: 340px; padding: 18px; overflow: hidden; color: var(--color-cream); border: 1px solid #354047; border-radius: 8px; background: #111617; text-decoration: none; transition: transform .2s, border-color .2s; }.card:hover { border-color: currentColor; transform: translateY(-5px); }.number { position: absolute; top: 12px; right: 14px; font-family: 'Archivo Black'; opacity: .45; }.avatar { display: grid; width: 150px; aspect-ratio: 1; place-items: center; border-radius: 50%; background: currentColor; transform: translate(-28px, -28px); }.avatar b { color: #111; font-family: 'Archivo Black'; font-size: 3.3rem; letter-spacing: -.12em; }.copy { align-self: end; }.copy small { font-size: .58rem; font-weight: 800; letter-spacing: .1em; }.copy h2 { margin: 6px 0; overflow-wrap: anywhere; color: var(--color-cream); font-size: clamp(2rem, 3.5vw, 3.5rem); line-height: .86; }.copy p { margin: 0; color: #899398; font-size: .65rem; text-transform: uppercase; }.meta { display: flex; align-items: end; justify-content: space-between; margin-top: 16px; padding-top: 12px; border-top: 1px solid #354047; font-size: .55rem; text-transform: uppercase; }.meta span { color: #899398; }.meta strong { color: currentColor; }
	.blue { color: var(--color-blue); }.pink { color: var(--color-pink); }.lime { color: var(--color-lime); }.yellow { color: var(--color-yellow); }
	@media (max-width: 900px) { .grid { grid-template-columns: repeat(2, 1fr); } } @media (max-width: 560px) { .grid { grid-template-columns: 1fr; }.summary i, .summary span:last-child { display: none; } }
</style>
