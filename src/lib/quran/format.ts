export const BISMILLAH = 'بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ';

// Surahs 1 (Al-Fatihah, where it is verse 1) and 9 (At-Tawbah) have no separate basmala.
export function showsBismillah(surahNumber: number) {
	return surahNumber !== 1 && surahNumber !== 9;
}

export function toArabicNumeral(n: number) {
	return n.toLocaleString('ar-EG');
}

export function revelationLabel(place: 'makkah' | 'madinah') {
	return place === 'makkah' ? 'Meccan' : 'Medinan';
}
