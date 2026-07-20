<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import HomePage from './HomePage.svelte';
	import EventsPage from './EventsPage.svelte';
	import ArchivePage from './ArchivePage.svelte';
	import DancerProfilePage from './DancerProfilePage.svelte';

	const { Story } = defineMeta({
		title: 'Pages/Breakbase',
		parameters: { layout: 'fullscreen' }
	});
</script>

<Story name="Home"><HomePage /></Story>
<Story name="Events"><EventsPage /></Story>
<Story name="Archive"><ArchivePage /></Story>
<Story name="Dancer Profile"><DancerProfilePage /></Story>
