import { Pressable, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { palette, radius, spacing } from '../../theme';
import { AppText, Badge, Icon, RemoteImage } from '../ui';
import { CATEGORY_META } from '../../data/categories';
import { formatDateTime, formatDistance, formatPrice } from '../../data/format';
import type { EventItem } from '../../data/types';
import { useLocale } from '../../i18n/useLocale';
import { useApp } from '../../state/AppProvider';

type EventListItemProps = {
  event: EventItem;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
};

export function EventListItem({ event, onPress, style }: EventListItemProps) {
  const { t, lang, L } = useLocale();
  const { isSaved, toggleSave } = useApp();
  const cat = CATEGORY_META[event.category];
  const saved = isSaved(event.id);
  const price = formatPrice(event.priceFrom);

  return (
    <Pressable onPress={onPress} style={[styles.row, style]} accessibilityRole="button">
      <RemoteImage uri={event.cover} radius={radius.md} style={styles.image} />
      <View style={styles.body}>
        <View style={styles.topLine}>
          <Badge label={t(`categories.${event.category}`)} icon={cat.icon} color={cat.color} />
          <Pressable onPress={() => toggleSave(event.id)} hitSlop={8} accessibilityRole="button">
            <Icon
              name={saved ? 'bookmark' : 'bookmark-outline'}
              size={16}
              color={saved ? palette.lavender : palette.textMuted}
            />
          </Pressable>
        </View>
        <AppText variant="cardTitle" numberOfLines={1} style={{ marginTop: 4 }}>
          {L(event.title)}
        </AppText>
        <AppText variant="meta" color={palette.textSecondary} numberOfLines={1} style={{ marginTop: 3 }}>
          {formatDateTime(event.start, lang)} · {L(event.venueName)}
        </AppText>
        <View style={styles.footer}>
          {price ? (
            <AppText variant="label" color={palette.lavender}>
              {t('common.priceFrom', { price: event.priceFrom })}
            </AppText>
          ) : (
            <AppText variant="label" color={palette.success}>
              {t('common.free')}
            </AppText>
          )}
          <View style={styles.dots}>
            {event.format !== 'online' && event.distanceKm > 0 && (
              <AppText variant="meta" color={palette.textMuted}>
                {formatDistance(event.distanceKm)}
              </AppText>
            )}
            {event.seatsLeft > 0 ? (
              <AppText variant="meta" color={palette.textMuted}>
                · {t('common.seatsLeft', { count: event.seatsLeft })}
              </AppText>
            ) : (
              <AppText variant="meta" color={palette.error}>
                · {t('common.soldOut')}
              </AppText>
            )}
          </View>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    backgroundColor: palette.card,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: palette.border,
    padding: spacing.sm,
  },
  image: { width: 92, height: 92, borderRadius: radius.md },
  body: { flex: 1, marginLeft: spacing.md, justifyContent: 'center' },
  topLine: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: spacing.sm,
  },
  dots: { flexDirection: 'row', alignItems: 'center', gap: 4 },
});
