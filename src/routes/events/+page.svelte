<script lang="ts">
	import EventsPage from '$lib/components/pages/EventsPage.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<svelte:head>
	<title>Upcoming Battles — Breakbase</title>
	<meta name="description" content="Discover upcoming breaking battles, dates, formats, and registration status." />
</svelte:head>

<EventsPage events={data.events} />
