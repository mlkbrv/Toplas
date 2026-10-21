import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { palette, radius, spacing } from '../theme';
import {
  AppText,
  AmbientGlow,
  Badge,
  Button,
  Chip,
  Icon,
  IconButton,
  StepDots,
} from '../components/ui';
import { EventListItem } from '../components/cards';
import { CATEGORY_META, DISCOVER_CATEGORY_KEYS } from '../data/categories';
import { EVENTS } from '../data/events';
import type { CategoryKey, EventItem } from '../data/types';
import { useLocale } from '../i18n/useLocale';
import { useAppNavigation } from '../navigation/types';

type Time = 'now' | 'hours' | 'evening' | 'weekend' | 'custom';
type Budget = 'free' | 'low' | 'mid' | 'high' | 'custom';
type Fmt = 'in_person' | 'online' | 'both';

function OptionRow({ label, selected, onPress }: { label: string; selected: boolean; onPress: () => void }) {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.option, selected && styles.optionActive]}
      accessibilityRole="button"
      accessibilityState={{ selected }}
    >
      <AppText variant="bodyMedium" color={selected ? palette.text : palette.textSecondary}>
        {label}
      </AppText>
      <Icon
        name={selected ? 'radio-button-on' : 'radio-button-off'}
        size={20}
        color={selected ? palette.violet : palette.textMuted}
      />
    </Pressable>
  );
}

export function SurpriseMeScreen() {
  const { t } = useLocale();
  const navigation = useAppNavigation();
  const insets = useSafeAreaInsets();

  const [step, setStep] = useState(0);
  const [time, setTime] = useState<Time>('evening');
  const [budget, setBudget] = useState<Budget>('low');
  const [interests, setInterests] = useState<CategoryKey[]>(['technology', 'networking']);
  const [fmt, setFmt] = useState<Fmt>('in_person');
  const [pickIndex, setPickIndex] = useState(0);

  const candidates = useMemo<EventItem[]>(() => {
    return EVENTS.filter((e) => {
      if (budget === 'free' && e.priceFrom > 0) return false;
      if (budget === 'low' && e.priceFrom > 15) return false;
      if (budget === 'mid' && (e.priceFrom < 15 || e.priceFrom > 40)) return false;
      if (fmt === 'in_person' && e.format === 'online') return false;
      if (fmt === 'online' && e.format !== 'online') return false;
      if (interests.length > 0 && !interests.includes(e.category)) return false;
      return true;
    });
  }, [budget, fmt, interests]);

  const result = candidates.length ? candidates[pickIndex % candidates.length] : null;

  const toggleInterest = (key: CategoryKey) =>
    setInterests((prev) => (prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]));

  const timeOpts: Time[] = ['now', 'hours', 'evening', 'weekend', 'custom'];
  const budgetOpts: Budget[] = ['free', 'low', 'mid', 'high', 'custom'];
  const fmtOpts: Fmt[] = ['in_person', 'online', 'both'];

  const timeLabel = (x: Time) =>
    ({ now: t('surprise.timeNow'), hours: t('surprise.timeHours'), evening: t('surprise.timeEvening'), weekend: t('surprise.timeWeekend'), custom: t('surprise.timeCustom') }[x]);
  const budgetLabel = (x: Budget) =>
    ({ free: t('surprise.budgetFree'), low: t('surprise.budgetLow'), mid: t('surprise.budgetMid'), high: t('surprise.budgetHigh'), custom: t('surprise.budgetCustom') }[x]);
  const fmtLabel = (x: Fmt) =>
    ({ in_person: t('surprise.formatInPerson'), online: t('surprise.formatOnline'), both: t('surprise.formatBoth') }[x]);

  const isResult = step === 4;
  const stepTitle = [t('surprise.stepTime'), t('surprise.stepBudget'), t('surprise.stepInterests'), t('surprise.stepDistance')][step] ?? '';

  return (
    <View style={[styles.root, { paddingTop: insets.top + 8 }]}>
      <View style={styles.header}>
        <IconButton name="close" onPress={() => navigation.goBack()} accessibilityLabel={t('common.close')} />
        <AppText variant="cardTitle">{t('surprise.title')}</AppText>
        <View style={{ width: 44 }} />
      </View>

      {!isResult && (
        <View style={styles.progress}>
          <StepDots total={4} current={step} />
          <AppText variant="meta" color={palette.textMuted} style={{ marginTop: spacing.sm }}>
            {t('surprise.step', { current: step + 1, total: 4 })}
          </AppText>
        </View>
      )}

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {!isResult ? (
          <>
            <AppText variant="title" style={{ marginBottom: spacing.lg }}>
              {stepTitle}
            </AppText>

            {step === 0 && timeOpts.map((x) => <OptionRow key={x} label={timeLabel(x)} selected={time === x} onPress={() => setTime(x)} />)}
            {step === 1 && budgetOpts.map((x) => <OptionRow key={x} label={budgetLabel(x)} selected={budget === x} onPress={() => setBudget(x)} />)}
            {step === 2 && (
              <View style={styles.chips}>
                {DISCOVER_CATEGORY_KEYS.map((key) => (
                  <Chip
                    key={key}
                    label={t(`categories.${key}`)}
                    icon={CATEGORY_META[key].icon}
                    color={CATEGORY_META[key].color}
                    selected={interests.includes(key)}
                    onPress={() => toggleInterest(key)}
                  />
                ))}
              </View>
            )}
            {step === 3 && fmtOpts.map((x) => <OptionRow key={x} label={fmtLabel(x)} selected={fmt === x} onPress={() => setFmt(x)} />)}
          </>
        ) : (
          <View style={styles.result}>
            <View style={styles.resultGlowWrap}>
              <AmbientGlow size={240} color={palette.magenta} opacity={0.4} style={{ position: 'absolute', top: -60 }} />
              <View style={styles.sparkle}>
                <Icon name="sparkles" size={26} color={palette.lavender} />
              </View>
            </View>
            {result ? (
              <>
                <AppText variant="title" center style={{ marginTop: spacing.md }}>
                  {t('surprise.whyRecommended')}
                </AppText>
                <View style={styles.reasons}>
                  <Badge label={t('surprise.matchTime')} icon="time-outline" color={palette.cyan} />
                  <Badge label={t('surprise.matchBudget')} icon="wallet-outline" color={palette.success} />
                  {result.format !== 'online' && (
                    <Badge label={t('surprise.matchDistance', { distance: result.distanceKm })} icon="navigate-outline" color={palette.lavender} />
                  )}
                </View>
                <View style={{ width: '100%', marginTop: spacing.lg }}>
                  <EventListItem event={result} onPress={() => navigation.navigate('EventDetails', { eventId: result.id })} />
                </View>
                <Button
                  title={t('surprise.viewEvent')}
                  onPress={() => navigation.navigate('EventDetails', { eventId: result.id })}
                  fullWidth
                  style={{ marginTop: spacing.lg }}
                />
                <Button
                  title={t('surprise.tryAnother')}
                  variant="secondary"
                  icon="shuffle-outline"
                  onPress={() => setPickIndex((i) => i + 1)}
                  fullWidth
                  style={{ marginTop: spacing.sm }}
                />
              </>
            ) : (
              <>
                <AppText variant="title" center style={{ marginTop: spacing.md }}>
                  {t('surprise.noMatch')}
                </AppText>
                <AppText variant="body" color={palette.textSecondary} center style={{ marginTop: spacing.sm }}>
                  {t('surprise.noMatchHint')}
                </AppText>
                <Button title={t('common.back')} variant="secondary" onPress={() => setStep(0)} fullWidth style={{ marginTop: spacing.lg }} />
              </>
            )}
          </View>
        )}
      </ScrollView>

      {!isResult && (
        <View style={[styles.footer, { paddingBottom: insets.bottom + spacing.md }]}>
          {step > 0 && (
            <Button title={t('common.back')} variant="secondary" onPress={() => setStep((s) => s - 1)} style={{ flex: 1 }} />
          )}
          <Button
            title={step === 3 ? t('surprise.reveal') : t('common.next')}
            icon={step === 3 ? 'sparkles' : undefined}
            onPress={() => setStep((s) => s + 1)}
            style={{ flex: 1.4 }}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: palette.bg },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.md,
  },
  progress: { paddingHorizontal: spacing.xl, alignItems: 'flex-start' },
  content: { paddingHorizontal: spacing.xl, paddingTop: spacing.xl, paddingBottom: 40 },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.lg,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: palette.border,
    backgroundColor: palette.card,
    marginBottom: spacing.md,
  },
  optionActive: { borderColor: palette.violet, backgroundColor: 'rgba(139,92,246,0.12)' },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  result: { alignItems: 'center' },
  resultGlowWrap: { alignItems: 'center', justifyContent: 'center', height: 90 },
  sparkle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(192,132,252,0.16)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  reasons: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm, justifyContent: 'center', marginTop: spacing.md },
  footer: {
    flexDirection: 'row',
    gap: spacing.md,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: palette.border,
    backgroundColor: palette.bgSecondary,
  },
});
