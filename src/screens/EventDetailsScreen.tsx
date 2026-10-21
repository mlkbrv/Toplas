import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { palette, spacing } from '../theme';
import {
  AppText,
  Avatar,
  AvatarStack,
  Badge,
  Button,
  Card,
  Divider,
  Icon,
  IconButton,
  Rating,
  RemoteImage,
} from '../components/ui';
import { EventCard, StylizedMap } from '../components/cards';
import { CATEGORY_META } from '../data/categories';
import { getEvent, eventsByOrganizer } from '../data/events';
import { getOrganizer } from '../data/organizers';
import { getSpeaker } from '../data/speakers';
import { attendeesFor } from '../data/users';
import { formatDateLong, formatPrice, formatTime } from '../data/format';
import { useLocale } from '../i18n/useLocale';
import { useApp } from '../state/AppProvider';
import { useAppNavigation } from '../navigation/types';
import type { RootStackParamList } from '../navigation/types';
import { BookingConfirmation } from './event/BookingConfirmation';

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View style={{ marginTop: spacing.xl }}>
      <AppText variant="section" style={{ marginBottom: spacing.sm }}>
        {title}
      </AppText>
      {children}
    </View>
  );
}

export function EventDetailsScreen() {
  const route = useRoute<RouteProp<RootStackParamList, 'EventDetails'>>();
  const navigation = useAppNavigation();
  const insets = useSafeAreaInsets();
  const { t, lang, L } = useLocale();
  const { isSaved, toggleSave, isRegistered, register, joinWaitlist, waitlistedEventIds } = useApp();

  const [confirm, setConfirm] = useState<{ visible: boolean; waitlist: boolean }>({
    visible: false,
    waitlist: false,
  });

  const event = getEvent(route.params.eventId);
  if (!event) {
    return (
      <View style={styles.missing}>
        <AppText variant="body">Event not found</AppText>
      </View>
    );
  }

  const cat = CATEGORY_META[event.category];
  const organizer = getOrganizer(event.organizerId);
  const price = formatPrice(event.priceFrom);
  const registered = isRegistered(event.id);
  const onWaitlist = waitlistedEventIds.includes(event.id);
  const full = event.seatsLeft <= 0;
  const saved = isSaved(event.id);
  const attendees = attendeesFor(event.attendeeIds);
  const showSocial = !event.sensitive && event.showAttendees && attendees.length > 0;
  const otherEvents = organizer ? eventsByOrganizer(organizer.id).filter((e) => e.id !== event.id) : [];

  const formatLabel =
    event.format === 'online' ? t('common.online') : event.format === 'hybrid' ? t('common.hybrid') : t('common.inPerson');
  const langLabel =
    event.eventLanguage === 'both' ? 'EN / AZ' : event.eventLanguage === 'az' ? 'Azərbaycan' : 'English';

  const onCta = () => {
    if (registered) {
      setConfirm({ visible: true, waitlist: false });
      return;
    }
    if (full) {
      joinWaitlist(event.id);
      setConfirm({ visible: true, waitlist: true });
      return;
    }
    register(event.id);
    setConfirm({ visible: true, waitlist: false });
  };

  const ctaLabel = registered
    ? t('myEvents.viewTicket')
    : full
    ? t('event.joinWaitlist')
    : price
    ? t('event.getTicket')
    : t('event.reserveSpot');

  return (
    <View style={styles.root}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>
        {/* Hero */}
        <View style={styles.hero}>
          <RemoteImage uri={event.cover} scrim style={StyleSheet.absoluteFill} />
          <View style={[styles.heroBar, { marginTop: insets.top + 8 }]}>
            <IconButton name="chevron-back" variant="glass" onPress={() => navigation.goBack()} accessibilityLabel={t('common.back')} />
            <View style={styles.heroActions}>
              <IconButton name="share-social-outline" variant="glass" onPress={() => {}} accessibilityLabel={t('common.share')} />
              <IconButton
                name={saved ? 'bookmark' : 'bookmark-outline'}
                variant="glass"
                color={saved ? palette.lavender : palette.white}
                onPress={() => toggleSave(event.id)}
                accessibilityLabel={t('common.save')}
              />
            </View>
          </View>
          <View style={styles.heroBottom}>
            <Badge label={t(`categories.${event.category}`)} icon={cat.icon} color={cat.color} variant="glass" />
          </View>
        </View>

        <View style={styles.body}>
          <AppText variant="headline">{L(event.title)}</AppText>
          <AppText variant="bodyMedium" color={palette.textSecondary} style={{ marginTop: 6 }}>
            {L(event.summary)}
          </AppText>

          {/* Meta */}
          <Card padded style={{ marginTop: spacing.lg }}>
            <MetaRow icon="calendar-outline" label={formatDateLong(event.start, lang)} sub={`${formatTime(event.start)}${event.end ? ` – ${formatTime(event.end)}` : ''}`} />
            <Divider style={styles.metaDiv} />
            <MetaRow icon="location-outline" label={L(event.venueName)} sub={event.address} />
            <Divider style={styles.metaDiv} />
            <View style={styles.metaChips}>
              <Badge label={formatLabel} icon="globe-outline" color={palette.cyan} />
              <Badge label={langLabel} icon="language-outline" color={palette.lavender} />
              {!event.sensitive && (
                <Badge
                  label={full ? t('common.soldOut') : t('common.seatsLeft', { count: event.seatsLeft })}
                  icon="people-outline"
                  color={full ? palette.error : palette.success}
                />
              )}
            </View>
          </Card>

          <Section title={t('event.about')}>
            <AppText variant="body" color={palette.textSecondary}>
              {L(event.description)}
            </AppText>
          </Section>

          <Section title={t('event.experience')}>
            <AppText variant="body" color={palette.textSecondary}>
              {L(event.experience)}
            </AppText>
          </Section>

          {event.agenda.length > 0 && (
            <Section title={t('event.agenda')}>
              <View style={{ gap: spacing.sm }}>
                {event.agenda.map((a, i) => (
                  <View key={i} style={styles.agendaRow}>
                    <View style={styles.agendaTime}>
                      <AppText variant="label" color={palette.lavender}>
                        {a.time}
                      </AppText>
                    </View>
                    <AppText variant="body" style={{ flex: 1 }}>
                      {L(a.title)}
                    </AppText>
                  </View>
                ))}
              </View>
            </Section>
          )}

          {event.speakerIds.length > 0 && (
            <Section title={t('event.speakers')}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: spacing.md }}>
                {event.speakerIds.map((id) => {
                  const sp = getSpeaker(id);
                  if (!sp) return null;
                  return (
                    <View key={id} style={styles.speaker}>
                      <Avatar uri={sp.avatar} size={56} />
                      <AppText variant="label" center numberOfLines={1} style={{ marginTop: 6 }}>
                        {sp.name}
                      </AppText>
                      <AppText variant="tiny" color={palette.textMuted} center numberOfLines={2}>
                        {L(sp.role)}
                      </AppText>
                    </View>
                  );
                })}
              </ScrollView>
            </Section>
          )}

          <Section title={t('event.whoShould')}>
            <AppText variant="body" color={palette.textSecondary}>
              {L(event.whoShould)}
            </AppText>
          </Section>

          <Section title={t('event.requirements')}>
            <AppText variant="body" color={palette.textSecondary}>
              {L(event.requirements)}
            </AppText>
          </Section>

          {/* Social proof */}
          {showSocial ? (
            <Section title={t('event.social')}>
              <Card padded>
                <View style={styles.socialRow}>
                  <AvatarStack uris={attendees.map((a) => a.avatar)} size={36} max={5} extraCount={Math.max(0, event.goingCount - attendees.length)} />
                  <AppText variant="label" style={{ marginLeft: spacing.md, flex: 1 }}>
                    {t('common.going', { count: event.goingCount })}
                  </AppText>
                </View>
                <Button title={t('event.findCompanion')} variant="secondary" icon="person-add-outline" onPress={() => {}} style={{ marginTop: spacing.md }} />
              </Card>
            </Section>
          ) : event.sensitive ? (
            <Card padded style={{ marginTop: spacing.xl }}>
              <View style={styles.privacyRow}>
                <Icon name="lock-closed-outline" size={18} color={palette.lavender} />
                <AppText variant="meta" color={palette.textSecondary} style={{ marginLeft: spacing.sm, flex: 1 }}>
                  {event.sensitive ? t('event.privacyNote') : ''}
                </AppText>
              </View>
            </Card>
          ) : null}

          {/* Venue */}
          <Section title={t('event.venue')}>
            {event.format === 'online' ? (
              <Card padded>
                <View style={styles.onlineRow}>
                  <Icon name="videocam-outline" size={18} color={palette.cyan} />
                  <AppText variant="body" style={{ marginLeft: spacing.sm, flex: 1 }}>
                    {L(event.venueName)}
                  </AppText>
                </View>
              </Card>
            ) : (
              <>
                <StylizedMap events={[event]} selectedId={event.id} onSelect={() => {}} height={160} />
                <View style={styles.venueFoot}>
                  <AppText variant="meta" color={palette.textSecondary} style={{ flex: 1 }}>
                    {event.address}
                  </AppText>
                  <Button title={t('event.getDirections')} variant="secondary" size="md" icon="navigate-outline" onPress={() => {}} />
                </View>
              </>
            )}
          </Section>

          {/* Organizer */}
          {organizer && (
            <Section title={t('event.organizer')}>
              <Card padded onPress={() => organizer.isBusiness && navigation.navigate('BusinessProfile', { businessId: 'bz-pulse' })}>
                <View style={styles.orgRow}>
                  <Avatar uri={organizer.avatar} size={48} verified={organizer.verified} />
                  <View style={{ flex: 1, marginLeft: spacing.md }}>
                    <AppText variant="cardTitle">{organizer.name}</AppText>
                    {organizer.reviewCount > 0 && <Rating value={organizer.rating} count={organizer.reviewCount} />}
                  </View>
                </View>
              </Card>
              {otherEvents.length > 0 && (
                <>
                  <AppText variant="label" color={palette.textSecondary} style={{ marginTop: spacing.lg, marginBottom: spacing.sm }}>
                    {t('event.otherEvents')}
                  </AppText>
                  <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: spacing.md }}>
                    {otherEvents.map((e) => (
                      <EventCard key={e.id} event={e} onPress={() => navigation.push('EventDetails', { eventId: e.id })} />
                    ))}
                  </ScrollView>
                </>
              )}
            </Section>
          )}
        </View>
      </ScrollView>

      {/* Sticky CTA */}
      <View style={[styles.cta, { paddingBottom: insets.bottom + spacing.md }]}>
        <View style={styles.ctaPrice}>
          <AppText variant="title" color={palette.text}>
            {price ? `₼${event.priceFrom}` : t('common.free')}
          </AppText>
          <AppText variant="meta" color={full ? palette.error : palette.textSecondary}>
            {registered ? t('myEvents.confirmed') : onWaitlist ? t('myEvents.waitlisted') : full ? t('common.soldOut') : t('common.seatsLeft', { count: event.seatsLeft })}
          </AppText>
        </View>
        <Button title={ctaLabel} onPress={onCta} size="lg" style={{ flex: 1 }} />
      </View>

      <BookingConfirmation
        visible={confirm.visible}
        event={event}
        waitlist={confirm.waitlist}
        onClose={() => setConfirm((c) => ({ ...c, visible: false }))}
        onViewEvents={() => {
          setConfirm((c) => ({ ...c, visible: false }));
          navigation.navigate('MyEvents', { tab: confirm.waitlist ? 'waitlist' : 'upcoming' });
        }}
      />
    </View>
  );
}

function MetaRow({ icon, label, sub }: { icon: string; label: string; sub?: string }) {
  return (
    <View style={styles.metaRow}>
      <Icon name={icon} size={18} color={palette.lavender} />
      <View style={{ flex: 1, marginLeft: spacing.md }}>
        <AppText variant="bodyMedium">{label}</AppText>
        {sub ? (
          <AppText variant="meta" color={palette.textSecondary} style={{ marginTop: 2 }}>
            {sub}
          </AppText>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: palette.bg },
  missing: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: palette.bg },
  hero: { height: 340 },
  heroBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.xl,
  },
  heroActions: { flexDirection: 'row', gap: spacing.sm },
  heroBottom: { position: 'absolute', left: spacing.xl, bottom: spacing.lg },
  body: { paddingHorizontal: spacing.xl, marginTop: spacing.lg },
  metaRow: { flexDirection: 'row', alignItems: 'center' },
  metaDiv: { marginVertical: spacing.md },
  metaChips: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  agendaRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  agendaTime: {
    width: 76,
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 10,
    backgroundColor: palette.surface,
    alignItems: 'center',
  },
  speaker: { width: 96, alignItems: 'center' },
  socialRow: { flexDirection: 'row', alignItems: 'center' },
  privacyRow: { flexDirection: 'row', alignItems: 'center' },
  onlineRow: { flexDirection: 'row', alignItems: 'center' },
  venueFoot: { flexDirection: 'row', alignItems: 'center', marginTop: spacing.md, gap: spacing.md },
  orgRow: { flexDirection: 'row', alignItems: 'center' },
  cta: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.lg,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.md,
    backgroundColor: palette.bgSecondary,
    borderTopWidth: 1,
    borderTopColor: palette.border,
  },
  ctaPrice: {},
});
