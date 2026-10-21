import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { palette, spacing } from '../theme';
import { AppText, Chip, EmptyState, Header, Screen } from '../components/ui';
import { NotificationRow } from '../components/cards';
import { NOTIFICATIONS } from '../data/notifications';
import type { AppNotification, NotificationCategory } from '../data/types';
import { useLocale } from '../i18n/useLocale';
import { useAppNavigation } from '../navigation/types';

type Filter = 'all' | NotificationCategory;

export function NotificationsScreen() {
  const { t } = useLocale();
  const navigation = useAppNavigation();
  const [items, setItems] = useState<AppNotification[]>(NOTIFICATIONS);
  const [filter, setFilter] = useState<Filter>('all');

  const filtered = useMemo(
    () => (filter === 'all' ? items : items.filter((n) => n.category === filter)),
    [items, filter]
  );

  const markAllRead = () => setItems((prev) => prev.map((n) => ({ ...n, read: true })));
  const markRead = (id: string) =>
    setItems((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));

  const filters: Filter[] = ['all', 'events', 'communities', 'messages', 'opportunities', 'bookings'];
  const label = (f: Filter) => (f === 'all' ? t('notifications.all') : t(`notifications.${f}`));

  return (
    <Screen scroll edges={['top']} padded={false}>
      <View style={styles.pad}>
        <Header
          title={t('notifications.title')}
          onBack={() => navigation.goBack()}
          right={
            <Pressable onPress={markAllRead} hitSlop={8} accessibilityRole="button">
              <AppText variant="meta" color={palette.lavender}>
                {t('notifications.markAllRead')}
              </AppText>
            </Pressable>
          }
        />
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.chips}
      >
        {filters.map((f) => (
          <Chip key={f} label={label(f)} selected={filter === f} onPress={() => setFilter(f)} />
        ))}
      </ScrollView>

      <View style={styles.pad}>
        {filtered.length === 0 ? (
          <EmptyState icon="notifications-outline" title={t('notifications.empty')} hint={t('notifications.emptyHint')} />
        ) : (
          <View style={{ marginTop: spacing.md }}>
            {filtered.map((n) => (
              <NotificationRow key={n.id} notification={n} onPress={() => markRead(n.id)} />
            ))}
          </View>
        )}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  pad: { paddingHorizontal: spacing.xl },
  chips: { paddingHorizontal: spacing.xl, gap: spacing.sm, marginTop: spacing.sm },
});
