<script lang="ts">
	type EventStatus = 'open' | 'invite-only' | 'coming-soon';

	type EventCardProps = {
		name: string;
		city: string;
		country: string;
		date: string;
		format: string;
		status: EventStatus;
	};

	let { name, city, country, date, format, status }: EventCardProps = $props();

	const statusLabels: Record<EventStatus, string> = {
		open: 'Registration open',
		'invite-only': 'Invite only',
		'coming-soon': 'Coming soon'
	};
</script>

<article class="event-card">
	<div class="event-card__date">
		<span>{date}</span>
	</div>

	<div class="event-card__body">
		<p class="event-card__location">
			{city}, {country}
		</p>

		<h3>{name}</h3>

		<div class="event-card__metadata">
			<span class="format">{format}</span>
			<span
				class="status"
				class:open={status === 'open'}
				class:invite={status === 'invite-only'}
				class:soon={status === 'coming-soon'}
			>
				{statusLabels[status]}
			</span>
		</div>
	</div>
</article>

<style>
	.event-card {
		display: flex;
		width: 100%;
		min-height: 22rem;
		overflow: hidden;
		color: var(--color-cream, #f8f6f0);
		background: radial-gradient(circle at 70% 25%, #263143 0, transparent 35%), #1d2225;
		border: 1px solid #41484d;
		border-radius: 0.75rem;
		transition: transform .2s ease, border-color .2s ease;
	}

	.event-card:hover { transform: translateY(-5px); border-color: var(--color-blue, #4169ff); }

	.event-card__date {
		display: flex;
		width: 5rem;
		padding: 1rem;
		align-items: flex-start;
		justify-content: center;
		color: #151515;
		background: var(--color-lime, #c8ff35);
		font-weight: 800;
		text-transform: uppercase;
	}

	.event-card__body {
		display: flex;
		flex: 1;
		padding: 1.25rem;
		flex-direction: column;
		justify-content: flex-end;
	}

	.event-card__location {
		margin: 0 0 0.5rem;
		color: #aeb5b8;
		font-size: 0.75rem;
		font-weight: 700;
		letter-spacing: 0.08em;
		text-transform: uppercase;
	}

	h3 {
		max-width: 15ch;
		margin: 0 0 1.25rem;
		font-size: 1.75rem;
		line-height: 0.95;
		text-transform: uppercase;
	}

	.event-card__metadata {
		display: flex;
		gap: 0.5rem;
		align-items: center;
		justify-content: space-between;
	}

	.format,
	.status {
		padding: 0.45rem 0.65rem;
		border-radius: 0.25rem;
		font-size: 0.7rem;
		font-weight: 800;
		text-transform: uppercase;
	}

	.format {
		color: #151515;
		background: var(--color-blue, #4169ff);
	}

	.status {
		color: #151515;
	}

	.status.open {
		background: var(--color-lime, #c8ff35);
	}

	.status.invite {
		background: var(--color-pink, #ff3daa);
	}

	.status.soon {
		background: var(--color-yellow, #ffd84a);
	}

	@media (max-width: 560px) { .event-card { min-height: 18rem; } h3 { font-size: 1.45rem; } }
</style>
