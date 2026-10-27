<script lang="ts">
	import type { Surah } from '#lib/quran/types.ts';
	import SurahDisplay from './SurahDisplay.svelte';

	let { surahs }: { surahs: Surah[] } = $props();
</script>

<div class="quran">
	{#each surahs as s, index (index)}
		<div class="surah">
			<SurahDisplay surah={s}></SurahDisplay>
		</div>
	{/each}
</div>

<style>
	.surah {
		width: 100%;
		min-width: 100%;
		scroll-snap-align: center;
		overflow: auto;
	}

	.quran {
		display: flex;
		scroll-snap-type: x mandatory;
		scroll-behavior: smooth;
		gap: 1rem;
		&::-webkit-scrollbar {
			display: none;
		}
	}
</style>
