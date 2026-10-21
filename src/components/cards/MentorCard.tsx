import { Pressable, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { palette, radius, spacing } from '../../theme';
import { AppText, Avatar, Rating } from '../ui';
import type { Mentor } from '../../data/types';
import { useLocale } from '../../i18n/useLocale';

type MentorCardProps = {
  mentor: Mentor;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
};

export function MentorCard({ mentor, onPress, style }: MentorCardProps) {
  const { t, L } = useLocale();

  return (
    <Pressable onPress={onPress} style={[styles.card, style]} accessibilityRole="button">
      <Avatar uri={mentor.avatar} size={56} ring />
      <View style={styles.body}>
        <AppText variant="cardTitle" numberOfLines={1}>
          {mentor.name}
        </AppText>
        <AppText variant="meta" color={palette.lavender} numberOfLines={1} style={{ marginTop: 2 }}>
          {L(mentor.expertise)}
        </AppText>
        <View style={styles.footer}>
          <Rating value={mentor.rating} count={mentor.reviewCount} />
          <AppText variant="label" color={palette.text}>
            ₼{mentor.pricePerSession}
            <AppText variant="meta" color={palette.textMuted}>
              {' '}
              {t('common.perSession')}
            </AppText>
          </AppText>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: palette.card,
    borderRadius: radius.card,
    borderWidth: 1,
    borderColor: palette.border,
    padding: spacing.lg,
  },
  body: { flex: 1, marginLeft: spacing.md },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: spacing.sm,
  },
});
