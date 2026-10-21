import { Pressable, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { palette, radius, shadow, spacing } from '../../theme';
import { AppText, Badge, Icon, RemoteImage } from '../ui';
import { CATEGORY_META } from '../../data/categories';
import { formatDateTime, formatPrice } from '../../data/format';
import type { EventItem } from '../../data/types';
import { useLocale } from '../../i18n/useLocale';
import { useApp } from '../../state/AppProvider';

type EventCardProps = {
  event: EventItem;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
};

export function EventCard({ event, onPress, style }: EventCardProps) {
  const { t, lang, L } = useLocale();
  const { isSaved, toggleSave } = useApp();
  const cat = CATEGORY_META[event.category];
  const saved = isSaved(event.id);
  const price = formatPrice(event.priceFrom);

  return (
    <Pressable onPress={onPress} style={[styles.card, style]} accessibilityRole="button">
      <View style={styles.imageWrap}>
        <RemoteImage uri={event.cover} radius={radius.lg} style={styles.image} />
        <Badge
          label={t(`categories.${event.category}`)}
          icon={cat.icon}
          color={cat.color}
          variant="glass"
          style={styles.catBadge}
        />
        <Pressable
          style={styles.save}
          onPress={() => toggleSave(event.id)}
          hitSlop={8}
          accessibilityRole="button"
          accessibilityLabel={saved ? t('common.saved') : t('common.save')}
        >
          <Icon
            name={saved ? 'bookmark' : 'bookmark-outline'}
            size={16}
            color={saved ? palette.lavender : palette.white}
          />
        </Pressable>
      </View>

      <View style={styles.body}>
        <AppText variant="cardTitle" numberOfLines={1}>
          {L(event.title)}
        </AppText>
        <View style={styles.metaRow}>
          <Icon name="calendar-outline" size={13} color={palette.textSecondary} />
          <AppText variant="meta" color={palette.textSecondary} numberOfLines={1} style={styles.metaText}>
            {formatDateTime(event.start, lang)}
          </AppText>
        </View>
        <View style={styles.metaRow}>
          <Icon name="location-outline" size={13} color={palette.textSecondary} />
          <AppText variant="meta" color={palette.textSecondary} numberOfLines={1} style={styles.metaText}>
            {L(event.venueName)}
          </AppText>
        </View>
        <View style={styles.footer}>
          {price ? (
            <AppText variant="label" color={palette.lavender}>
              {t('common.priceFrom', { price: event.priceFrom })}
            </AppText>
          ) : (
            <Badge label={t('common.free')} color={palette.success} />
          )}
          <View style={styles.going}>
            <Icon name="people-outline" size={13} color={palette.textMuted} />
            <AppText variant="meta" color={palette.textMuted} style={{ marginLeft: 4 }}>
              {event.goingCount}
            </AppText>
          </View>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 268,
    backgroundColor: palette.card,
    borderRadius: radius.card,
    borderWidth: 1,
    borderColor: palette.border,
    overflow: 'hidden',
    ...shadow.card,
  },
  imageWrap: { height: 150, margin: 6, marginBottom: 0 },
  image: { flex: 1 },
  catBadge: { position: 'absolute', top: 10, left: 10 },
  save: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(11,9,20,0.55)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: { padding: spacing.md },
  metaRow: { flexDirection: 'row', alignItems: 'center', marginTop: 5 },
  metaText: { marginLeft: 6, flex: 1 },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: spacing.md,
  },
  going: { flexDirection: 'row', alignItems: 'center' },
});
