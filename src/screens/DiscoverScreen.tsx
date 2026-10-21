import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { palette, spacing } from '../theme';
import {
  AppText,
  Avatar,
  AvatarStack,
  Chip,
  Icon,
  Screen,
  SearchBar,
  SectionHeader,
} from '../components/ui';
import { EventCard, EventListItem, FeaturedEventCard } from '../components/cards';
import { CATEGORY_META, DISCOVER_CATEGORY_KEYS } from '../data/categories';
import { FEATURED_EVENT } from '../data/events';
import { CURRENT_USER, ATTENDEES } from '../data/users';
import { NOTIFICATIONS } from '../data/notifications';
import type { CategoryKey } from '../data/types';
import { useLocale } from '../i18n/useLocale';
import { useEvents, useBackendStatus } from '../api/DataProvider';
import { useAppNavigation } from '../navigation/types';
import { SurpriseCard } from './discover/SurpriseCard';

export function DiscoverScreen() {
  const { t, L } = useLocale();
  const navigation = useAppNavigation();
  const events = useEvents();
  const { online, loading } = useBackendStatus();
  const [cat, setCat] = useState<CategoryKey | 'all'>('all');

  const greetKey = useMemo(() => {
    const hour = new Date().getHours();
    if (hour < 12) return 'discover.greetingMorning';
    if (hour < 18) return 'discover.greetingAfternoon';
    return 'discover.greetingEvening';
  }, []);

  const unread = NOTIFICATIONS.filter((n) => !n.read).length;

  const recommended = useMemo(
    () => events.filter((e) => (cat === 'all' ? true : e.category === cat)).slice(0, 8),
    [cat, events]
  );
  const nearby = useMemo(
    () =>
      events
        .filter((e) => e.format !== 'online' && e.distanceKm > 0)
        .sort((a, b) => a.distanceKm - b.distanceKm)
        .slice(0, 4),
    [events]
  );
  const weekend = useMemo(
    () =>
      events
        .filter((e) => {
          const day = new Date(e.start).getDay();
          return day === 0 || day === 6;
        })
        .slice(0, 6),
    [events]
  );
  const goingAvatars = ATTENDEES.map((a) => a.avatar);

  const openEvent = (id: string) => navigation.navigate('EventDetails', { eventId: id });

  const chips: (CategoryKey | 'all')[] = ['all', ...DISCOVER_CATEGORY_KEYS];

  return (
    <Screen scroll>
      {/* Header */}
      <View style={styles.topRow}>
        <Pressable style={styles.city} accessibilityRole="button">
          <Icon name="location" size={15} color={palette.lavender} />
          <AppText variant="label" style={{ marginHorizontal: 5 }}>
            {L(CURRENT_USER.city)}
          </AppText>
          <Icon name="chevron-down" size={14} color={palette.textSecondary} />
        </Pressable>
        <View style={styles.topActions}>
          {!loading && (
            <View style={styles.status}>
              <View
                style={[styles.statusDot, { backgroundColor: online ? palette.success : palette.textMuted }]}
              />
              <AppText variant="tiny" color={online ? palette.success : palette.textMuted}>
                {online ? 'Live' : 'Demo'}
              </AppText>
            </View>
          )}
          <Pressable
            style={styles.bell}
            onPress={() => navigation.navigate('Notifications')}
            accessibilityRole="button"
            accessibilityLabel={t('notifications.title')}
          >
            <Icon name="notifications-outline" size={20} color={palette.text} />
            {unread > 0 && <View style={styles.bellDot} />}
          </Pressable>
          <Pressable
            onPress={() => navigation.navigate('Tabs', { screen: 'Profile' })}
            accessibilityRole="button"
          >
            <Avatar uri={CURRENT_USER.avatar} size={40} ring />
          </Pressable>
        </View>
      </View>

      <AppText variant="headline" style={{ marginTop: spacing.lg }}>
        {t(greetKey as never, { name: CURRENT_USER.name })}
      </AppText>
      <AppText variant="body" color={palette.textSecondary} style={{ marginTop: 4 }}>
        {t('discover.subtitle')}
      </AppText>

      <View style={{ marginTop: spacing.lg }}>
        <SearchBar
          placeholder={t('discover.searchPlaceholder')}
          onPress={() => navigation.navigate('Search')}
          onFilterPress={() => navigation.navigate('Search')}
        />
      </View>

      {/* Category chips */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.chips}
        style={{ marginTop: spacing.lg, marginHorizontal: -spacing.xl }}
      >
        {chips.map((key) => (
          <Chip
            key={key}
            label={key === 'all' ? t('categories.all') : t(`categories.${key}`)}
            icon={key === 'all' ? undefined : CATEGORY_META[key].icon}
            color={key === 'all' ? palette.violet : CATEGORY_META[key].color}
            selected={cat === key}
            onPress={() => setCat(key)}
          />
        ))}
      </ScrollView>

      {/* Featured */}
      <View style={{ marginTop: spacing.xl }}>
        <FeaturedEventCard event={FEATURED_EVENT} onPress={() => openEvent(FEATURED_EVENT.id)} />
      </View>

      {/* Recommended */}
      <View style={styles.section}>
        <SectionHeader
          title={t('discover.recommended')}
          actionLabel={t('common.seeAll')}
          onAction={() => navigation.navigate('Tabs', { screen: 'Explore' })}
        />
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.carousel}
        style={{ marginHorizontal: -spacing.xl }}
      >
        {recommended.map((ev) => (
          <EventCard key={ev.id} event={ev} onPress={() => openEvent(ev.id)} />
        ))}
      </ScrollView>

      {/* Near you */}
      <View style={styles.section}>
        <SectionHeader title={t('discover.nearby')} />
        <View style={{ gap: spacing.md }}>
          {nearby.map((ev) => (
            <EventListItem key={ev.id} event={ev} onPress={() => openEvent(ev.id)} />
          ))}
        </View>
      </View>

      {/* People going */}
      <Pressable
        style={styles.people}
        onPress={() => navigation.navigate('Search')}
        accessibilityRole="button"
      >
        <AvatarStack uris={goingAvatars} size={36} max={5} />
        <View style={styles.peopleText}>
          <AppText variant="cardTitle">{t('discover.peopleGoing')}</AppText>
          <AppText variant="meta" color={palette.textSecondary} style={{ marginTop: 2 }}>
            {t('discover.peopleGoingSubtitle')}
          </AppText>
        </View>
        <Icon name="arrow-forward" size={18} color={palette.lavender} />
      </Pressable>

      {/* This weekend */}
      <View style={styles.section}>
        <SectionHeader title={t('discover.weekend')} />
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.carousel}
        style={{ marginHorizontal: -spacing.xl }}
      >
        {weekend.map((ev) => (
          <EventCard key={ev.id} event={ev} onPress={() => openEvent(ev.id)} />
        ))}
      </ScrollView>

      {/* Surprise me */}
      <View style={styles.section}>
        <SurpriseCard onPress={() => navigation.navigate('SurpriseMe')} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  topRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  city: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: palette.surface,
    paddingHorizontal: spacing.md,
    paddingVertical: 8,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: palette.border,
  },
  topActions: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  status: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 10,
    height: 28,
    borderRadius: 999,
    backgroundColor: palette.surface,
    borderWidth: 1,
    borderColor: palette.border,
  },
  statusDot: { width: 7, height: 7, borderRadius: 4 },
  bell: {
    width: 40,
    height: 40,
    borderRadius: 14,
    backgroundColor: palette.surface,
    borderWidth: 1,
    borderColor: palette.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bellDot: {
    position: 'absolute',
    top: 9,
    right: 10,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: palette.magenta,
    borderWidth: 1.5,
    borderColor: palette.bg,
  },
  chips: { paddingHorizontal: spacing.xl, gap: spacing.sm },
  carousel: { paddingHorizontal: spacing.xl, gap: spacing.md },
  section: { marginTop: spacing.xxl },
  people: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.xxl,
    padding: spacing.lg,
    backgroundColor: palette.card,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: palette.border,
    gap: spacing.md,
  },
  peopleText: { flex: 1 },
});
