import { Pressable, StyleSheet, View } from 'react-native';
import { palette, spacing } from '../../theme';
import { AppText, Icon } from '../ui';
import { formatDateShort, formatTime } from '../../data/format';
import type { AppNotification, NotificationCategory } from '../../data/types';
import { useLocale } from '../../i18n/useLocale';

const CATEGORY_COLOR: Record<NotificationCategory, string> = {
  events: '#8B5CF6',
  communities: '#A78BFA',
  messages: '#22D3EE',
  opportunities: '#E879F9',
  bookings: '#34D399',
};

type NotificationRowProps = {
  notification: AppNotification;
  onPress?: () => void;
};

export function NotificationRow({ notification, onPress }: NotificationRowProps) {
  const { lang, L } = useLocale();
  const color = CATEGORY_COLOR[notification.category];

  return (
    <Pressable
      onPress={onPress}
      style={[styles.row, !notification.read && styles.unread]}
      accessibilityRole="button"
    >
      <View style={[styles.iconWrap, { backgroundColor: `${color}26` }]}>
        <Icon name={notification.icon} size={18} color={color} />
      </View>
      <View style={styles.body}>
        <AppText variant="label" numberOfLines={1}>
          {L(notification.title)}
        </AppText>
        <AppText variant="meta" color={palette.textSecondary} numberOfLines={2} style={{ marginTop: 2 }}>
          {L(notification.body)}
        </AppText>
        <AppText variant="tiny" color={palette.textMuted} style={{ marginTop: 4 }}>
          {formatDateShort(notification.time, lang)} · {formatTime(notification.time)}
        </AppText>
      </View>
      {!notification.read && <View style={styles.dot} />}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    borderRadius: 16,
  },
  unread: { backgroundColor: palette.card },
  iconWrap: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  body: { flex: 1 },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: palette.violet,
    marginTop: 6,
    marginLeft: 6,
  },
});
