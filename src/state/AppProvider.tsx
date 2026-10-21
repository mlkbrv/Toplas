import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { BOOKINGS } from '../data/bookings';
import { COMMUNITIES } from '../data/communities';
import { BUSINESSES } from '../data/businesses';
import { api } from '../api/client';

/** Fire a backend call without blocking the UI; ignore failures (offline demo). */
const sync = (p: Promise<unknown>) => {
  p.catch(() => {});
};

type AppState = {
  savedEventIds: string[];
  registeredEventIds: string[];
  waitlistedEventIds: string[];
  joinedCommunityIds: string[];
  followedIds: string[];
  isOrganizerMode: boolean;
  isSaved: (id: string) => boolean;
  toggleSave: (id: string) => void;
  isRegistered: (id: string) => boolean;
  register: (id: string) => void;
  joinWaitlist: (id: string) => void;
  isJoined: (id: string) => boolean;
  toggleJoin: (id: string) => void;
  isFollowing: (id: string) => boolean;
  toggleFollow: (id: string) => void;
  setOrganizerMode: (on: boolean) => void;
};

const AppContext = createContext<AppState | undefined>(undefined);

const seededRegistered = BOOKINGS.filter(
  (b) => b.status === 'confirmed' || b.status === 'pending'
).map((b) => b.eventId);

const seededWaitlist = BOOKINGS.filter((b) => b.status === 'waitlisted').map((b) => b.eventId);

const seededCommunities = COMMUNITIES.filter((c) => c.joined).map((c) => c.id);

const seededFollowed = BUSINESSES.filter((b) => b.following).map((b) => b.id);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [savedEventIds, setSaved] = useState<string[]>(['ev-jazz', 'ev-hackathon']);
  const [registeredEventIds, setRegistered] = useState<string[]>(seededRegistered);
  const [waitlistedEventIds, setWaitlisted] = useState<string[]>(seededWaitlist);
  const [joinedCommunityIds, setJoined] = useState<string[]>(seededCommunities);
  const [followedIds, setFollowed] = useState<string[]>(seededFollowed);
  const [isOrganizerMode, setOrganizerMode] = useState(false);

  const toggle = (setter: React.Dispatch<React.SetStateAction<string[]>>, id: string) =>
    setter((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  const add = (setter: React.Dispatch<React.SetStateAction<string[]>>, id: string) =>
    setter((prev) => (prev.includes(id) ? prev : [...prev, id]));

  const isSaved = useCallback((id: string) => savedEventIds.includes(id), [savedEventIds]);
  const toggleSave = useCallback((id: string) => {
    toggle(setSaved, id);
    sync(api.toggleSave(id));
  }, []);

  const isRegistered = useCallback(
    (id: string) => registeredEventIds.includes(id),
    [registeredEventIds]
  );
  const register = useCallback((id: string) => {
    add(setRegistered, id);
    sync(api.createBooking(id));
  }, []);
  const joinWaitlist = useCallback((id: string) => {
    add(setWaitlisted, id);
    sync(api.createBooking(id));
  }, []);

  const isJoined = useCallback((id: string) => joinedCommunityIds.includes(id), [joinedCommunityIds]);
  const toggleJoin = useCallback((id: string) => {
    toggle(setJoined, id);
    sync(api.toggleJoin(id));
  }, []);

  const isFollowing = useCallback((id: string) => followedIds.includes(id), [followedIds]);
  const toggleFollow = useCallback((id: string) => toggle(setFollowed, id), []);

  const value = useMemo<AppState>(
    () => ({
      savedEventIds,
      registeredEventIds,
      waitlistedEventIds,
      joinedCommunityIds,
      followedIds,
      isOrganizerMode,
      isSaved,
      toggleSave,
      isRegistered,
      register,
      joinWaitlist,
      isJoined,
      toggleJoin,
      isFollowing,
      toggleFollow,
      setOrganizerMode,
    }),
    [
      savedEventIds,
      registeredEventIds,
      waitlistedEventIds,
      joinedCommunityIds,
      followedIds,
      isOrganizerMode,
      isSaved,
      toggleSave,
      isRegistered,
      register,
      joinWaitlist,
      isJoined,
      toggleJoin,
      isFollowing,
      toggleFollow,
    ]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp(): AppState {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
