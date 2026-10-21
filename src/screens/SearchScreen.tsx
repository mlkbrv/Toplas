import { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { palette, spacing } from '../theme';
import { AppText, Chip, Icon, IconButton, SearchBar, SectionHeader } from '../components/ui';
import { EventListItem, CommunityCard } from '../components/cards';
import { CATEGORY_META, DISCOVER_CATEGORY_KEYS } from '../data/categories';
import { EVENTS } from '../data/events';
import { COMMUNITIES } from '../data/communities';
import { useLocale } from '../i18n/useLocale';
import { useAppNavigation } from '../navigation/types';

const RECENT = ['AI', 'Jazz', 'Hackathon', 'Yoga'];

export function SearchScreen() {
  const { t, L } = useLocale();
  const navigation = useAppNavigation();
  const insets = useSafeAreaInsets();
  const [query, setQuery] = useState('');

  const q = query.trim().toLowerCase();

  const eventResults = useMemo(() => {
    if (!q) return [];
    return EVENTS.filter(
      (e) =>
        L(e.title).toLowerCase().includes(q) ||
        L(e.summary).toLowerCase().includes(q) ||
        e.tags.some((tag) => tag.toLowerCase().includes(q))
    );
  }, [q, L]);

  const communityResults = useMemo(() => {
    if (!q) return [];
    return COMMUNITIES.filter((c) => L(c.name).toLowerCase().includes(q));
  }, [q, L]);

  const hasResults = eventResults.length > 0 || communityResults.length > 0;

  return (
    <View style={[styles.root, { paddingTop: insets.top + 8 }]}>
      <View style={styles.header}>
        <View style={{ flex: 1 }}>
          <SearchBar
            placeholder={t('discover.searchPlaceholder')}
            value={query}
            onChangeText={setQuery}
            autoFocus
          />
        </View>
        <IconButton name="close" onPress={() => navigation.goBack()} accessibilityLabel={t('common.close')} />
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {!q ? (
          <>
            <SectionHeader title={t('common.search')} />
            <View style={styles.chips}>
              {RECENT.map((r) => (
                <Chip key={r} label={r} icon="time-outline" onPress={() => setQuery(r)} />
              ))}
            </View>
            <View style={{ height: spacing.xl }} />
            <SectionHeader title={t('discover.recommended')} />
            <View style={styles.chips}>
              {DISCOVER_CATEGORY_KEYS.map((key) => (
                <Chip
                  key={key}
                  label={t(`categories.${key}`)}
                  icon={CATEGORY_META[key].icon}
                  color={CATEGORY_META[key].color}
                  onPress={() => setQuery(t(`categories.${key}`))}
                />
              ))}
            </View>
          </>
        ) : !hasResults ? (
          <View style={styles.empty}>
            <Icon name="search-outline" size={28} color={palette.textMuted} />
            <AppText variant="body" color={palette.textSecondary} center style={{ marginTop: spacing.md }}>
              {t('explore.noResults')}
            </AppText>
          </View>
        ) : (
          <>
            {eventResults.length > 0 && (
              <>
                <SectionHeader title={t('explore.resultsCount', { count: eventResults.length })} />
                <View style={{ gap: spacing.md }}>
                  {eventResults.map((e) => (
                    <EventListItem key={e.id} event={e} onPress={() => navigation.navigate('EventDetails', { eventId: e.id })} />
                  ))}
                </View>
              </>
            )}
            {communityResults.length > 0 && (
              <>
                <View style={{ height: spacing.xl }} />
                <SectionHeader title={t('tabs.communities')} />
                <View style={{ gap: spacing.lg }}>
                  {communityResults.map((c) => (
                    <CommunityCard key={c.id} community={c} onPress={() => navigation.navigate('CommunityDetails', { communityId: c.id })} />
                  ))}
                </View>
              </>
            )}
          </>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: palette.bg, paddingHorizontal: spacing.xl },
  header: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  content: { paddingTop: spacing.xl, paddingBottom: 40 },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  empty: { alignItems: 'center', paddingVertical: spacing.huge },
});
