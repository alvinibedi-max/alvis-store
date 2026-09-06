const HISTORY_KEY = 'alvis_browsing_history';
const SEARCH_KEY = 'alvis_search_history';
const MAX_ITEMS = 50;

export function trackProductView(product: any) {
  if (!product || !product.id) return;
  try {
    const history = JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]');
    const filtered = history.filter((h: any) => h.id !== product.id);
    filtered.unshift({id: product.id, name: product.name, category: product.category, brand: product.brand, timestamp: Date.now()});
    localStorage.setItem(HISTORY_KEY, JSON.stringify(filtered.slice(0, MAX_ITEMS)));
  } catch {}
}

export function trackSearch(query: string) {
  if (!query || !query.trim()) return;
  try {
    const searches = JSON.parse(localStorage.getItem(SEARCH_KEY) || '[]');
    const filtered = searches.filter((s: any) => s.query.toLowerCase() !== query.toLowerCase());
    filtered.unshift({query: query.trim(), timestamp: Date.now()});
    localStorage.setItem(SEARCH_KEY, JSON.stringify(filtered.slice(0, 20)));
  } catch {}
}

export function getBrowsingHistory() {
  try { return JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]'); } catch { return []; }
}

export function getSearchHistory() {
  try { return JSON.parse(localStorage.getItem(SEARCH_KEY) || '[]'); } catch { return []; }
}

export function getRecommendedCategory() {
  const history = getBrowsingHistory();
  if (history.length === 0) return null;
  const counts: Record<string, number> = {};
  history.forEach((h: any) => { if (h.category) counts[h.category] = (counts[h.category] || 0) + 1; });
  const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
  return sorted.length > 0 ? sorted[0][0] : null;
}

export function getRecommendedCategories(limit = 2) {
  const history = getBrowsingHistory();
  if (history.length === 0) return [];
  const counts: Record<string, number> = {};
  history.forEach((h: any) => { if (h.category) counts[h.category] = (counts[h.category] || 0) + 1; });
  return Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, limit).map(([cat]) => cat);
}

export function getRecentlyViewedIds(limit = 4) {
  return getBrowsingHistory().slice(0, limit).map((h: any) => h.id);
}

export function getTopSearchTerms(limit = 3) {
  return getSearchHistory().slice(0, limit).map((s: any) => s.query);
}

export function hasBrowsingHistory() {
  return getBrowsingHistory().length > 0;
}
