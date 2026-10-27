<script lang="ts">
	import { reciters } from '#lib/quran/reciters.js';
	import { settings } from '#lib/stores/settings.svelte.js';
</script>

<svelte:head>
	<title>Settings · Ayah</title>
</svelte:head>

<h1>Settings</h1>

<section>
	<h2>Reciter</h2>
	<div class="options" role="radiogroup" aria-label="Reciter">
		{#each reciters as reciter (reciter.id)}
			<label class="option" class:selected={settings.reciterId === reciter.id}>
				<input
					type="radio"
					name="reciter"
					value={reciter.id}
					checked={settings.reciterId === reciter.id}
					onchange={() => settings.setReciter(reciter.id)}
				/>
				<span>{reciter.name}</span>
			</label>
		{/each}
	</div>
	<p class="muted">Audio for each verse is saved on your device the first time you play it.</p>
</section>

<section>
	<h2>Playback</h2>
	<label class="toggle">
		<input
			type="checkbox"
			checked={settings.autoContinue}
			onchange={(event) => settings.setAutoContinue(event.currentTarget.checked)}
		/>
		<span>Continue to the next surah when one finishes</span>
	</label>
</section>

<style>
	h1 {
		font-size: 1.6rem;
		margin: 0.5rem 0 1rem;
	}

	h2 {
		font-size: 1.1rem;
		margin: 0 0 0.5rem;
	}

	section {
		margin-bottom: 2rem;
	}

	.options {
		display: grid;
		gap: 0.5rem;
	}

	.option,
	.toggle {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		padding: 0.8rem 1rem;
		background: var(--surface);
		border: 1px solid var(--border);
		border-radius: 12px;
		cursor: pointer;
	}

	.option.selected {
		border-color: var(--accent);
		background: var(--accent-soft);
	}

	.muted {
		color: var(--muted);
		font-size: 0.9rem;
	}
</style>
