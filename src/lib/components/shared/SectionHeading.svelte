<script lang="ts">
	let { eyebrow, title, action }: { eyebrow?: string; title: string; action?: string } = $props();
</script>

<div class="heading">
	<div>{#if eyebrow}<span>{eyebrow}</span>{/if}<h2>{title}</h2></div>
	{#if action}<button>{action} →</button>{/if}
</div>

<style>
	.heading { display: flex; align-items: end; justify-content: space-between; gap: 20px; margin-bottom: 18px; }
	span { display: inline-block; margin-bottom: 7px; padding: 5px 8px; color: var(--color-night); background: var(--color-lime); font-size: .66rem; font-weight: 800; text-transform: uppercase; }
	h2 { margin: 0; font-size: clamp(1.8rem, 4vw, 3.6rem); line-height: .94; }
	button { padding: 9px 13px; color: var(--color-cream); background: transparent; border: 1px solid #465055; border-radius: 4px; font-size: .68rem; font-weight: 700; text-transform: uppercase; }
</style>
