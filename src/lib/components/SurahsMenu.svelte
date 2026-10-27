<script lang="ts">
	import { resolve } from '$app/paths';
	import { revelationLabel } from '#lib/quran/format.js';
	import type { PageProps } from '../../routes/$types';

	let { data }: PageProps = $props();

	let query = $state('');

	const filtered = $derived.by(() => {
		const q = query.trim().toLowerCase();
		if (!q) return data.surahs;
		return data.surahs.filter(
			(s) =>
				String(s.number) === q ||
				s.name.toLowerCase().includes(q) ||
				s.meaning.toLowerCase().includes(q) ||
				s.arabicName.includes(query.trim())
		);
	});
</script>
<h1>Surahs</h1>

<input
	class="search"
	type="search"
	placeholder="Search by name, meaning or number"
	bind:value={query}
	aria-label="Search surahs"
/>

<ol class="surah-list">
	{#each filtered as surah (surah.number)}
		<li>
			<a href={resolve('/surah/[number]', { number: String(surah.number) })}>
				<span class="number">{surah.number}</span>
				<span class="names">
					<strong>{surah.name}</strong>
					<span class="muted"
						>{surah.meaning} · {revelationLabel(surah.revelation)} · {surah.verses.length} verses</span
					>
				</span>
				<span class="arabic name-ar">{surah.arabicName}</span>
			</a>
		</li>
	{:else}
		<li class="muted empty">No surah matches "{query}".</li>
	{/each}
</ol>

<style>
	h1 {
		font-size: 1.6rem;
		margin: 0.5rem 0 1rem;
	}

	.search {
		width: 100%;
		padding: 0.7rem 1rem;
		border: 1px solid var(--border);
		border-radius: 12px;
		background: var(--surface);
		margin-bottom: 1rem;
	}

	.surah-list {
		list-style: none;
		margin: 0;
		padding: 0;
		display: grid;
		gap: 0.5rem;
	}

	.surah-list a {
		display: flex;
		align-items: center;
		gap: 1rem;
		padding: 0.8rem 1rem;
		background: var(--surface);
		border: 1px solid var(--border);
		border-radius: 12px;
		text-decoration: none;
		color: var(--text);
	}

	.surah-list a:hover {
		border-color: var(--accent);
	}

	.number {
		display: grid;
		place-items: center;
		width: 2.2rem;
		height: 2.2rem;
		border-radius: 50%;
		background: var(--accent-soft);
		color: var(--accent);
		font-weight: 600;
		font-size: 0.9rem;
		flex-shrink: 0;
	}

	.names {
		display: flex;
		flex-direction: column;
		flex: 1;
		min-width: 0;
	}

	.name-ar {
		font-size: 1.4rem;
		color: var(--gold);
	}

	.muted {
		color: var(--muted);
		font-size: 0.85rem;
	}

	.empty {
		padding: 1rem;
	}
</style>
