import { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, useWindowDimensions, View } from 'react-native';
import { palette, spacing } from '../theme';
import {
  AppText,
  Badge,
  Chip,
  EmptyState,
  Screen,
  SearchBar,
  SegmentedControl,
} from '../components/ui';
import { EventCard, EventListItem, StylizedMap } from '../components/cards';
import type { EventItem } from '../data/types';
import { useLocale } from '../i18n/useLocale';
import { useEvents } from '../api/DataProvider';
import { useAppNavigation } from '../navigation/types';
import { FilterSheet } from './explore/FilterSheet';
import {
  applyFilters,
  countActive,
  DEFAULT_FILTERS,
  ExploreFilters,
  SortKey,
  sortEvents,
} from './explore/filters';

type Mode = 'forYou' | 'nearby' | 'map' | 'online';

export function ExploreScreen() {
  const { t } = useLocale();
  const navigation = useAppNavigation();
  const { width } = useWindowDimensions();
  const events = useEvents();
  const cardWidth = (width - spacing.xl * 2 - spacing.md) / 2;

  const [mode, setMode] = useState<Mode>('forYou');
  const [sort, setSort] = useState<SortKey>('recommended');
  const [filters, setFilters] = useState<ExploreFilters>(DEFAULT_FILTERS);
  const [filterVisible, setFilterVisible] = useState(false);
  const [selectedMapId, setSelectedMapId] = useState<string>();

  const results = useMemo(() => {
    let base = events;
    if (mode === 'nearby' || mode === 'map') base = base.filter((e) => e.format !== 'online');
    if (mode === 'online') base = base.filter((e) => e.format === 'online');
    return sortEvents(applyFilters(base, filters), mode === 'nearby' ? 'nearest' : sort);
  }, [mode, sort, filters, events]);

  const openEvent = (ev: EventItem) => navigation.navigate('EventDetails', { eventId: ev.id });

  const modeOptions = [
    { key: 'forYou', label: t('explore.forYou') },
    { key: 'nearby', label: t('explore.nearby') },
    { key: 'map', label: t('explore.map') },
    { key: 'online', label: t('explore.online') },
  ];

  const sortOptions: { key: SortKey; label: string }[] = [
    { key: 'recommended', label: t('explore.sortRecommended') },
    { key: 'soonest', label: t('explore.sortSoonest') },
    { key: 'nearest', label: t('explore.sortNearest') },
    { key: 'price', label: t('explore.sortPrice') },
  ];

  const activeCount = countActive(filters);
  const selectedMapEvent = results.find((e) => e.id === selectedMapId);

  return (
    <Screen scroll>
      <AppText variant="headline">{t('explore.title')}</AppText>
      <AppText variant="body" color={palette.textSecondary} style={{ marginTop: 4 }}>
        {t('explore.subtitle')}
      </AppText>

      <View style={{ marginTop: spacing.lg }}>
        <SearchBar
          placeholder={t('discover.searchPlaceholder')}
          onPress={() => navigation.navigate('Search')}
          onFilterPress={() => setFilterVisible(true)}
        />
      </View>

      <View style={{ marginTop: spacing.lg }}>
        <SegmentedControl
          options={modeOptions}
          value={mode}
          onChange={(k) => setMode(k as Mode)}
        />
      </View>

      <View style={styles.resultBar}>
        <AppText variant="label" color={palette.textSecondary}>
          {t('explore.resultsCount', { count: results.length })}
        </AppText>
        {activeCount > 0 && (
          <Badge label={`${activeCount} ${t('common.filters').toLowerCase()}`} color={palette.lavender} />
        )}
      </View>

      {mode === 'map' ? (
        <View style={{ marginTop: spacing.md }}>
          <StylizedMap events={results} selectedId={selectedMapId} onSelect={(e) => setSelectedMapId(e.id)} />
          <AppText variant="meta" color={palette.textMuted} center style={{ marginTop: spacing.sm }}>
            {t('explore.mapHint')}
          </AppText>
          {selectedMapEvent && (
            <View style={{ marginTop: spacing.md }}>
              <EventListItem event={selectedMapEvent} onPress={() => openEvent(selectedMapEvent)} />
            </View>
          )}
        </View>
      ) : (
        <>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.sortRow}
            style={{ marginHorizontal: -spacing.xl, marginTop: spacing.md }}
          >
            {sortOptions.map((o) => (
              <Chip key={o.key} label={o.label} selected={sort === o.key} onPress={() => setSort(o.key)} />
            ))}
          </ScrollView>

          {results.length === 0 ? (
            <EmptyState
              icon="search-outline"
              title={t('explore.noResults')}
              hint={t('explore.noResultsHint')}
              ctaLabel={t('common.reset')}
              onCta={() => setFilters(DEFAULT_FILTERS)}
            />
          ) : (
            <View style={styles.grid}>
              {results.map((ev) => (
                <EventCard
                  key={ev.id}
                  event={ev}
                  onPress={() => openEvent(ev)}
                  style={{ width: cardWidth }}
                />
              ))}
            </View>
          )}
        </>
      )}

      <FilterSheet
        visible={filterVisible}
        initial={filters}
        onClose={() => setFilterVisible(false)}
        onApply={(f) => {
          setFilters(f);
          setFilterVisible(false);
        }}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  resultBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: spacing.lg,
  },
  sortRow: { paddingHorizontal: spacing.xl, gap: spacing.sm },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: spacing.md,
    marginTop: spacing.md,
  },
});
