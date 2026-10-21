import { Pressable, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { palette, radius, spacing } from '../../theme';
import { AppText, Badge, Button, Icon, RemoteImage } from '../ui';
import { CATEGORY_META } from '../../data/categories';
import type { Community } from '../../data/types';
import { useLocale } from '../../i18n/useLocale';
import { useApp } from '../../state/AppProvider';

type CommunityCardProps = {
  community: Community;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
};

export function CommunityCard({ community, onPress, style }: CommunityCardProps) {
  const { t, L } = useLocale();
  const { isJoined, toggleJoin } = useApp();
  const cat = CATEGORY_META[community.category];
  const joined = isJoined(community.id);

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
    <Pressable onPress={onPress} style={[styles.card, style]} accessibilityRole="button">
      <RemoteImage uri={community.cover} radius={radius.lg} scrim style={styles.cover} />
      <View style={styles.coverContent}>
        <Badge label={membershipLabel} variant="glass" icon={community.membership === 'private' ? 'lock-closed' : 'globe-outline'} />
      </View>
      <View style={styles.body}>
        <View style={styles.titleRow}>
          <View style={[styles.catDot, { backgroundColor: `${cat.color}26` }]}>
            <Icon name={cat.icon} size={16} color={cat.color} />
          </View>
          <AppText variant="cardTitle" numberOfLines={1} style={{ flex: 1 }}>
            {L(community.name)}
          </AppText>
        </View>
        <AppText variant="meta" color={palette.textSecondary} numberOfLines={2} style={{ marginTop: 6 }}>
          {L(community.description)}
        </AppText>
        <View style={styles.footer}>
          <View style={styles.members}>
            <Icon name="people-outline" size={14} color={palette.textMuted} />
            <AppText variant="meta" color={palette.textMuted} style={{ marginLeft: 5 }}>
              {community.sensitive ? '—' : t('common.members', { count: community.memberCount })}
            </AppText>
          </View>
          <Button
            title={joinLabel}
            variant={joined ? 'secondary' : 'primary'}
            size="md"
            onPress={() => toggleJoin(community.id)}
            style={styles.joinBtn}
          />
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: palette.card,
    borderRadius: radius.card,
    borderWidth: 1,
    borderColor: palette.border,
    overflow: 'hidden',
  },
  cover: { height: 96 },
  coverContent: { position: 'absolute', top: spacing.md, left: spacing.md },
  body: { padding: spacing.lg },
  titleRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  catDot: {
    width: 32,
    height: 32,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: spacing.lg,
  },
  members: { flexDirection: 'row', alignItems: 'center' },
  joinBtn: { minWidth: 110, height: 40 },
});
