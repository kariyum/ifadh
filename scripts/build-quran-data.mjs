// Builds static/data/quran.json from quran.com (Arabic text in Uthmani script).
// Run with: node scripts/build-quran-data.mjs

import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const outFile = join(root, 'static', 'data', 'quran.json');

async function getJson(url) {
	const res = await fetch(url);
	if (!res.ok) throw new Error(`${url} -> ${res.status}`);
	return res.json();
}

const [chaptersRes, versesRes] = await Promise.all([
	getJson('https://api.quran.com/api/v4/chapters?language=en'),
	getJson('https://api.quran.com/api/v4/quran/verses/uthmani')
]);

const arabicByKey = new Map(versesRes.verses.map((v) => [v.verse_key, v.text_uthmani]));

const surahs = chaptersRes.chapters.map((chapter) => {
	const verses = [];
	for (let n = 1; n <= chapter.verses_count; n++) {
		const ar = arabicByKey.get(`${chapter.id}:${n}`);
		if (!ar) throw new Error(`Missing text for ${chapter.id}:${n}`);
		verses.push(ar);
	}
	return {
		number: chapter.id,
		name: chapter.name_simple,
		arabicName: chapter.name_arabic,
		meaning: chapter.translated_name.name,
		revelation: chapter.revelation_place,
		verses
	};
});

const total = surahs.reduce((sum, s) => sum + s.verses.length, 0);
if (total !== 6236) throw new Error(`Expected 6236 verses, got ${total}`);

await mkdir(dirname(outFile), { recursive: true });
await writeFile(outFile, JSON.stringify({ surahs }));
console.log(`Wrote ${surahs.length} surahs, ${total} verses to ${outFile}`);
