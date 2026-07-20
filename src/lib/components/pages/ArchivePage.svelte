<script lang="ts">
	import PageShell from '../shared/PageShell.svelte';
	import ResultsTable from '../archive/ResultsTable.svelte';
</script>

<PageShell active="archive">
	<header><span>Archive</span><h1>Battle history</h1><p>Every battle counts. Search finished events, placements, and matchups from the global breaking scene.</p></header>
	<section class="filters"><label class="search">Search<input placeholder="Events, dancers…" /></label><label>Year<select><option>All years</option><option>2025</option><option>2024</option></select></label><label>Country<select><option>All countries</option><option>Japan</option><option>USA</option></select></label><label>Format<select><option>All formats</option><option>1V1</option><option>Crew</option></select></label><button>Reset filters</button></section>
	<ResultsTable />
	<footer><button>← Prev</button><div><b>1</b><span>2</span><span>3</span><span>4</span><span>…</span><span>28</span></div><button>Next →</button></footer>
</PageShell>

<style>
	header { position: relative; min-height: 330px; padding-top: 80px; overflow: hidden; }
	header::after { position: absolute; top: 20px; right: 5%; width: 260px; height: 260px; background: var(--color-blue); clip-path: polygon(20% 0, 80% 20%, 100% 80%, 38% 100%, 0 45%); content: ''; opacity: .9; transform: rotate(18deg); }
	header span { padding: 5px 8px; color: #111; background: var(--color-lime); font-size: .68rem; font-weight: 800; text-transform: uppercase; }
	h1 { position: relative; z-index: 1; margin: 12px 0; font-size: clamp(4rem, 8vw, 8rem); line-height: .85; }
	header p { position: relative; z-index: 1; max-width: 580px; color: #9da7ab; }
	.filters { display: grid; grid-template-columns: 2fr repeat(3, 1fr) auto; gap: 8px; margin-bottom: 16px; }
	label { display: grid; gap: 5px; color: #849095; font-size: .58rem; font-weight: 700; text-transform: uppercase; }
	input, select, button { height: 44px; padding: 0 13px; color: var(--color-cream); background: #13191b; border: 1px solid #3c474c; border-radius: 4px; font-size: .68rem; text-transform: uppercase; }
	footer { display: flex; align-items: center; justify-content: space-between; margin-top: 18px; }
	footer div { display: flex; gap: 8px; align-items: center; }
	footer span, footer b { display: grid; width: 34px; height: 34px; place-items: center; font-size: .7rem; }
	footer b { background: var(--color-blue); }
	@media (max-width: 800px) { header::after { right: -150px; opacity: .35; } .filters { grid-template-columns: 1fr 1fr; } .search { grid-column: 1 / -1; } }
	@media (max-width: 520px) { .filters { grid-template-columns: 1fr; } .search { grid-column: auto; } footer div span:nth-child(n+4) { display: none; } }
</style>
