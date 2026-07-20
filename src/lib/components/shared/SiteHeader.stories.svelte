<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import SiteHeader from './SiteHeader.svelte';

	const { Story } = defineMeta({
		title: 'Shared/SiteHeader',
		component: SiteHeader,
		tags: ['autodocs'],
		argTypes: {
			active: { control: 'select', options: ['home', 'events', 'archive', 'dancers'] }
		},
		parameters: { layout: 'fullscreen' }
	});
</script>

<Story name="Home Active" args={{ active: 'home' }} />
<Story name="Events Active" args={{ active: 'events' }} />
<Story name="Archive Active" args={{ active: 'archive' }} />
<Story name="Dancers Active" args={{ active: 'dancers' }} />
