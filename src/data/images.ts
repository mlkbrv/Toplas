/**
 * Centralized image URLs for mock content.
 *
 * Uses deterministic placeholder services so every image is guaranteed to
 * load in a frontend-only demo:
 *   - picsum.photos  → seeded photographs (event covers, business covers)
 *   - pravatar.cc    → seeded avatar faces (people, organizers)
 *
 * Swap these helpers for curated event photography without touching screens.
 * All imagery is sample/demo content, not tied to real listings.
 */

export function cover(seed: string, w = 1080, h = 720): string {
  return `https://picsum.photos/seed/toplas-${seed}/${w}/${h}`;
}

export function avatar(n: number): string {
  const id = ((n - 1) % 70) + 1;
  return `https://i.pravatar.cc/240?img=${id}`;
}

export function logo(seed: string): string {
  return `https://picsum.photos/seed/toplas-logo-${seed}/240/240`;
}
