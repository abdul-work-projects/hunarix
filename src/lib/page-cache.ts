// Module-level cache to track pages that have already loaded their data
// This persists across navigation since it's outside React's component lifecycle

const loadedPages = new Set<string>();

export function hasPageLoaded(pageKey: string): boolean {
  return loadedPages.has(pageKey);
}

export function markPageAsLoaded(pageKey: string): void {
  loadedPages.add(pageKey);
}
