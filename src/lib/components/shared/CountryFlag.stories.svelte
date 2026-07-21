<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import CountryFlag from './CountryFlag.svelte';

	const { Story } = defineMeta({
		title: 'Shared/CountryFlag',
		component: CountryFlag,
		tags: ['autodocs'],
		argTypes: { size: { control: 'select', options: ['sm', 'md', 'lg'] } },
		parameters: { layout: 'centered' }
	});
</script>

<Story name="Japan" args={{ code: 'JP', country: 'Japan', size: 'lg' }} />
<Story name="South Korea" args={{ code: 'KR', country: 'South Korea', size: 'lg' }} />
<Story name="Unknown" args={{ code: null, country: 'Unknown', size: 'lg' }} />
