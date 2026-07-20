<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import RankingChart from './RankingChart.svelte';

	const { Story } = defineMeta({
		title: 'Dancers/RankingChart',
		component: RankingChart,
		tags: ['autodocs'],
		argTypes: { current: { control: { type: 'number', min: 1, max: 100 } } },
		parameters: { layout: 'padded' }
	});
</script>

<Story name="Rising Rank" args={{ current: 4 }} />
<Story name="Top Ranked" args={{ current: 1 }} />
