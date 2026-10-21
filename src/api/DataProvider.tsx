import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { api } from './client';
import { EVENTS as LOCAL_EVENTS } from '../data/events';
import { COMMUNITIES as LOCAL_COMMUNITIES } from '../data/communities';
import type { Community, EventItem } from '../data/types';

type DataContextValue = {
  /** true once the backend answered; false while loading or when offline. */
  backendOnline: boolean;
  loading: boolean;
  events: EventItem[];
  communities: Community[];
};

const DataContext = createContext<DataContextValue | undefined>(undefined);

/**
 * Loads catalog data from the backend once at startup and shares it app-wide.
 * If the backend is unreachable, the app transparently uses local mock data,
 * so it always runs — with or without the server.
 */
export function DataProvider({ children }: { children: React.ReactNode }) {
  const [events, setEvents] = useState<EventItem[] | null>(null);
  const [communities, setCommunities] = useState<Community[] | null>(null);
  const [backendOnline, setBackendOnline] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    Promise.all([api.events(), api.communities()])
      .then(([ev, cm]) => {
        if (!mounted) return;
        setEvents(ev);
        setCommunities(cm);
        setBackendOnline(true);
      })
      .catch(() => {
        if (mounted) setBackendOnline(false);
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, []);

  const value = useMemo<DataContextValue>(
    () => ({
      backendOnline,
      loading,
      events: events ?? LOCAL_EVENTS,
      communities: communities ?? LOCAL_COMMUNITIES,
    }),
    [backendOnline, loading, events, communities]
  );

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

function useData(): DataContextValue {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error('useData must be used within DataProvider');
  return ctx;
}

/** Events from the backend when available, otherwise local mock. */
export function useEvents(): EventItem[] {
  return useData().events;
}

/** Communities from the backend when available, otherwise local mock. */
export function useCommunities(): Community[] {
  return useData().communities;
}

/** Whether catalog data is currently served by the live backend. */
export function useBackendStatus(): { online: boolean; loading: boolean } {
  const { backendOnline, loading } = useData();
  return { online: backendOnline, loading };
}
