<script lang="ts">
	import Quran from '#lib/components/Quran.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<svelte:head>
	<title>Quran</title>
</svelte:head>

<Quran surahs={data.surahs}></Quran>
