<script lang="ts">
	import { results } from '$lib/data/breakbase';
</script>

<div class="table-wrap">
	<table>
		<thead><tr><th>Date</th><th>Event</th><th>Format</th><th>Location</th><th>Winner</th><th>Runner-up</th></tr></thead>
		<tbody>
			{#each results as result}
				<tr><td>{result.date}</td><td class="event">{result.event}</td><td><span>{result.format}</span></td><td>{result.location}</td><td class="winner">{result.winner}</td><td>{result.runnerUp}</td></tr>
			{/each}
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
	tbody tr:last-child td { border-bottom: 0; }
</style>
