import { ScrollView, StyleSheet, View } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { palette, spacing } from '../theme';
import {
  AppText,
  Avatar,
  Badge,
  Button,
  Card,
  Icon,
  IconButton,
  RemoteImage,
  SectionHeader,
} from '../components/ui';
import { EventListItem } from '../components/cards';
import { CATEGORY_META } from '../data/categories';
import { getCommunity } from '../data/communities';
import { getEvent } from '../data/events';
import { formatDateShort } from '../data/format';
import { useLocale } from '../i18n/useLocale';
import { useApp } from '../state/AppProvider';
import { useAppNavigation } from '../navigation/types';
import type { RootStackParamList } from '../navigation/types';

export function CommunityDetailsScreen() {
  const route = useRoute<RouteProp<RootStackParamList, 'CommunityDetails'>>();
  const navigation = useAppNavigation();
  const insets = useSafeAreaInsets();
  const { t, lang, L } = useLocale();
  const { isJoined, toggleJoin } = useApp();

  const community = getCommunity(route.params.communityId);
  if (!community) {
    return (
      <View style={styles.missing}>
        <AppText variant="body">Community not found</AppText>
      </View>
    );
  }

  const cat = CATEGORY_META[community.category];
  const joined = isJoined(community.id);
  const locked = (community.membership === 'private' || community.sensitive) && !joined;
  const events = community.upcomingEventIds.map(getEvent).filter((e): e is NonNullable<typeof e> => Boolean(e));

  const membershipLabel =
    community.membership === 'public'
      ? t('communities.public')
      : community.membership === 'private'
      ? t('communities.private')
      : t('communities.application');

  const joinLabel = joined
    ? t('communities.joined')
    : community.membership === 'public'
    ? t('communities.join')
    : t('communities.requestJoin');

  return (
    <View style={styles.root}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
        <View style={styles.hero}>
          <RemoteImage uri={community.cover} scrim style={StyleSheet.absoluteFill} />
          <View style={[styles.heroBar, { marginTop: insets.top + 8 }]}>
            <IconButton name="chevron-back" variant="glass" onPress={() => navigation.goBack()} accessibilityLabel={t('common.back')} />
            <IconButton name="ellipsis-horizontal" variant="glass" onPress={() => {}} accessibilityLabel={t('communities.report')} />
          </View>
        </View>

        <View style={styles.body}>
          <View style={styles.titleRow}>
            <View style={[styles.catDot, { backgroundColor: `${cat.color}26` }]}>
              <Icon name={cat.icon} size={22} color={cat.color} />
            </View>
            <View style={{ flex: 1, marginLeft: spacing.md }}>
              <AppText variant="title" numberOfLines={2}>
                {L(community.name)}
              </AppText>
              <View style={styles.subRow}>
                <Badge label={membershipLabel} icon={community.membership === 'private' ? 'lock-closed' : 'globe-outline'} color={palette.lavender} />
                {!community.sensitive && (
                  <AppText variant="meta" color={palette.textMuted}>
                    {t('common.members', { count: community.memberCount })}
                  </AppText>
                )}
              </View>
            </View>
          </View>

          <AppText variant="body" color={palette.textSecondary} style={{ marginTop: spacing.md }}>
            {L(community.description)}
          </AppText>

          <Button
            title={joinLabel}
            variant={joined ? 'secondary' : 'primary'}
            onPress={() => toggleJoin(community.id)}
            fullWidth
            icon={joined ? 'checkmark' : undefined}
            style={{ marginTop: spacing.lg }}
          />

          {/* Rules */}
          <SectionHeaderSpacer />
          <SectionHeader title={t('communities.rules')} />
          <Card padded>
            <View style={styles.ruleRow}>
              <Icon name="shield-checkmark-outline" size={18} color={palette.lavender} />
              <AppText variant="body" color={palette.textSecondary} style={{ marginLeft: spacing.sm, flex: 1 }}>
                {L(community.rules)}
              </AppText>
            </View>
          </Card>

          {locked ? (
            <Card padded style={{ marginTop: spacing.xl }}>
              <View style={styles.lockedRow}>
                <Icon name="lock-closed" size={20} color={palette.lavender} />
                <AppText variant="body" color={palette.textSecondary} style={{ marginLeft: spacing.sm, flex: 1 }}>
                  {t('communities.privateLocked')}
                </AppText>
              </View>
            </Card>
          ) : (
            <>
              {events.length > 0 && (
                <>
                  <SectionHeaderSpacer />
                  <SectionHeader title={t('communities.upcomingEvents')} />
                  <View style={{ gap: spacing.md }}>
                    {events.map((e) => (
                      <EventListItem key={e.id} event={e} onPress={() => navigation.navigate('EventDetails', { eventId: e.id })} />
                    ))}
                  </View>
                </>
              )}

              {community.announcements.length > 0 && (
                <>
                  <SectionHeaderSpacer />
                  <SectionHeader title={t('communities.announcements')} />
                  {community.announcements.map((a) => (
                    <Card key={a.id} padded style={{ marginBottom: spacing.md }}>
                      <View style={styles.announceHead}>
                        <Icon name="megaphone-outline" size={16} color={palette.magenta} />
                        <AppText variant="label" style={{ marginLeft: 6, flex: 1 }}>
                          {a.author}
                        </AppText>
                        <AppText variant="tiny" color={palette.textMuted}>
                          {formatDateShort(a.date, lang)}
                        </AppText>
                      </View>
                      <AppText variant="body" color={palette.textSecondary} style={{ marginTop: 6 }}>
                        {L(a.text)}
                      </AppText>
                    </Card>
                  ))}
                </>
              )}

              {community.posts.length > 0 && (
                <>
                  <SectionHeaderSpacer />
                  <SectionHeader title={t('communities.discussion')} />
                  {community.posts.map((p) => (
                    <Card key={p.id} padded style={{ marginBottom: spacing.md }}>
                      <View style={styles.postHead}>
                        <Avatar uri={p.avatar} size={36} />
                        <AppText variant="label" style={{ marginLeft: spacing.sm, flex: 1 }}>
                          {p.author}
                        </AppText>
                        <AppText variant="tiny" color={palette.textMuted}>
                          {formatDateShort(p.date, lang)}
                        </AppText>
                      </View>
                      <AppText variant="body" color={palette.textSecondary} style={{ marginTop: spacing.sm }}>
                        {L(p.text)}
                      </AppText>
                      <View style={styles.likeRow}>
                        <Icon name="heart-outline" size={15} color={palette.textMuted} />
                        <AppText variant="meta" color={palette.textMuted} style={{ marginLeft: 5 }}>
                          {p.likes}
                        </AppText>
                      </View>
                    </Card>
                  ))}
                </>
              )}
            </>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

function SectionHeaderSpacer() {
  return <View style={{ height: spacing.xl }} />;
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: palette.bg },
  missing: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: palette.bg },
  hero: { height: 200 },
  heroBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.xl,
  },
  body: { paddingHorizontal: spacing.xl, marginTop: spacing.lg },
  titleRow: { flexDirection: 'row', alignItems: 'center' },
  catDot: { width: 52, height: 52, borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
  subRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, marginTop: 6 },
  ruleRow: { flexDirection: 'row', alignItems: 'flex-start' },
  lockedRow: { flexDirection: 'row', alignItems: 'center' },
  announceHead: { flexDirection: 'row', alignItems: 'center' },
  postHead: { flexDirection: 'row', alignItems: 'center' },
  likeRow: { flexDirection: 'row', alignItems: 'center', marginTop: spacing.md },
});
