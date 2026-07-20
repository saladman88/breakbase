<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Badge from './Badge.svelte';

	const { Story } = defineMeta({
		title: 'Primitives/Badge',
		component: Badge,
		tags: ['autodocs'],
		argTypes: {
			tone: {
				control: 'select',
				options: ['lime', 'pink', 'blue', 'yellow']
			}
		}
	});
</script>

<Story name="Lime" args={{ label: 'Registration open', tone: 'lime' }} />

<Story name="Pink" args={{ label: 'Invite only', tone: 'pink' }} />

<Story name="Formats">
	<div style="display: flex; gap: 12px;">
		<Badge label="1V1" tone="blue" />
		<Badge label="Crew" tone="lime" />
		<Badge label="7 to Smoke" tone="yellow" />
	</div>
</Story>
