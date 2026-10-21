import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { palette, radius, spacing } from '../theme';
import {
  AppText,
  Avatar,
  Badge,
  Button,
  Card,
  Divider,
  IconButton,
  ListRow,
  Screen,
  SectionHeader,
  SegmentedControl,
} from '../components/ui';
import { CommunityCard, EventListItem } from '../components/cards';
import { CATEGORY_META } from '../data/categories';
import { CURRENT_USER } from '../data/users';
import { COMMUNITIES } from '../data/communities';
import { BOOKINGS, REVIEWS } from '../data/bookings';
import { getEvent } from '../data/events';
import { Icon } from '../components/ui';
import { useLocale } from '../i18n/useLocale';
import { useApp } from '../state/AppProvider';
import { useAppNavigation } from '../navigation/types';

type Tab = 'activity' | 'interests' | 'communities';

export function ProfileScreen() {
  const { t, L } = useLocale();
  const navigation = useAppNavigation();
  const { joinedCommunityIds } = useApp();
  const [tab, setTab] = useState<Tab>('activity');

  const attended = BOOKINGS.filter((b) => b.status === 'attended')
    .map((b) => getEvent(b.eventId))
    .filter((e): e is NonNullable<typeof e> => Boolean(e));
  const joined = COMMUNITIES.filter((c) => joinedCommunityIds.includes(c.id));

  const options = [
    { key: 'activity', label: t('profile.activity') },
    { key: 'interests', label: t('profile.interests') },
    { key: 'communities', label: t('profile.communities') },
  ];

  return (
    <Screen scroll>
      <View style={styles.topBar}>
        <IconButton name="share-social-outline" onPress={() => {}} accessibilityLabel={t('profile.shareProfile')} />
        <IconButton name="settings-outline" onPress={() => navigation.navigate('Settings')} accessibilityLabel={t('settings.title')} />
      </View>

      {/* Header */}
      <View style={styles.header}>
        <Avatar uri={CURRENT_USER.avatar} size={96} ring />
        <AppText variant="title" style={{ marginTop: spacing.md }}>
          {CURRENT_USER.name}
        </AppText>
        <View style={styles.cityRow}>
          <Icon name="location-outline" size={14} color={palette.textSecondary} />
          <AppText variant="meta" color={palette.textSecondary} style={{ marginLeft: 4 }}>
            {L(CURRENT_USER.city)}
          </AppText>
        </View>
        <AppText variant="body" color={palette.textSecondary} center style={{ marginTop: spacing.sm }}>
          {L(CURRENT_USER.bio)}
        </AppText>
        <View style={styles.actions}>
          <Button title={t('profile.editProfile')} variant="secondary" onPress={() => {}} style={{ flex: 1 }} />
          <Button title={t('profile.shareProfile')} onPress={() => {}} style={{ flex: 1 }} />
        </View>
      </View>

      {CURRENT_USER.isOrganizer && (
        <Button
          title={t('profile.organizerDashboard')}
          icon="speedometer-outline"
          variant="secondary"
          onPress={() => navigation.navigate('OrganizerDashboard')}
          style={{ marginTop: spacing.lg }}
        />
      )}

      {/* Tabs */}
      <View style={{ marginTop: spacing.xl }}>
        <SegmentedControl options={options} value={tab} onChange={(k) => setTab(k as Tab)} />
      </View>

      <View style={{ marginTop: spacing.lg }}>
        {tab === 'activity' && (
          <View style={{ gap: spacing.md }}>
            <AppText variant="label" color={palette.textSecondary}>
              {t('profile.hostedAttended')}
            </AppText>
            {attended.map((e) => (
              <EventListItem key={e.id} event={e} onPress={() => navigation.navigate('EventDetails', { eventId: e.id })} />
            ))}
            <SectionHeader title={t('profile.reviews')} />
            {REVIEWS.map((r) => (
              <Card key={r.id} padded>
                <View style={styles.reviewHead}>
                  <AppText variant="label" numberOfLines={1} style={{ flex: 1 }}>
                    {L(r.eventTitle)}
                  </AppText>
                  <View style={styles.stars}>
                    {Array.from({ length: r.rating }).map((_, i) => (
                      <Icon key={i} name="star" size={13} color={palette.warning} />
                    ))}
                  </View>
                </View>
                <AppText variant="meta" color={palette.textSecondary} style={{ marginTop: 6 }}>
                  {L(r.text)}
                </AppText>
              </Card>
            ))}
          </View>
        )}

        {tab === 'interests' && (
          <View>
            <AppText variant="label" color={palette.textSecondary}>
              {t('profile.interests')}
            </AppText>
            <View style={styles.tagRow}>
              {CURRENT_USER.interests.map((key) => (
                <Badge key={key} label={t(`categories.${key}`)} icon={CATEGORY_META[key].icon} color={CATEGORY_META[key].color} />
              ))}
            </View>
            <AppText variant="label" color={palette.textSecondary} style={{ marginTop: spacing.lg }}>
              {t('profile.skills')}
            </AppText>
            <View style={styles.tagRow}>
              {CURRENT_USER.skills.map((s) => (
                <Badge key={s} label={s} color={palette.lavender} />
              ))}
            </View>
            <AppText variant="label" color={palette.textSecondary} style={{ marginTop: spacing.lg }}>
              {t('profile.languages')}
            </AppText>
            <View style={styles.tagRow}>
              {CURRENT_USER.languages.map((l) => (
                <Badge key={l} label={l} icon="language-outline" color={palette.cyan} />
              ))}
            </View>
          </View>
        )}

        {tab === 'communities' && (
          <View style={{ gap: spacing.lg }}>
            {joined.map((c) => (
              <CommunityCard key={c.id} community={c} onPress={() => navigation.navigate('CommunityDetails', { communityId: c.id })} />
            ))}
          </View>
        )}
      </View>

      {/* Shortcuts */}
      <View style={styles.shortcuts}>
        <ListRow icon="calendar-outline" label={t('profile.myEvents')} onPress={() => navigation.navigate('MyEvents', { tab: 'upcoming' })} />
        <Divider />
        <ListRow icon="bookmark-outline" label={t('profile.savedEvents')} onPress={() => navigation.navigate('MyEvents', { tab: 'saved' })} />
        <Divider />
        <ListRow icon="ticket-outline" label={t('profile.tickets')} onPress={() => navigation.navigate('MyEvents', { tab: 'upcoming' })} />
        <Divider />
        <ListRow icon="people-outline" label={t('profile.myCommunities')} onPress={() => navigation.navigate('Tabs', { screen: 'Communities' })} />
        <Divider />
        <ListRow icon="gift-outline" label={t('profile.rewards')} onPress={() => navigation.navigate('BusinessProfile', { businessId: 'bz-brew' })} />
        <Divider />
        <ListRow icon="briefcase-outline" label={t('mentorship.title')} onPress={() => navigation.navigate('Opportunities')} />
        <Divider />
        <ListRow icon="settings-outline" label={t('profile.settings')} onPress={() => navigation.navigate('Settings')} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  topBar: { flexDirection: 'row', justifyContent: 'space-between' },
  header: { alignItems: 'center', marginTop: spacing.sm },
  cityRow: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
  actions: { flexDirection: 'row', gap: spacing.md, marginTop: spacing.lg, alignSelf: 'stretch' },
  reviewHead: { flexDirection: 'row', alignItems: 'center' },
  stars: { flexDirection: 'row', gap: 1, marginLeft: spacing.sm },
  tagRow: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm, marginTop: spacing.md },
  shortcuts: {
    marginTop: spacing.xl,
    backgroundColor: palette.card,
    borderRadius: radius.card,
    borderWidth: 1,
    borderColor: palette.border,
    paddingHorizontal: spacing.lg,
  },
});
