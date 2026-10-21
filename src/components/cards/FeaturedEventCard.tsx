import { Pressable, StyleSheet, View } from 'react-native';
import { palette, radius, shadow, spacing } from '../../theme';
import { AppText, Avatar, Badge, Button, Icon, RemoteImage } from '../ui';
import { CATEGORY_META } from '../../data/categories';
import { formatDateTime, formatPrice } from '../../data/format';
import { getOrganizer } from '../../data/organizers';
import type { EventItem } from '../../data/types';
import { useLocale } from '../../i18n/useLocale';
import { useApp } from '../../state/AppProvider';

type FeaturedEventCardProps = {
  event: EventItem;
  onPress: () => void;
};

export function FeaturedEventCard({ event, onPress }: FeaturedEventCardProps) {
  const { t, lang, L } = useLocale();
  const { isSaved, toggleSave } = useApp();
  const cat = CATEGORY_META[event.category];
  const organizer = getOrganizer(event.organizerId);
  const saved = isSaved(event.id);
  const price = formatPrice(event.priceFrom);

  return (
    <View style={styles.card}>
      <RemoteImage uri={event.cover} scrim radius={radius.card} style={StyleSheet.absoluteFill} />

      <View style={styles.topRow}>
        <Badge label={t('common.featured')} variant="gradient" icon="sparkles" />
        <Pressable
          style={styles.save}
          onPress={() => toggleSave(event.id)}
          hitSlop={8}
          accessibilityRole="button"
          accessibilityLabel={saved ? t('common.saved') : t('common.save')}
        >
          <Icon
            name={saved ? 'bookmark' : 'bookmark-outline'}
            size={18}
            color={saved ? palette.lavender : palette.white}
          />
        </Pressable>
      </View>

      <View style={styles.bottom}>
        <Badge label={t(`categories.${event.category}`)} icon={cat.icon} color={cat.color} variant="glass" />
        <AppText variant="headline" style={{ marginTop: spacing.sm }}>
          {L(event.title)}
        </AppText>
        <AppText variant="bodyMedium" color={palette.textSecondary} numberOfLines={1} style={{ marginTop: 4 }}>
          {L(event.summary)}
        </AppText>

        <View style={styles.metaRow}>
          <Icon name="calendar-outline" size={14} color={palette.lavender} />
          <AppText variant="meta" color={palette.text} style={styles.metaText}>
            {formatDateTime(event.start, lang)}
          </AppText>
          <Icon name="location-outline" size={14} color={palette.lavender} style={{ marginLeft: spacing.md }} />
          <AppText variant="meta" color={palette.text} numberOfLines={1} style={styles.metaText}>
            {L(event.venueName)}
          </AppText>
        </View>

        <View style={styles.footer}>
          <View style={styles.org}>
            {organizer && <Avatar uri={organizer.avatar} size={28} verified={organizer.verified} />}
            <View style={{ marginLeft: spacing.sm }}>
              <AppText variant="tiny" color={palette.textSecondary}>
                {t('event.organizer')}
              </AppText>
              <AppText variant="label" numberOfLines={1}>
                {organizer?.name}
              </AppText>
            </View>
          </View>
          <AppText variant="cardTitle" color={palette.lavender}>
            {price ? t('common.priceFrom', { price: event.priceFrom }) : t('common.free')}
          </AppText>
        </View>

        <Button title={t('discover.exploreEvent')} onPress={onPress} iconRight="arrow-forward" style={{ marginTop: spacing.lg }} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    height: 400,
    borderRadius: radius.card,
    borderWidth: 1,
    borderColor: palette.borderStrong,
    overflow: 'hidden',
    justifyContent: 'space-between',
    ...shadow.glowViolet,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.lg,
  },
  save: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(11,9,20,0.5)',
    borderWidth: 1,
    borderColor: palette.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottom: { padding: spacing.xl },
  metaRow: { flexDirection: 'row', alignItems: 'center', marginTop: spacing.md },
  metaText: { marginLeft: 6, flexShrink: 1 },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: spacing.lg,
  },
  org: { flexDirection: 'row', alignItems: 'center', flex: 1 },
});
