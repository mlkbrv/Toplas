import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { palette, spacing } from '../../theme';
import { AppText, BottomSheet, Button, Chip, Divider, ToggleRow } from '../../components/ui';
import { ALL_CATEGORY_KEYS, CATEGORY_META } from '../../data/categories';
import type { CategoryKey } from '../../data/types';
import { useLocale } from '../../i18n/useLocale';
import { DEFAULT_FILTERS, ExploreFilters } from './filters';

type FilterSheetProps = {
  visible: boolean;
  initial: ExploreFilters;
  onClose: () => void;
  onApply: (f: ExploreFilters) => void;
};

function Group({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <View style={styles.group}>
      <AppText variant="label" color={palette.textSecondary} style={{ marginBottom: spacing.md }}>
        {label}
      </AppText>
      <View style={styles.chips}>{children}</View>
    </View>
  );
}

export function FilterSheet({ visible, initial, onClose, onApply }: FilterSheetProps) {
  const { t } = useLocale();
  const [f, setF] = useState<ExploreFilters>(initial);

  const toggleCat = (key: CategoryKey) =>
    setF((p) => ({
      ...p,
      categories: p.categories.includes(key)
        ? p.categories.filter((c) => c !== key)
        : [...p.categories, key],
    }));

  const dateOpts: ExploreFilters['date'][] = ['today', 'tomorrow', 'weekend', 'any'];
  const distOpts: ExploreFilters['distance'][] = ['5', '10', '25', 'any'];
  const priceOpts: ExploreFilters['price'][] = ['free', 'paid', 'any'];
  const fmtOpts: ExploreFilters['format'][] = ['in_person', 'online', 'any'];

  const dateLabel = (d: ExploreFilters['date']) =>
    d === 'today' ? t('common.today') : d === 'tomorrow' ? t('common.tomorrow') : d === 'weekend' ? t('common.thisWeekend') : t('common.anytime');
  const distLabel = (d: ExploreFilters['distance']) =>
    d === '5' ? t('common.km5') : d === '10' ? t('common.km10') : d === '25' ? t('common.km25') : t('common.anyDistance');
  const priceLabel = (p: ExploreFilters['price']) =>
    p === 'free' ? t('explore.priceFree') : p === 'paid' ? t('explore.pricePaid') : t('explore.priceAny');
  const fmtLabel = (p: ExploreFilters['format']) =>
    p === 'in_person' ? t('common.inPerson') : p === 'online' ? t('common.online') : t('explore.priceAny');

  return (
    <BottomSheet
      visible={visible}
      onClose={onClose}
      title={t('common.filters')}
      heightFraction={0.86}
      footer={
        <View style={styles.footer}>
          <Button
            title={t('common.reset')}
            variant="secondary"
            onPress={() => setF(DEFAULT_FILTERS)}
            style={{ flex: 1 }}
          />
          <Button
            title={t('common.showResults')}
            onPress={() => onApply(f)}
            style={{ flex: 1.4 }}
          />
        </View>
      }
    >
      <Group label={t('explore.filterDate')}>
        {dateOpts.map((d) => (
          <Chip key={d} label={dateLabel(d)} selected={f.date === d} onPress={() => setF((p) => ({ ...p, date: d }))} />
        ))}
      </Group>
      <Divider />
      <Group label={t('explore.filterDistance')}>
        {distOpts.map((d) => (
          <Chip key={d} label={distLabel(d)} selected={f.distance === d} onPress={() => setF((p) => ({ ...p, distance: d }))} />
        ))}
      </Group>
      <Divider />
      <Group label={t('explore.filterPrice')}>
        {priceOpts.map((p) => (
          <Chip key={p} label={priceLabel(p)} selected={f.price === p} onPress={() => setF((prev) => ({ ...prev, price: p }))} />
        ))}
      </Group>
      <Divider />
      <Group label={t('explore.filterFormat')}>
        {fmtOpts.map((p) => (
          <Chip key={p} label={fmtLabel(p)} selected={f.format === p} onPress={() => setF((prev) => ({ ...prev, format: p }))} />
        ))}
      </Group>
      <Divider />
      <Group label={t('explore.filterCategories')}>
        {ALL_CATEGORY_KEYS.map((key) => (
          <Chip
            key={key}
            label={t(`categories.${key}`)}
            icon={CATEGORY_META[key].icon}
            color={CATEGORY_META[key].color}
            selected={f.categories.includes(key)}
            onPress={() => toggleCat(key)}
          />
        ))}
      </Group>
      <Divider />
      <ToggleRow
        label={t('explore.filterSeats')}
        value={f.seatsOnly}
        onValueChange={(v) => setF((p) => ({ ...p, seatsOnly: v }))}
      />
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  group: { paddingVertical: spacing.lg },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  footer: { flexDirection: 'row', gap: spacing.md },
});
