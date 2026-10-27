<!-- <script lang="ts">
	import { resolve } from '$app/paths';
	import { downloadSurahAudio, isSurahDownloaded } from '#lib/quran/audio.js';
	import {
		BISMILLAH,
		revelationLabel,
		showsBismillah,
		toArabicNumeral
	} from '#lib/quran/format.js';
	import { player } from '#lib/quran/player.svelte.js';
	import { settings } from '#lib/stores/settings.svelte.js';
	import type { PageProps } from './$types';
	import Verse from '#lib/components/Verse.svelte';

	let { data }: PageProps = $props();

	const surah = $derived(data.surah);
	const isCurrent = $derived(player.surahNumber === surah.number);
	const isPlaying = $derived(isCurrent && player.status === 'playing');

	let downloaded = $state(false);
	let downloading = $state(false);
	let progress = $state(0);
	let downloadError = $state<string | null>(null);

	$effect(() => {
		const reciter = settings.reciter;
		const number = surah.number;
		const count = surah.verses.length;
		let stale = false;
		downloaded = false;
		isSurahDownloaded(reciter, number, count).then((result) => {
			if (!stale) downloaded = result;
		});
		return () => {
			stale = true;
		};
	});

	$effect(() => {
		if (isCurrent && player.verse) {
			document
				.getElementById(`verse-${player.verse}`)
				?.scrollIntoView({ block: 'center', behavior: 'smooth' });
		}
	});

	function togglePlayback() {
		if (isCurrent) player.toggle();
		else player.play(surah.number, 1);
	}

	async function download() {
		downloading = true;
		progress = 0;
		downloadError = null;
		try {
			await downloadSurahAudio(settings.reciter, surah.number, surah.verses.length, (fraction) => {
				progress = fraction;
			});
			downloaded = true;
		} catch {
			downloadError = 'Download failed. Check your connection and try again.';
		} finally {
			downloading = false;
		}
	}
</script>

<svelte:head>
	<title>{surah.name} · Ayah</title>
</svelte:head>

<a class="back" href={resolve('/')}>← Surahs</a>

<header class="surah-header">
	<p class="arabic title-ar">{surah.arabicName}</p>
	<h1>{surah.name}</h1>
	<p class="muted">
		{surah.meaning} · {revelationLabel(surah.revelation)} · {surah.verses.length} verses
	</p>
</header>

<div class="controls">
	<button
		class="btn primary"
		onclick={togglePlayback}
		disabled={isCurrent && player.status === 'loading'}
	>
		{#if isPlaying}
			Pause
		{:else if isCurrent && player.status === 'paused'}
			Resume
		{:else if isCurrent && player.status === 'loading'}
			Loading…
		{:else}
			Play surah
		{/if}
	</button>
	<button class="btn" onclick={download} disabled={downloading || downloaded}>
		{#if downloaded}
			Available offline
		{:else if downloading}
			Downloading {Math.round(progress * 100)}%
		{:else}
			Download for offline
		{/if}
	</button>
	<a class="reciter" href={resolve('/settings')}>Reciter: {settings.reciter.name}</a>
</div>

{#if downloadError}
	<p class="error" role="alert">{downloadError}</p>
{/if}

{#if showsBismillah(surah.number)}
	<p class="bismillah arabic">{BISMILLAH}</p>
{/if}

<div dir="rtl" lang="ar">
	{#each surah.verses as verse, index (index)}
		{@const number = index + 1}
		<Verse {verse} {number} {surah} {isCurrent}></Verse>

		<span class="marker">
			<span class="marker-number">
				{toArabicNumeral(number)}
			</span>
		</span>
	{/each}
</div>

<nav class="pager">
	{#if data.previous}
		<a href={resolve('/surah/[number]', { number: String(data.previous.number) })}
			>← {data.previous.name}</a
		>
	{:else}
		<span></span>
	{/if}
	{#if data.next}
		<a href={resolve('/surah/[number]', { number: String(data.next.number) })}>{data.next.name} →</a
		>
	{/if}
</nav>

<style>
	.back {
		display: inline-block;
		margin-bottom: 0.75rem;
		text-decoration: none;
		color: var(--muted);
	}

	.surah-header {
		text-align: center;
		margin-bottom: 1.25rem;
	}

	.surah-header h1 {
		font-size: 1.6rem;
		margin: 0.25rem 0;
	}

	.title-ar {
		font-size: 2.2rem;
		color: var(--gold);
		margin: 0;
	}

	.muted {
		color: var(--muted);
		font-size: 0.9rem;
		margin: 0;
	}

	.controls {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.5rem;
		margin-bottom: 1rem;
	}

	.reciter {
		margin-inline-start: auto;
		font-size: 0.9rem;
	}

	.error {
		color: #b3261e;
	}

	.bismillah {
		text-align: center;
		font-size: 1.8rem;
		color: var(--gold);
		margin: 1.5rem 0 1.5rem .5rem;
	}

	.verses {
		list-style: none;
		margin: 0;
		padding: 0;
		display: grid;
		gap: 0.5rem;
	}

	.verse {
		display: inline;
		border: none;
		background: transparent;
		font-size: 1.9rem;
		line-height: 2.3;
		cursor: pointer;
		box-decoration-break: clone;
		-webkit-box-decoration-break: clone;
		white-space: normal;
	}

	.verse.active {
		border-color: var(--accent);
		background: var(--accent-soft);
	}

	.marker {
		--n: '0';
		display: inline-block;
		position: relative;
		min-width: 1.5rem;
		height: 1.5rem;
		border: 1px solid var(--gold);
		border-radius: 50%;
		color: var(--gold);
		place-content: center;
	}

	.marker-number {
		content: var(--n);
		font-size: 0.95rem;
		line-height: 1;
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -55%);
	}

	.pager {
		display: flex;
		justify-content: space-between;
		gap: 1rem;
		margin-top: 2rem;
	}
</style> -->

<script lang="ts">
	let { data } = $props();

	let container: HTMLDivElement;
	let selectedAyah: { ayah: number; surah: number; el: SVGGeometryElement } | undefined = $state();

	$effect(() => {
		data.svgContent;

		if (!container) return;

		const svgElement = container.querySelector('svg');
		if (!svgElement) return;

		requestAnimationFrame(() => {
			try {
				const b = svgElement.getBBox();
				if (b.width > 0 && b.height > 0) {
					const p = Math.max(b.width, b.height) * 0.04;
					svgElement.setAttribute(
						'viewBox',
						`${b.x - p} ${b.y - p} ${b.width + p * 2} ${b.height + p * 2}`
					);
				}
			} catch {
				/* keep the declared viewBox */
			}
		});

		const pathElements = svgElement.querySelectorAll<SVGPathElement>('.ayahPolygon');
		const parsedPathElements = Array.from(pathElements).map(parseSVGPathElement);
		for (const { surah, ayah, el } of parsedPathElements) {
			el.style.cursor = 'pointer';
			el.setAttribute('fill', '#F9F05F');
			el.addEventListener('click', () => {
				console.log(surah, ayah);
				if (selectedAyah) dim(selectedAyah.el);
				selectedAyah = { surah, ayah, el };
				highlight(el);
			});
		}
	});

	const parseSVGPathElement = (p: SVGPathElement) => ({
		surah: Number(p.getAttribute('surah')),
		ayah: Number(p.getAttribute('ayah')),
		el: p
	});
	const highlight = (el: SVGPathElement) => {
		el.setAttribute('fill-opacity', '0.15');
	};
	const dim = (el: SVGPathElement) => {
		el.setAttribute('fill-opacity', '0');
	};
</script>

<div class="svg" bind:this={container}>
	{@html data.svgContent}
</div>

<style>
	.svg {
		width: 100%;
		height: auto;
		scale: 1;
	}
	.svg {
		color: #fff; /* TODO refactor into .dark and .light classes for svg */
	}
</style>
