<script lang="ts">
	import PageShell from '../shared/PageShell.svelte';
	import SectionHeading from '../shared/SectionHeading.svelte';
	import RankingList from '../dancers/RankingList.svelte';
	import ResultsTable from '../archive/ResultsTable.svelte';
</script>

<PageShell active="home">
	<section class="hero">
		<div class="copy"><span class="tag">Home</span><h1>The global<br />breaking<br />archive</h1><p>Battles. History. Culture. Ranked.<br />The worldwide home of breaking.</p><div class="buttons"><button>Explore archive →</button><button class="ghost">View rankings</button></div></div>
		<div class="art" aria-hidden="true"><div class="orb">B</div><div class="bolt"></div><span>Respect<br />the culture</span></div>
		<article class="featured"><small>Featured upcoming battle</small><div><b>Jun<br />29</b><h3>Red Bull BC One<br />World Final 2025</h3><em>1V1</em></div><p>Rio de Janeiro, Brazil</p></article>
	</section>
	<section class="dashboard">
		<div class="results"><SectionHeading eyebrow="Latest" title="Results" action="View all" /><ResultsTable /></div>
		<div class="trend"><SectionHeading eyebrow="World" title="Top 5" /><RankingList /></div>
	</section>
</PageShell>

<style>
	.hero { position: relative; display: grid; grid-template-columns: 1.1fr .9fr; min-height: 610px; padding: 26px 0; }
	.copy { z-index: 2; align-self: center; }
	.tag { padding: 5px 8px; color: var(--color-night); background: var(--color-lime); font-size: .7rem; font-weight: 800; text-transform: uppercase; }
	h1 { margin: 14px 0; font-size: clamp(4rem, 8vw, 8.7rem); line-height: .79; letter-spacing: -.06em; }
	.copy p { color: #abb3b6; line-height: 1.5; }
	.buttons { display: flex; gap: 12px; margin-top: 25px; }
	button { padding: 13px 18px; color: white; background: var(--color-blue); border: 0; border-radius: 4px; font-size: .7rem; font-weight: 800; text-transform: uppercase; }
	button.ghost { background: transparent; border: 1px solid #677178; }
	.art { position: relative; display: grid; place-items: center; }
	.orb { z-index: 1; display: grid; width: min(34vw, 430px); aspect-ratio: 1; place-items: center; color: var(--color-night); background: var(--color-blue); border-radius: 50%; font-family: 'Archivo Black'; font-size: 15rem; transform: rotate(-12deg); }
	.bolt { position: absolute; width: 110%; height: 90px; background: var(--color-pink); clip-path: polygon(0 40%, 45% 0, 43% 35%, 100% 5%, 55% 62%, 57% 35%); transform: rotate(-9deg); }
	.art span { position: absolute; right: 0; bottom: 45px; color: var(--color-lime); font-size: .72rem; font-weight: 800; letter-spacing: .15em; text-align: center; text-transform: uppercase; transform: rotate(10deg); }
	.featured { position: absolute; right: 0; bottom: 35px; z-index: 3; width: min(540px, 48%); padding: 18px; border: 1px solid #647076; border-radius: 7px; background: rgba(16,21,22,.94); }
	.featured small { display: inline-block; padding: 5px 8px; color: #111; background: var(--color-pink); font-weight: 800; text-transform: uppercase; }
	.featured > div { display: grid; grid-template-columns: auto 1fr auto; align-items: center; gap: 18px; margin-top: 12px; }
	.featured b { color: var(--color-yellow); font-size: 1.3rem; text-transform: uppercase; }
	.featured h3 { margin: 0; font-size: 1.45rem; line-height: 1; }
	.featured em { padding: 5px 8px; color: #111; background: var(--color-pink); font-size: .7rem; font-style: normal; font-weight: 800; }
	.featured p { margin-bottom: 0; color: #929da2; font-size: .65rem; text-transform: uppercase; }
	.dashboard { display: grid; grid-template-columns: 2.2fr .8fr; gap: 20px; margin-top: 20px; }
	.results, .trend { min-width: 0; padding: 20px; border: 1px solid #303a3f; border-radius: 8px; background: #111617; }
	@media (max-width: 900px) { .hero { grid-template-columns: 1fr; } .art { position: absolute; right: -100px; opacity: .42; } .featured { width: 100%; } .dashboard { grid-template-columns: 1fr; } }
	@media (max-width: 560px) { .hero { min-height: 700px; } h1 { font-size: 4rem; } .art { display: none; } .featured { bottom: 15px; } .featured > div { grid-template-columns: auto 1fr; } .featured em { display: none; } }
</style>
