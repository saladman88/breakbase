<script lang="ts">
	import { results as mockResults } from '$lib/data/breakbase';
	import type { ArchiveResult } from '$lib/types/breakbase';

	let { results = mockResults }: { results?: ArchiveResult[] } = $props();
</script>

<div class="table-wrap">
	<table>
		<thead><tr><th>Date</th><th>Event</th><th>Format</th><th>Location</th><th>Winner</th><th>Runner-up</th></tr></thead>
		<tbody>
			{#each results as result}
				<tr>
					<td class="date" data-label="Date">{result.date}</td>
					<td class="event" data-label="Event">{result.event}</td>
					<td class="format" data-label="Format"><span>{result.format}</span></td>
					<td class="location" data-label="Location">{result.location}</td>
					<td class="winner" data-label="Winner">{result.winner}</td>
					<td class="runner-up" data-label="Runner-up">{result.runnerUp}</td>
				</tr>
			{/each}
			{#if results.length === 0}
				<tr class="empty-row"><td class="empty" colspan="6">No completed battles have been added yet.</td></tr>
			{/if}
		</tbody>
	</table>
</div>

<style>
	.table-wrap { overflow-x: auto; border: 1px solid #354047; border-radius: 7px; background: #121718; }
	table { width: 100%; min-width: 850px; border-collapse: collapse; }
	th, td { padding: 17px 15px; text-align: left; border-bottom: 1px solid #293136; font-size: .75rem; }
	th { color: #8f999e; font-size: .62rem; letter-spacing: .08em; text-transform: uppercase; }
	tbody tr:hover { background: #182024; }
	.event { font-weight: 700; text-transform: uppercase; }
	td span { padding: 4px 7px; border: 1px solid #566269; border-radius: 3px; font-size: .62rem; }
	.winner { color: var(--color-lime); font-weight: 700; }
	.empty { padding: 42px 15px; color: #8f999e; text-align: center; text-transform: uppercase; }
	tbody tr:last-child td { border-bottom: 0; }

	@media (max-width: 700px) {
		.table-wrap { overflow: visible; border: 0; background: transparent; }
		table, tbody { display: block; width: 100%; }
		table { min-width: 0; }
		thead { display: none; }
		tbody { display: grid; gap: 12px; }
		tr {
			display: grid;
			grid-template-columns: minmax(0, 1fr) minmax(0, 1fr) auto;
			grid-template-areas:
				"date date format"
				"event event event"
				"location location location"
				"winner runner runner";
			gap: 14px 18px;
			padding: 16px;
			border: 1px solid #354047;
			border-radius: 8px;
			background: #121718;
		}
		tbody tr:hover { background: #182024; }
		td { display: block; min-width: 0; padding: 0; border: 0; }
		td::before {
			display: block;
			margin-bottom: 5px;
			color: #778287;
			font-size: .52rem;
			font-weight: 700;
			letter-spacing: .09em;
			text-transform: uppercase;
			content: attr(data-label);
		}
		.date { grid-area: date; color: #aeb6ba; }
		.event { grid-area: event; font-size: .86rem; line-height: 1.35; }
		.format { grid-area: format; align-self: start; text-align: right; }
		.format::before { display: none; }
		.location { grid-area: location; padding-bottom: 13px; color: #929ca1; border-bottom: 1px solid #293136; }
		.winner { grid-area: winner; }
		.runner-up { grid-area: runner; }
		.empty-row { display: block; }
		.empty { padding: 36px 12px; }
		.empty::before { display: none; }
	}
</style>
