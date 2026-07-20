<script lang="ts">
	import DancersPage from '$lib/components/pages/DancersPage.svelte';
	import type { PageProps } from './$types';
	let { data }: PageProps = $props();
</script>

<svelte:head><title>Dancers — Breakbase</title><meta name="description" content="Explore every documented breaker, their achievements, and battle records." /></svelte:head>
<DancersPage dancers={data.dancers} />
