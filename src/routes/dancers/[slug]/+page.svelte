<script lang="ts">
	import DancerProfilePage from '$lib/components/pages/DancerProfilePage.svelte';
	import type { PageProps } from './$types';
	let { data }: PageProps = $props();
</script>

<svelte:head>
	<title>{data.profile.stageName} — Breakbase</title>
	<meta name="description" content={`Explore ${data.profile.stageName}'s battle record, achievements, opponents, and event history.`} />
</svelte:head>

<DancerProfilePage profile={data.profile} />
