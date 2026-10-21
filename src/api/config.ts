/**
 * Base URL for the Toplaş backend.
 * Override per environment with EXPO_PUBLIC_API_URL (inlined by Expo at build).
 * Defaults work for web and the iOS simulator. For Android emulator use
 * http://10.0.2.2:4000; for a physical device use your machine's LAN IP.
 */
export const API_URL = process.env.EXPO_PUBLIC_API_URL ?? 'http://localhost:4000';

/** How long to wait before falling back to local mock data (ms). */
export const API_TIMEOUT = 4000;
