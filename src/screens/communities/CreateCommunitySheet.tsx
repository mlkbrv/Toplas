import { useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { palette, radius, spacing } from '../../theme';
import { AppText, BottomSheet, Button, Chip } from '../../components/ui';
import { ALL_CATEGORY_KEYS, CATEGORY_META } from '../../data/categories';
import type { CategoryKey, Community } from '../../data/types';
import { useLocale } from '../../i18n/useLocale';

type Props = {
  visible: boolean;
  onClose: () => void;
};

const MEMBERSHIPS: Community['membership'][] = ['public', 'private', 'application'];

export function CreateCommunitySheet({ visible, onClose }: Props) {
  const { t } = useLocale();
  const [name, setName] = useState('');
  const [cat, setCat] = useState<CategoryKey>('technology');
  const [membership, setMembership] = useState<Community['membership']>('public');

  const reset = () => {
    setName('');
    setCat('technology');
    setMembership('public');
  };

  const membershipLabel = (m: Community['membership']) =>
    m === 'public' ? t('communities.public') : m === 'private' ? t('communities.private') : t('communities.application');

  return (
    <BottomSheet
      visible={visible}
      onClose={onClose}
      title={t('communities.create')}
      heightFraction={0.7}
      footer={
        <Button
          title={t('communities.create')}
          onPress={() => {
            reset();
            onClose();
          }}
          fullWidth
        />
      }
    >
      <AppText variant="label" color={palette.textSecondary}>
        {t('create.eventTitle')}
      </AppText>
      <TextInput
        style={styles.input}
        placeholder={t('communities.searchPlaceholder')}
        placeholderTextColor={palette.textMuted}
        value={name}
        onChangeText={setName}
      />

      <AppText variant="label" color={palette.textSecondary} style={styles.sectionLabel}>
        {t('create.category')}
      </AppText>
      <View style={styles.chips}>
        {ALL_CATEGORY_KEYS.slice(0, 8).map((key) => (
          <Chip
            key={key}
            label={t(`categories.${key}`)}
            icon={CATEGORY_META[key].icon}
            color={CATEGORY_META[key].color}
            selected={cat === key}
            onPress={() => setCat(key)}
          />
        ))}
      </View>

      <AppText variant="label" color={palette.textSecondary} style={styles.sectionLabel}>
        {t('communities.rules')}
      </AppText>
      <View style={styles.chips}>
        {MEMBERSHIPS.map((m) => (
          <Chip key={m} label={membershipLabel(m)} selected={membership === m} onPress={() => setMembership(m)} />
        ))}
      </View>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  input: {
    marginTop: spacing.sm,
    backgroundColor: palette.surface,
    borderRadius: radius.input,
    borderWidth: 1,
    borderColor: palette.border,
    paddingHorizontal: spacing.lg,
    height: 50,
    color: palette.text,
    fontFamily: 'Inter_400Regular',
    fontSize: 15,
  },
  sectionLabel: { marginTop: spacing.lg, marginBottom: spacing.md },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
});
