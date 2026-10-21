import { useState } from 'react';
import { Modal, ScrollView, StyleSheet, View } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { palette, radius, spacing } from '../theme';
import {
  AppText,
  Avatar,
  Badge,
  Button,
  Card,
  Header,
  Icon,
  Rating,
} from '../components/ui';
import { getMentor } from '../data/opportunities';
import { useLocale } from '../i18n/useLocale';
import { useAppNavigation } from '../navigation/types';
import type { RootStackParamList } from '../navigation/types';

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View style={{ marginTop: spacing.xl }}>
      <AppText variant="section" style={{ marginBottom: spacing.sm }}>
        {title}
      </AppText>
      {children}
    </View>
  );
}

export function MentorProfileScreen() {
  const route = useRoute<RouteProp<RootStackParamList, 'MentorProfile'>>();
  const navigation = useAppNavigation();
  const insets = useSafeAreaInsets();
  const { t, L } = useLocale();
  const [booked, setBooked] = useState(false);

  const mentor = getMentor(route.params.mentorId);
  if (!mentor) {
    return (
      <View style={styles.missing}>
        <AppText variant="body">Mentor not found</AppText>
      </View>
    );
  }

  return (
    <View style={styles.root}>
      <View style={[styles.headerPad, { paddingTop: insets.top + 8 }]}>
        <Header onBack={() => navigation.goBack()} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={styles.head}>
          <Avatar uri={mentor.avatar} size={96} ring />
          <AppText variant="title" style={{ marginTop: spacing.md }}>
            {mentor.name}
          </AppText>
          <AppText variant="bodyMedium" color={palette.lavender} style={{ marginTop: 2 }}>
            {L(mentor.expertise)}
          </AppText>
          <View style={{ marginTop: spacing.sm }}>
            <Rating value={mentor.rating} count={mentor.reviewCount} size={16} />
          </View>
        </View>

        <Section title={t('mentorship.bio')}>
          <AppText variant="body" color={palette.textSecondary}>
            {L(mentor.bio)}
          </AppText>
        </Section>

        <Section title={t('mentorship.sessionFormats')}>
          <View style={styles.tags}>
            {mentor.sessionFormats.map((f, i) => (
              <Badge key={i} label={L(f)} icon="videocam-outline" color={palette.cyan} />
            ))}
          </View>
        </Section>

        <Section title={t('mentorship.availability')}>
          <Card padded>
            <View style={styles.row}>
              <Icon name="calendar-outline" size={16} color={palette.lavender} />
              <AppText variant="body" color={palette.textSecondary} style={{ marginLeft: spacing.sm }}>
                {L(mentor.availability)}
              </AppText>
            </View>
          </Card>
        </Section>

        <Section title={t('profile.languages')}>
          <View style={styles.tags}>
            {mentor.languages.map((l) => (
              <Badge key={l} label={l} icon="language-outline" color={palette.lavender} />
            ))}
          </View>
        </Section>

        <View style={styles.disclaimer}>
          <Icon name="information-circle-outline" size={15} color={palette.textMuted} />
          <AppText variant="meta" color={palette.textMuted} style={{ marginLeft: spacing.sm, flex: 1 }}>
            {t('mentorship.noGuarantee')}
          </AppText>
        </View>
      </ScrollView>

      <View style={[styles.cta, { paddingBottom: insets.bottom + spacing.md }]}>
        <View>
          <AppText variant="title">₼{mentor.pricePerSession}</AppText>
          <AppText variant="meta" color={palette.textSecondary}>
            {t('common.perSession')}
          </AppText>
        </View>
        <Button title={t('mentorship.book')} onPress={() => setBooked(true)} size="lg" style={{ flex: 1 }} />
      </View>

      <Modal visible={booked} transparent animationType="fade" onRequestClose={() => setBooked(false)}>
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <View style={styles.check}>
              <Icon name="checkmark" size={28} color={palette.success} />
            </View>
            <AppText variant="section" center style={{ marginTop: spacing.md }}>
              {mentor.name}
            </AppText>
            <AppText variant="body" color={palette.textSecondary} center style={{ marginTop: spacing.sm }}>
              {t('mentorship.book')} · ₼{mentor.pricePerSession}
            </AppText>
            <Button title={t('common.done')} onPress={() => setBooked(false)} fullWidth style={{ marginTop: spacing.lg }} />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: palette.bg },
  missing: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: palette.bg },
  headerPad: { paddingHorizontal: spacing.xl },
  content: { paddingHorizontal: spacing.xl, paddingBottom: 120, alignItems: 'stretch' },
  head: { alignItems: 'center' },
  row: { flexDirection: 'row', alignItems: 'center' },
  tags: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  disclaimer: { flexDirection: 'row', alignItems: 'flex-start', marginTop: spacing.xl },
  cta: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.lg,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.md,
    backgroundColor: palette.bgSecondary,
    borderTopWidth: 1,
    borderTopColor: palette.border,
  },
  modalBackdrop: { flex: 1, backgroundColor: palette.overlay, alignItems: 'center', justifyContent: 'center', padding: spacing.xl },
  modalCard: {
    width: '100%',
    maxWidth: 340,
    backgroundColor: palette.bgSecondary,
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: palette.border,
    padding: spacing.xl,
    alignItems: 'center',
  },
  check: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(52,211,153,0.16)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
