import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { spacing } from '../theme';
import { EmptyState, Header, Screen, SegmentedControl } from '../components/ui';
import { EventListItem, TicketCard } from '../components/cards';
import { BOOKINGS } from '../data/bookings';
import { getEvent } from '../data/events';
import type { Booking, BookingStatus, EventItem } from '../data/types';
import { useLocale } from '../i18n/useLocale';
import { useApp } from '../state/AppProvider';
import { useAppNavigation } from '../navigation/types';
import type { MyEventsTab, RootStackParamList } from '../navigation/types';
import { BookingConfirmation } from './event/BookingConfirmation';
import { ConfirmDialog } from '../components/ui';

function synthBooking(event: EventItem, status: BookingStatus): Booking {
  const existing = BOOKINGS.find((b) => b.eventId === event.id);
  if (existing) return existing;
  return {
    id: `synth-${event.id}`,
    eventId: event.id,
    status,
    ticketType: { en: 'General Admission', az: 'Ümumi Giriş' },
    price: event.priceFrom,
    qr: `TOPLAS-${event.id}`,
    purchasedAt: '',
  };
}

export function MyEventsScreen() {
  const route = useRoute<RouteProp<RootStackParamList, 'MyEvents'>>();
  const navigation = useAppNavigation();
  const { t, L } = useLocale();
  const { savedEventIds, registeredEventIds, waitlistedEventIds } = useApp();

  const [tab, setTab] = useState<MyEventsTab>(route.params?.tab ?? 'upcoming');
  const [cancelId, setCancelId] = useState<string | null>(null);
  const [ticketEvent, setTicketEvent] = useState<EventItem | null>(null);
  const [cancelled, setCancelled] = useState<string[]>([]);

  const resolve = (ids: string[]) =>
    ids.map(getEvent).filter((e): e is EventItem => Boolean(e));

  const options = [
    { key: 'upcoming', label: t('myEvents.upcoming') },
    { key: 'past', label: t('myEvents.past') },
    { key: 'saved', label: t('myEvents.saved') },
    { key: 'waitlist', label: t('myEvents.waitlist') },
  ];

  const upcoming = resolve(registeredEventIds).filter((e) => !cancelled.includes(e.id));
  const waitlist = resolve(waitlistedEventIds);
  const saved = resolve(savedEventIds);
  const past = BOOKINGS.filter((b) => b.status === 'attended' || b.status === 'cancelled')
    .map((b) => ({ b, e: getEvent(b.eventId) }))
    .filter((x): x is { b: Booking; e: EventItem } => Boolean(x.e));

  const renderTickets = (events: EventItem[], status: BookingStatus) =>
    events.map((e) => {
      const booking = synthBooking(e, status);
      return (
        <TicketCard
          key={e.id}
          booking={{ ...booking, status }}
          event={e}
          onView={() => setTicketEvent(e)}
          onCancel={() => setCancelId(e.id)}
          onDirections={() => {}}
          onAddCalendar={() => {}}
        />
      );
    });

  return (
    <Screen scroll edges={['top']}>
      <Header title={t('myEvents.title')} onBack={() => navigation.goBack()} />
      <SegmentedControl options={options} value={tab} onChange={(k) => setTab(k as MyEventsTab)} />

      <View style={styles.list}>
        {tab === 'upcoming' &&
          (upcoming.length ? (
            renderTickets(upcoming, 'confirmed')
          ) : (
            <EmptyState
              icon="calendar-outline"
              title={t('myEvents.emptyUpcoming')}
              ctaLabel={t('myEvents.emptyUpcomingCta')}
              onCta={() => navigation.navigate('Tabs', { screen: 'Discover' })}
            />
          ))}

        {tab === 'waitlist' &&
          (waitlist.length ? (
            renderTickets(waitlist, 'waitlisted')
          ) : (
            <EmptyState icon="hourglass-outline" title={t('myEvents.emptyWaitlist')} />
          ))}

        {tab === 'saved' &&
          (saved.length ? (
            <View style={{ gap: spacing.md }}>
              {saved.map((e) => (
                <EventListItem key={e.id} event={e} onPress={() => navigation.navigate('EventDetails', { eventId: e.id })} />
              ))}
            </View>
          ) : (
            <EmptyState
              icon="bookmark-outline"
              title={t('myEvents.emptySaved')}
              hint={t('myEvents.emptySavedHint')}
            />
          ))}

        {tab === 'past' &&
          (past.length ? (
            past.map(({ b, e }) => (
              <TicketCard key={b.id} booking={b} event={e} onDirections={() => {}} onAddCalendar={() => {}} />
            ))
          ) : (
            <EmptyState icon="time-outline" title={t('myEvents.emptyPast')} />
          ))}
      </View>

      {ticketEvent && (
        <BookingConfirmation
          visible={!!ticketEvent}
          event={ticketEvent}
          onClose={() => setTicketEvent(null)}
          onViewEvents={() => setTicketEvent(null)}
        />
      )}

      <ConfirmDialog
        visible={!!cancelId}
        title={t('myEvents.cancelBooking')}
        body={cancelId ? L(getEvent(cancelId)?.title ?? '') : undefined}
        confirmLabel={t('myEvents.cancelBooking')}
        cancelLabel={t('common.cancel')}
        danger
        onCancel={() => setCancelId(null)}
        onConfirm={() => {
          if (cancelId) setCancelled((c) => [...c, cancelId]);
          setCancelId(null);
        }}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  list: { marginTop: spacing.lg, gap: spacing.md },
});
