<script lang="ts">
	let {
		code,
		country,
		size = 'md'
	}: {
		code: string | null;
		country?: string;
		size?: 'sm' | 'md' | 'lg';
	} = $props();

	const label = $derived(country ? `${country} flag` : code ? `${code.toUpperCase()} flag` : 'Unknown country');
</script>

{#if code}
	<img class={`flag ${size}`} src={`/flags/${code.toLowerCase()}.svg`} alt={label} title={country ?? code.toUpperCase()} loading="lazy" decoding="async" />
{:else}
	<span class={`unknown ${size}`} role="img" aria-label={label}>?</span>
{/if}

<style>
	.flag { display: inline-block; flex: 0 0 auto; width: 1.333em; height: 1em; object-fit: cover; border-radius: 2px; box-shadow: 0 0 0 1px rgb(255 255 255 / 18%); }
	.sm { font-size: .85rem; }
	.md { font-size: 1.1rem; }
	.lg { font-size: 1.55rem; }
	.unknown { display: inline-grid; width: 1.35em; aspect-ratio: 4 / 3; place-items: center; color: #8d979b; border: 1px dashed #566269; border-radius: 2px; font-size: .65rem; }
</style>
