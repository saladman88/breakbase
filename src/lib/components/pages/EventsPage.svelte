<script lang="ts">
	import PageShell from '../shared/PageShell.svelte';
	import EventCard from '../events/EventCard.svelte';
	import { events } from '$lib/data/breakbase';
</script>

<PageShell active="events">
	<header class="page-head"><div><span>Events</span><h1>Upcoming battles</h1></div><div class="sticker">Find the<br />next battle</div></header>
	<div class="toolbar"><div class="pills"><button class="active">All</button><button>1V1</button><button>Crew</button><button>Kids</button><button>Online</button></div><label>Date filter<select><option>All dates</option><option>This month</option><option>Next 3 months</option></select></label></div>
	<section class="grid">{#each events as event}<EventCard {...event} />{/each}</section>
</PageShell>

<style>
	.page-head { display: flex; align-items: end; justify-content: space-between; min-height: 245px; }
	.page-head span { padding: 5px 8px; color: #111; background: var(--color-lime); font-size: .68rem; font-weight: 800; text-transform: uppercase; }
	h1 { margin: 12px 0 0; font-size: clamp(3.2rem, 7vw, 7.2rem); line-height: .88; }
	.sticker { display: grid; width: 150px; aspect-ratio: 1; place-items: center; color: var(--color-lime); border: 2px dashed var(--color-lime); border-radius: 50%; font-size: .75rem; font-weight: 800; letter-spacing: .08em; text-align: center; text-transform: uppercase; transform: rotate(9deg); }
	.toolbar { display: flex; align-items: end; justify-content: space-between; gap: 20px; margin: 25px 0; }
	.pills { display: flex; flex-wrap: wrap; gap: 8px; }
	button, select { padding: 10px 14px; color: var(--color-cream); background: #141a1c; border: 1px solid #414b50; border-radius: 4px; font-size: .67rem; font-weight: 700; text-transform: uppercase; }
	button.active { background: var(--color-blue); border-color: var(--color-blue); }
	label { display: grid; gap: 6px; color: #879196; font-size: .6rem; font-weight: 700; text-transform: uppercase; }
	select { min-width: 180px; }
	.grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
	@media (max-width: 1050px) { .grid { grid-template-columns: repeat(2, 1fr); } }
	@media (max-width: 620px) { .sticker { display: none; } .toolbar { align-items: stretch; flex-direction: column; } .grid { grid-template-columns: 1fr; } }
</style>
