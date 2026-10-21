import { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { palette, spacing } from '../theme';
import { AppText, Chip, EmptyState, IconButton, Screen, SearchBar } from '../components/ui';
import { CommunityCard } from '../components/cards';
import { ALL_CATEGORY_KEYS, CATEGORY_META } from '../data/categories';
import { COMMUNITIES } from '../data/communities';
import type { CategoryKey } from '../data/types';
import { useLocale } from '../i18n/useLocale';
import { useAppNavigation } from '../navigation/types';
import { CreateCommunitySheet } from './communities/CreateCommunitySheet';

export function CommunitiesScreen() {
  const { t, L } = useLocale();
  const navigation = useAppNavigation();
  const [cat, setCat] = useState<CategoryKey | 'all'>('all');
  const [query, setQuery] = useState('');
  const [createVisible, setCreateVisible] = useState(false);

  const list = useMemo(
    () =>
      COMMUNITIES.filter((c) => {
        if (cat !== 'all' && c.category !== cat) return false;
        if (query.trim()) {
          const q = query.toLowerCase();
          return L(c.name).toLowerCase().includes(q) || L(c.description).toLowerCase().includes(q);
        }
        return true;
      }),
    [cat, query, L]
  );

  const chips: (CategoryKey | 'all')[] = ['all', ...ALL_CATEGORY_KEYS];

  return (
    <Screen scroll>
      <View style={styles.headerRow}>
        <View style={{ flex: 1 }}>
          <AppText variant="headline">{t('communities.title')}</AppText>
          <AppText variant="body" color={palette.textSecondary} style={{ marginTop: 4 }}>
            {t('communities.subtitle')}
          </AppText>
        </View>
        <IconButton name="add" onPress={() => setCreateVisible(true)} accessibilityLabel={t('communities.create')} />
      </View>

      <View style={{ marginTop: spacing.lg }}>
        <SearchBar
          placeholder={t('communities.searchPlaceholder')}
          value={query}
          onChangeText={setQuery}
        />
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.chips}
        style={{ marginTop: spacing.lg, marginHorizontal: -spacing.xl }}
      >
        {chips.map((key) => (
          <Chip
            key={key}
            label={key === 'all' ? t('categories.all') : t(`categories.${key}`)}
            icon={key === 'all' ? undefined : CATEGORY_META[key].icon}
            color={key === 'all' ? palette.violet : CATEGORY_META[key].color}
            selected={cat === key}
            onPress={() => setCat(key)}
          />
        ))}
      </ScrollView>

      {list.length === 0 ? (
        <EmptyState icon="people-outline" title={t('explore.noResults')} hint={t('explore.noResultsHint')} />
      ) : (
        <View style={styles.list}>
          {list.map((c) => (
            <CommunityCard
              key={c.id}
              community={c}
              onPress={() => navigation.navigate('CommunityDetails', { communityId: c.id })}
            />
          ))}
        </View>
      )}

      <CreateCommunitySheet visible={createVisible} onClose={() => setCreateVisible(false)} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  headerRow: { flexDirection: 'row', alignItems: 'flex-start' },
  chips: { paddingHorizontal: spacing.xl, gap: spacing.sm },
  list: { marginTop: spacing.xl, gap: spacing.lg },
});
