import { asset } from '$app/paths';
import type { Surah } from './types';

let surahs: Promise<Surah[]> | null = null;

export function loadQuran(fetcher: typeof fetch = fetch): Promise<Surah[]> {
	surahs ??= fetcher(asset('data/quran.json'))
		.then((res) => {
			if (!res.ok) throw new Error(`Failed to load Quran data (${res.status})`);
			return res.json() as Promise<{ surahs: Surah[] }>;
		})
		.then((data) => data.surahs)
		.catch((error) => {
			surahs = null;
			throw error;
		});
	return surahs;
}
