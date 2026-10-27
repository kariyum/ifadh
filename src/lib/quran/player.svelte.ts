import { browser } from '$app/env';
import { settings } from '#lib/stores/settings.svelte.js';
import { cacheVerseAudio, getVerseAudioSource, verseAudioUrl } from './audio';
import { loadQuran } from './data';

export type PlayerStatus = 'idle' | 'loading' | 'playing' | 'paused';

const SURAH_COUNT = 114;

class Player {
	surahNumber = $state<number | null>(null);
	verse = $state(0);
	status = $state<PlayerStatus>('idle');
	error = $state<string | null>(null);

	#audio: HTMLAudioElement | null = null;
	#objectUrl: string | null = null;
	#token = 0;

	constructor() {
		if (browser) {
			this.#audio = new Audio();
			this.#audio.addEventListener('ended', () => this.next(true));
		}
	}

	async play(surahNumber: number, verse: number) {
		const audio = this.#audio;
		if (!audio) return;

		const token = ++this.#token;
		this.surahNumber = surahNumber;
		this.verse = verse;
		this.status = 'loading';
		this.error = null;

		try {
			const url = verseAudioUrl(settings.reciter, surahNumber, verse);
			const source = await getVerseAudioSource(url);
			if (token !== this.#token) {
				if (source.objectUrl) URL.revokeObjectURL(source.src);
				return;
			}

			this.#releaseObjectUrl();
			if (source.objectUrl) this.#objectUrl = source.src;
			audio.src = source.src;
			await audio.play();
			this.status = 'playing';
			this.#prefetchNext();
		} catch {
			if (token !== this.#token) return;
			this.status = 'idle';
			this.error = navigator.onLine
				? 'Could not play this verse.'
				: 'This verse is not downloaded and you are offline.';
		}
	}

	pause() {
		if (!this.#audio || this.status !== 'playing') return;
		this.#audio.pause();
		this.status = 'paused';
	}

	async resume() {
		if (!this.#audio || this.surahNumber === null) return;
		if (this.status === 'paused') {
			await this.#audio.play();
			this.status = 'playing';
		} else if (this.status === 'idle') {
			await this.play(this.surahNumber, Math.max(this.verse, 1));
		}
	}

	toggle() {
		if (this.status === 'playing') this.pause();
		else void this.resume();
	}

	async next(auto = false) {
		const position = await this.#position(1);
		if (!position) return this.stop();
		if (auto && !settings.autoContinue && position.surah !== this.surahNumber) return this.stop();
		await this.play(position.surah, position.verse);
	}

	async previous() {
		const position = await this.#position(-1);
		if (position) await this.play(position.surah, position.verse);
	}

	stop() {
		this.#token++;
		this.#audio?.pause();
		this.#releaseObjectUrl();
		this.surahNumber = null;
		this.verse = 0;
		this.status = 'idle';
		this.error = null;
	}

	// Position after (step = 1) or before (step = -1) the current verse, crossing surah boundaries.
	async #position(step: 1 | -1) {
		if (this.surahNumber === null) return null;
		const surahs = await loadQuran();
		const surah = surahs[this.surahNumber - 1];
		const nextVerse = this.verse + step;

		if (nextVerse >= 1 && nextVerse <= surah.verses.length) {
			return { surah: surah.number, verse: nextVerse };
		}
		const targetSurah = surah.number + step;
		if (targetSurah < 1 || targetSurah > SURAH_COUNT) return null;
		const target = surahs[targetSurah - 1];
		return { surah: target.number, verse: step === 1 ? 1 : target.verses.length };
	}

	async #prefetchNext() {
		const position = await this.#position(1);
		if (!position) return;
		cacheVerseAudio(verseAudioUrl(settings.reciter, position.surah, position.verse)).catch(
			() => {}
		);
	}

	#releaseObjectUrl() {
		if (this.#objectUrl) {
			URL.revokeObjectURL(this.#objectUrl);
			this.#objectUrl = null;
		}
	}
}

export const player = new Player();
