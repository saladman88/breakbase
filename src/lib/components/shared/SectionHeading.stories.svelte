<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import SectionHeading from './SectionHeading.svelte';

	const { Story } = defineMeta({
		title: 'Shared/SectionHeading',
		component: SectionHeading,
		tags: ['autodocs'],
		parameters: { layout: 'padded' }
	});
</script>

<Story name="Default" args={{ eyebrow: 'Latest', title: 'Battle results', action: 'View all' }} />
<Story name="Without Action" args={{ eyebrow: 'World', title: 'Top dancers' }} />
<Story name="Title Only" args={{ title: 'Achievements' }} />
