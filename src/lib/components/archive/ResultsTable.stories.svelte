<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import ResultsTable from './ResultsTable.svelte';

	const { Story } = defineMeta({
		title: 'Archive/ResultsTable',
		component: ResultsTable,
		tags: ['autodocs'],
		parameters: { layout: 'padded' }
	});
</script>

<Story name="Recent Battles" />
