<script lang="ts">
	import { player } from '#lib/quran/player.svelte.ts';

	let {
		verse,
		isCurrent,
		surah,
		number
	}: { verse: string; isCurrent: boolean; surah: {number: number}; number: number } = $props();

	let tokens = $derived(verse.trim().split(' '));
</script>

<span>
	{#each tokens as token, index (index)}
		<button
			class="arabic"
			class:active={isCurrent && player.verse === number}
			class:rrc={index == 0}
			class:lrc={index == tokens.length - 1}
			onclick={() => player.play(surah.number, number)}
		>
			{token + (index < tokens.length ? ' ' : '')}
		</button>
	{/each}
</span>

<style>
	button {
		font-size: 1.5rem;
		border: none;
		background-color: transparent;
		padding: 0px 2px;
		margin: 0;
		padding-bottom: 1rem;
	}

	.rrc {
		border-radius: 0px 5px 5px 0px;
	}

	.lrc {
		border-radius: 5px 0px 0px 5px;
	}

	button.active {
		border-color: var(--accent);
		background: var(--accent-soft);
	}

	span {
		text-align: right;
	}
</style>
