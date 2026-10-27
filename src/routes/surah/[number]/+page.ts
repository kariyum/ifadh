// import { error } from '@sveltejs/kit';
// import { loadQuran } from '#lib/quran/data.js';
// import type { PageLoad } from './$types';
//
// export const load: PageLoad = async ({ params, fetch }) => {
// 	const number = Number(params.number);
// 	const surahs = await loadQuran(fetch);
// 	const surah = Number.isInteger(number) ? surahs[number - 1] : undefined;
// 	if (!surah) error(404, 'Surah not found');
//
// 	return {
// 		surah,
// 		previous: surahs[number - 2] ?? null,
// 		next: surahs[number] ?? null
// 	};
// };

import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const prerender = true;

export const load: PageLoad = async ({ fetch, params }) => {
    const surahNumber = params.number.padStart(3, '0');
    const res = await fetch(`/hafs-svg/svg/${surahNumber}.svg`);

    if (!res.ok) {
        throw error(404, `SVG icon "${surahNumber}" not found`);
    }

    let svgContent = await res.text();
    svgContent = svgContent.replace(/fill="[^"]*"/g, 'fill="currentColor"');
    return {
        surahNumber,
        svgContent
    };
};
