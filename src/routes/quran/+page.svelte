<script lang="ts">
	import QuranPage from '#lib/components/QuranPage.svelte';
	import { page } from '$app/state';
	import { onMount } from 'svelte';

	let error: string | undefined = $state();
	let svgContent: string | undefined = $state();
	let loading = $state(false);

	async function fetchQuranPage(page: number) {
		const pageNumber = page.toString().padStart(3, '0');
		const res = await fetch(`/hafs-svg/svg/${pageNumber}.svg`);

		if (!res.ok) {
			error = `SVG icon "${pageNumber}" not found`;
		}

		let svgContent = await res.text();
		svgContent = svgContent.replace(/fill="[^"]*"/g, 'fill="currentColor"'); // TODO pre-process them instead
		return svgContent;
	}

	let pageNumber = $derived.by(() => {
		const pageParam = page.url.searchParams.get('page') ?? '0';
		const pageNumber = Number(pageParam);
		if (isNaN(pageNumber)) {
			return 0;
		}
		return pageNumber;
	});

	let pages: string[] = $state(new Array(3));

	onMount(async () => {
		if (pageNumber) {
			loading = true;
			const svgContent = await fetchQuranPage(pageNumber);
			pages[0] = svgContent;
			pages[1] = await fetchQuranPage(pageNumber + 1);
			pages[2] = await fetchQuranPage(pageNumber + 2);
			loading = false;
		}
	});
</script>

<div class="container">
	{#each pages as svgContent, index (index)}
		<div class="page">
			<QuranPage {svgContent}></QuranPage>
		</div>
	{/each}
</div>

<!-- {#if svgContent}
	<QuranPage {svgContent}></QuranPage>
{:else if error}
	<div>{error}</div>
{:else if loading}
	<div>Loading</div>
{:else}
	<div>check logic</div>
{/if} -->

<style>
	.container {
		display: flex;
		gap: 1rem;
		flex-direction: row-reverse;
		overflow-x: auto;
		overflow-y: hidden;
		height: 100%;
		width: 100%;

		scroll-snap-type: x mandatory;
		scroll-behavior: smooth;

		&::-webkit-scrollbar {
			display: none;
		}
	}

	.page {
	    display: block;
		min-width: 100%;
		scroll-snap-align: center;
        scroll-snap-stop: always;
	}
</style>
