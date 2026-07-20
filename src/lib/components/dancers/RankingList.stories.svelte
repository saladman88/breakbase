<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import RankingList from './RankingList.svelte';

	const { Story } = defineMeta({
		title: 'Dancers/RankingList',
		component: RankingList,
		tags: ['autodocs'],
		argTypes: { accent: { control: 'radio', options: ['lime', 'pink'] } },
		parameters: { layout: 'centered' }
	});
</script>

<Story name="B-Boys" args={{ accent: 'lime' }} />
<Story name="B-Girls" args={{ accent: 'pink' }} />
