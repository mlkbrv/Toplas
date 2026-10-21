import { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { palette, spacing } from '../theme';
import { AppText, Chip, Header, Icon, Screen, SectionHeader } from '../components/ui';
import { MentorCard, OpportunityCard } from '../components/cards';
import { MENTORS, OPPORTUNITIES } from '../data/opportunities';
import type { OpportunityType } from '../data/types';
import { useLocale } from '../i18n/useLocale';
import { useAppNavigation } from '../navigation/types';

type Filter = 'all' | OpportunityType;

const RELATED_EVENT: Partial<Record<string, string>> = {
  'op-1': 'ev-hackathon',
  'op-2': 'ev-startup-pitch',
  'op-5': 'ev-founder-mixer',
};

export function OpportunitiesScreen() {
  const { t } = useLocale();
  const navigation = useAppNavigation();
  const [filter, setFilter] = useState<Filter>('all');

  const filtered = useMemo(
    () => (filter === 'all' ? OPPORTUNITIES : OPPORTUNITIES.filter((o) => o.type === filter)),
    [filter]
  );

  const filters: { key: Filter; label: string }[] = [
    { key: 'all', label: t('categories.all') },
    { key: 'mentorship', label: t('mentorship.mentorship') },
    { key: 'hackathon', label: t('mentorship.hackathons') },
    { key: 'pitch', label: t('mentorship.pitch') },
    { key: 'skill_exchange', label: t('mentorship.skillExchange') },
    { key: 'co_founder', label: t('mentorship.coFounder') },
    { key: 'networking', label: t('mentorship.networking') },
  ];

  const openOpportunity = (id: string, type: OpportunityType) => {
    const ev = RELATED_EVENT[id];
    if (ev) navigation.navigate('EventDetails', { eventId: ev });
    else if (type === 'mentorship') navigation.navigate('MentorProfile', { mentorId: 'mt-1' });
  };

  return (
    <Screen scroll edges={['top']} padded={false}>
      <View style={styles.pad}>
        <Header title={t('mentorship.title')} subtitle={t('mentorship.subtitle')} onBack={() => navigation.goBack()} />
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chips}>
        {filters.map((f) => (
          <Chip key={f.key} label={f.label} selected={filter === f.key} onPress={() => setFilter(f.key)} />
        ))}
      </ScrollView>

      <View style={styles.pad}>
        <View style={{ marginTop: spacing.lg, gap: spacing.md }}>
          {filtered.map((o) => (
            <OpportunityCard key={o.id} opportunity={o} onPress={() => openOpportunity(o.id, o.type)} />
          ))}
        </View>

        <View style={{ marginTop: spacing.xxl }}>
          <SectionHeader title={t('mentorship.mentorship')} />
          <View style={{ gap: spacing.md }}>
            {MENTORS.map((m) => (
              <MentorCard key={m.id} mentor={m} onPress={() => navigation.navigate('MentorProfile', { mentorId: m.id })} />
            ))}
          </View>
        </View>

        <View style={styles.disclaimer}>
          <Icon name="information-circle-outline" size={16} color={palette.textMuted} />
          <AppText variant="meta" color={palette.textMuted} style={{ marginLeft: spacing.sm, flex: 1 }}>
            {t('mentorship.noGuarantee')}
          </AppText>
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  pad: { paddingHorizontal: spacing.xl },
  chips: { paddingHorizontal: spacing.xl, gap: spacing.sm, marginTop: spacing.sm },
  disclaimer: { flexDirection: 'row', alignItems: 'flex-start', marginTop: spacing.xl },
});
