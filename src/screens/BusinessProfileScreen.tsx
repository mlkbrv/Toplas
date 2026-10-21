import { useState } from 'react';
import { Image, Modal, ScrollView, StyleSheet, View } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { palette, radius, spacing } from '../theme';
import {
  AppText,
  Button,
  Card,
  Divider,
  Icon,
  IconButton,
  Rating,
  RemoteImage,
  SectionHeader,
} from '../components/ui';
import { EventListItem, RewardCard } from '../components/cards';
import { getBusiness } from '../data/businesses';
import { getEvent } from '../data/events';
import type { Reward } from '../data/types';
import { useLocale } from '../i18n/useLocale';
import { useApp } from '../state/AppProvider';
import { useAppNavigation } from '../navigation/types';
import type { RootStackParamList } from '../navigation/types';

export function BusinessProfileScreen() {
  const route = useRoute<RouteProp<RootStackParamList, 'BusinessProfile'>>();
  const navigation = useAppNavigation();
  const insets = useSafeAreaInsets();
  const { t, L } = useLocale();
  const { isFollowing, toggleFollow } = useApp();
  const [reward, setReward] = useState<Reward | null>(null);

  const business = getBusiness(route.params.businessId);
  if (!business) {
    return (
      <View style={styles.missing}>
        <AppText variant="body">Business not found</AppText>
      </View>
    );
  }

  const following = isFollowing(business.id);
  const events = business.upcomingEventIds.map(getEvent).filter((e): e is NonNullable<typeof e> => Boolean(e));

  return (
    <View style={styles.root}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
        <View style={styles.hero}>
          <RemoteImage uri={business.cover} scrim style={StyleSheet.absoluteFill} />
          <View style={[styles.heroBar, { marginTop: insets.top + 8 }]}>
            <IconButton name="chevron-back" variant="glass" onPress={() => navigation.goBack()} accessibilityLabel={t('common.back')} />
          </View>
        </View>

        <View style={styles.body}>
          <View style={styles.headRow}>
            <Image source={{ uri: business.logo }} style={styles.logo} />
            <View style={{ flex: 1, marginLeft: spacing.md }}>
              <View style={styles.nameRow}>
                <AppText variant="title" numberOfLines={1} style={{ flexShrink: 1 }}>
                  {business.name}
                </AppText>
                {business.verified && <Icon name="checkmark-circle" size={18} color={palette.violet} style={{ marginLeft: 6 }} />}
              </View>
              <View style={styles.subRow}>
                <Rating value={business.rating} count={business.reviewCount} />
                <AppText variant="meta" color={palette.textMuted}>
                  · {t('business.followers', { count: business.followers })}
                </AppText>
              </View>
            </View>
          </View>

          <Button
            title={following ? t('business.following') : t('business.follow')}
            variant={following ? 'secondary' : 'primary'}
            icon={following ? 'checkmark' : 'add'}
            onPress={() => toggleFollow(business.id)}
            fullWidth
            style={{ marginTop: spacing.lg }}
          />

          <AppText variant="body" color={palette.textSecondary} style={{ marginTop: spacing.lg }}>
            {L(business.description)}
          </AppText>

          <Card padded style={{ marginTop: spacing.lg }}>
            <View style={styles.infoRow}>
              <Icon name="time-outline" size={16} color={palette.lavender} />
              <AppText variant="meta" color={palette.textSecondary} style={{ marginLeft: spacing.sm }}>
                {L(business.hours)}
              </AppText>
            </View>
            <Divider style={{ marginVertical: spacing.sm }} />
            <View style={styles.infoRow}>
              <Icon name="location-outline" size={16} color={palette.lavender} />
              <AppText variant="meta" color={palette.textSecondary} style={{ marginLeft: spacing.sm }}>
                {business.address}
              </AppText>
            </View>
          </Card>

          {business.rewards.length > 0 && (
            <View style={styles.section}>
              <SectionHeader title={t('business.offers')} />
              <View style={{ gap: spacing.md }}>
                {business.rewards.map((r) => (
                  <RewardCard key={r.id} reward={r} onRedeem={() => setReward(r)} />
                ))}
              </View>
            </View>
          )}

          {events.length > 0 && (
            <View style={styles.section}>
              <SectionHeader title={t('business.upcoming')} />
              <View style={{ gap: spacing.md }}>
                {events.map((e) => (
                  <EventListItem key={e.id} event={e} onPress={() => navigation.navigate('EventDetails', { eventId: e.id })} />
                ))}
              </View>
            </View>
          )}
        </View>
      </ScrollView>

      <Modal visible={!!reward} transparent animationType="fade" onRequestClose={() => setReward(null)}>
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <Icon name="gift" size={28} color={palette.magenta} />
            <AppText variant="section" center style={{ marginTop: spacing.sm }}>
              {reward ? L(reward.title) : ''}
            </AppText>
            <View style={styles.codeBox}>
              <AppText variant="title" color={palette.lavender}>
                {reward?.code}
              </AppText>
            </View>
            <AppText variant="meta" color={palette.textMuted} center>
              {t('business.showCode')}
            </AppText>
            <Button title={t('common.close')} variant="secondary" onPress={() => setReward(null)} fullWidth style={{ marginTop: spacing.lg }} />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: palette.bg },
  missing: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: palette.bg },
  hero: { height: 180 },
  heroBar: { paddingHorizontal: spacing.xl },
  body: { paddingHorizontal: spacing.xl, marginTop: -30 },
  headRow: { flexDirection: 'row', alignItems: 'flex-end' },
  logo: {
    width: 72,
    height: 72,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: palette.bg,
    backgroundColor: palette.surface,
  },
  nameRow: { flexDirection: 'row', alignItems: 'center' },
  subRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 4 },
  infoRow: { flexDirection: 'row', alignItems: 'center' },
  section: { marginTop: spacing.xl },
  modalBackdrop: { flex: 1, backgroundColor: palette.overlay, alignItems: 'center', justifyContent: 'center', padding: spacing.xl },
  modalCard: {
    width: '100%',
    maxWidth: 340,
    backgroundColor: palette.bgSecondary,
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: palette.border,
    padding: spacing.xl,
    alignItems: 'center',
  },
  codeBox: {
    marginVertical: spacing.lg,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xxl,
    borderRadius: radius.md,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: palette.borderStrong,
    backgroundColor: palette.surface,
  },
});
