import { loadSurahs } from '#lib/quran/data.js';
import type { LayoutLoad } from './$types';

// Fully client-side: the service worker serves the app shell offline.
export const ssr = false;

export const load: LayoutLoad = async ({ fetch }) => {
	return { surahs: await loadSurahs(fetch) };
};
