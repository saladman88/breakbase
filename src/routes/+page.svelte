<script lang="ts">
	import HomePage from '$lib/components/pages/HomePage.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<svelte:head>
	<title>Breakbase — The Global Breaking Archive</title>
	<meta name="description" content="Explore breaking battles, results, rankings, and dancer histories from around the world." />
</svelte:head>

<HomePage results={data.results} featuredEvent={data.featuredEvent} rankings={data.rankings} />
