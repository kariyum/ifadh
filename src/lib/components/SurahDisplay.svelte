<script lang="ts">
	import { toArabicNumeral } from "#lib/quran/format.ts";
	import { player } from "#lib/quran/player.svelte.ts";
	import type { Surah } from "#lib/quran/types.ts";
	import Verse from "./Verse.svelte";

    let {surah} : {surah: Surah} = $props();
    const isCurrent = $derived(player.surahNumber === surah.number);
</script>

<div dir="rtl" lang="ar">
    <div>
        {surah.arabicName}
    </div>
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
