<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import EventCard from './EventCard.svelte';

	const { Story } = defineMeta({
		title: 'Events/EventCard',
		component: EventCard,
		tags: ['autodocs'],
		argTypes: {
			status: {
				control: 'select',
				options: ['open', 'invite-only', 'coming-soon']
			},
			format: {
				control: 'select',
				options: ['1V1', '2V2', 'CREW', '7 TO SMOKE']
			}
		},
		parameters: {
			layout: 'centered'
		}
	});
</script>

<Story
	name="Registration Open"
	args={{
		name: 'Breaking for Gold 2025',
		city: 'New York',
		country: 'USA',
		date: 'Aug 16–17',
		format: 'CREW',
		status: 'open'
	}}
/>

<Story
	name="Invite Only"
	args={{
		name: 'Red Bull BC One World Final',
		city: 'Rio de Janeiro',
		country: 'Brazil',
		date: 'Jun 29',
		format: '1V1',
		status: 'invite-only'
	}}
/>

<Story
	name="Coming Soon"
	args={{
		name: 'Battle King Tokyo',
		city: 'Tokyo',
		country: 'Japan',
		date: 'Jul 12',
		format: '1V1',
		status: 'coming-soon'
	}}
/>

<Story
	name="Long Event Name"
	args={{
		name: 'International Underground Breaking Championship World Final',
		city: 'Manchester',
		country: 'United Kingdom',
		date: 'Sep 20–21',
		format: 'CREW',
		status: 'open'
	}}
/>
