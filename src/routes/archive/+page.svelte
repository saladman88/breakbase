<script lang="ts">
	import ArchivePage from '$lib/components/pages/ArchivePage.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<svelte:head>
	<title>Battle Archive — Breakbase</title>
	<meta name="description" content="Search completed breaking events, winners, finalists, locations, and formats." />
</svelte:head>

<ArchivePage results={data.results} />
