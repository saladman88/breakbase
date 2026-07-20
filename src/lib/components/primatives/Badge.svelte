<script lang="ts">
	let {
		label,
		tone = 'lime'
	}: {
		label: string;
		tone?: 'lime' | 'pink' | 'blue' | 'yellow';
	} = $props();
</script>

<span class="badge {tone}">{label}</span>

<style>
	.badge {
		display: inline-flex;
		padding: 0.35rem 0.55rem;
		border-radius: 3px;
		color: var(--color-night);
		font-size: 0.7rem;
		font-weight: 700;
		line-height: 1;
		text-transform: uppercase;
	}

	.lime {
		background: var(--color-lime);
	}

	.pink {
		background: var(--color-pink);
	}

	.blue {
		background: var(--color-blue);
	}

	.yellow {
		background: var(--color-yellow);
	}
</style>
