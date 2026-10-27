import type { PageLoad } from './$types';

// The surah list comes from the layout load, so there is nothing else to fetch here.
export const load: PageLoad = ({ parent }) => parent();
