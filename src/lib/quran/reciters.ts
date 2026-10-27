import type { Reciter, ReciterId } from './types';

// Folder names are the everyayah.com subfolders (https://everyayah.com/data/).
export const reciters: Reciter[] = [
	{ id: 'sudais', name: 'Abdurrahmaan As-Sudais', folder: 'Abdurrahmaan_As-Sudais_192kbps' },
	{ id: 'ali-jaber', name: 'Ali Jaber', folder: 'Ali_Jaber_64kbps' }
];

export function getReciter(id: ReciterId): Reciter {
	return reciters.find((r) => r.id === id) ?? reciters[0];
}
