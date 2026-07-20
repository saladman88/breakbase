<script lang="ts">
	import PageShell from '../shared/PageShell.svelte';
	import RankingChart from '../dancers/RankingChart.svelte';
	import { results } from '$lib/data/breakbase';
</script>

<PageShell active="dancers">
	<section class="profile">
		<div class="identity"><span>Dancer profile</span><div class="portrait"><b>K</b></div><p>B-Boy</p><h1>Kairo</h1><h2>Japan 🇯🇵</h2><div class="stats"><div><small>World rank</small><strong>4</strong></div><div><small>Win–loss</small><strong>78–18</strong></div><div><small>Ranking points</small><strong>1,330</strong></div></div><p class="bio">Power, flow and precision. Representing Japan with clean style and unstoppable energy.</p></div>
		<div class="career"><div class="chart-head"><h3>Ranking history</h3><button>View full history →</button></div><RankingChart /><div class="achievements"><h3>Achievements</h3><div class="badges"><div class="pink">BC<br /><small>World finalist</small></div><div class="yellow">JP<br /><small>Champion</small></div><div class="blue">BL<br /><small>Battle winner</small></div><div class="lime">JD<br /><small>Finalist</small></div></div></div></div>
	</section>
	<section class="recent"><div class="chart-head"><h3>Recent battle results</h3><button>View all →</button></div>{#each results.slice(0, 4) as result, index}<div class="result"><time>{result.date}</time><strong>{result.event}</strong><span>{result.format}</span><b class:top={index === 2}>{index === 2 ? 'Top 4' : 'Win'}</b><small>vs {result.runnerUp}</small></div>{/each}</section>
</PageShell>

<style>
	.profile { display: grid; grid-template-columns: .8fr 1.5fr; gap: 24px; }
	.identity, .career, .recent { padding: 24px; border: 1px solid #354047; border-radius: 8px; background: #111617; }
	.identity > span { padding: 5px 8px; color: #111; background: var(--color-lime); font-size: .65rem; font-weight: 800; text-transform: uppercase; }
	.portrait { display: grid; width: 100%; aspect-ratio: 1.25; margin: 20px 0; place-items: center; overflow: hidden; background: var(--color-blue); clip-path: polygon(8% 0, 100% 0, 90% 100%, 0 92%); }
	.portrait b { color: #111; font-family: 'Archivo Black'; font-size: 15rem; transform: rotate(-14deg); }
	.identity p { margin: 0; color: #9ca6aa; font-size: .72rem; text-transform: uppercase; }
	h1 { margin: 0; font-size: clamp(4.5rem, 9vw, 8rem); line-height: .85; }
	h2 { margin: 8px 0 18px; font-family: 'Space Grotesk'; font-size: 1rem; letter-spacing: .08em; }
	.stats { display: grid; grid-template-columns: repeat(3, 1fr); border-block: 1px solid #354047; }
	.stats div { padding: 15px 8px; border-right: 1px solid #354047; }
	.stats div:last-child { border: 0; }
	.stats small { display: block; color: #899398; font-size: .55rem; text-transform: uppercase; }
	.stats strong { display: block; margin-top: 5px; color: var(--color-lime); font-family: 'Archivo Black'; font-size: 1.3rem; }
	.bio { margin-top: 18px !important; line-height: 1.6; text-transform: none !important; }
	.chart-head { display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px; }
	h3 { margin: 0; font-size: 1rem; }
	button { padding: 8px 10px; color: var(--color-cream); background: transparent; border: 1px solid #3f494e; border-radius: 3px; font-size: .58rem; text-transform: uppercase; }
	.achievements { margin-top: 28px; }
	.badges { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin-top: 15px; }
	.badges div { display: grid; aspect-ratio: 1; place-items: center; border: 2px solid currentColor; border-radius: 50%; font-family: 'Archivo Black'; font-size: 1.4rem; text-align: center; }
	.badges small { font-family: 'Space Grotesk'; font-size: .48rem; text-transform: uppercase; }
	.pink { color: var(--color-pink); }.yellow { color: var(--color-yellow); }.blue { color: var(--color-blue); }.lime { color: var(--color-lime); }
	.recent { margin-top: 24px; }
	.result { display: grid; grid-template-columns: 120px 1.5fr 70px 80px 1fr; align-items: center; gap: 12px; padding: 15px 5px; border-top: 1px solid #303a3f; font-size: .7rem; }
	.result strong { text-transform: uppercase; }.result span { text-align: center; border: 1px solid #465157; }.result b { color: var(--color-lime); text-transform: uppercase; }.result b.top { color: var(--color-yellow); }.result small, time { color: #8c969a; }
	@media (max-width: 900px) { .profile { grid-template-columns: 1fr; } .portrait { max-height: 350px; } }
	@media (max-width: 600px) { .badges { grid-template-columns: repeat(2, 1fr); } .result { grid-template-columns: 90px 1fr auto; } .result span, .result small { display: none; } }
</style>
