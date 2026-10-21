import { useState } from 'react';
import { Modal, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { palette, radius, spacing } from '../theme';
import {
  AppText,
  Badge,
  Button,
  Chip,
  Icon,
  IconButton,
  RemoteImage,
  StepDots,
  ToggleRow,
} from '../components/ui';
import { ALL_CATEGORY_KEYS, CATEGORY_META } from '../data/categories';
import { cover as coverImg } from '../data/images';
import type { CategoryKey } from '../data/types';
import { useLocale } from '../i18n/useLocale';
import { useAppNavigation } from '../navigation/types';
import { Field } from './create/Field';

type Loc = 'in_person' | 'online' | 'hybrid';

export function CreateEventScreen() {
  const { t } = useLocale();
  const navigation = useAppNavigation();
  const insets = useSafeAreaInsets();

  const [step, setStep] = useState(0);
  const [published, setPublished] = useState(false);
  const [showErrors, setShowErrors] = useState(false);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<CategoryKey | null>(null);
  const [tags, setTags] = useState('');
  const [uploaded, setUploaded] = useState(false);
  const [loc, setLoc] = useState<Loc>('in_person');
  const [venue, setVenue] = useState('');
  const [startDate, setStartDate] = useState('');
  const [paid, setPaid] = useState(false);
  const [price, setPrice] = useState('');
  const [capacity, setCapacity] = useState('');
  const [waitlist, setWaitlist] = useState(true);
  const [speakers, setSpeakers] = useState('');
  const [refund, setRefund] = useState('');

  const steps = [t('create.stepBasics'), t('create.stepWhen'), t('create.stepTickets'), t('create.stepExtra'), t('create.stepPreview')];
  const total = steps.length;

  const basicsValid = title.trim() && description.trim() && category;
  const whenValid = startDate.trim() && (loc === 'online' || venue.trim());

  const canAdvance = () => {
    if (step === 0) return !!basicsValid;
    if (step === 1) return !!whenValid;
    return true;
  };

  const next = () => {
    if (!canAdvance()) {
      setShowErrors(true);
      return;
    }
    setShowErrors(false);
    setStep((s) => Math.min(s + 1, total - 1));
  };

  const locLabel = (x: Loc) => (x === 'in_person' ? t('common.inPerson') : x === 'online' ? t('common.online') : t('common.hybrid'));

  return (
    <View style={[styles.root, { paddingTop: insets.top + 8 }]}>
      <View style={styles.header}>
        <IconButton name="close" onPress={() => navigation.goBack()} accessibilityLabel={t('common.close')} />
        <AppText variant="cardTitle">{t('create.title')}</AppText>
        <View style={{ width: 44 }} />
      </View>

      <View style={styles.progress}>
        <StepDots total={total} current={step} />
        <AppText variant="meta" color={palette.textMuted} style={{ marginTop: spacing.sm }}>
          {steps[step]}
        </AppText>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
        {step === 0 && (
          <>
            <Pressable style={styles.cover} onPress={() => setUploaded(true)} accessibilityRole="button">
              {uploaded ? (
                <RemoteImage uri={coverImg('new-event')} radius={radius.lg} style={StyleSheet.absoluteFill} />
              ) : (
                <View style={styles.coverEmpty}>
                  <Icon name="image-outline" size={26} color={palette.lavender} />
                  <AppText variant="meta" color={palette.textSecondary} style={{ marginTop: 6 }}>
                    {t('create.uploadCover')}
                  </AppText>
                </View>
              )}
            </Pressable>
            <Field label={t('create.eventTitle')} value={title} onChangeText={setTitle} placeholder={t('create.eventTitlePh')} required error={showErrors && !title.trim()} />
            <Field label={t('create.description')} value={description} onChangeText={setDescription} placeholder={t('create.descriptionPh')} multiline required error={showErrors && !description.trim()} />
            <AppText variant="label" color={palette.textSecondary} style={styles.label}>
              {t('create.category')}
            </AppText>
            <View style={styles.chips}>
              {ALL_CATEGORY_KEYS.map((key) => (
                <Chip key={key} label={t(`categories.${key}`)} icon={CATEGORY_META[key].icon} color={CATEGORY_META[key].color} selected={category === key} onPress={() => setCategory(key)} />
              ))}
            </View>
            {showErrors && !category && (
              <AppText variant="meta" color={palette.error} style={{ marginTop: spacing.sm }}>
                {t('create.required')}
              </AppText>
            )}
            <View style={{ height: spacing.lg }} />
            <Field label={t('create.tags')} value={tags} onChangeText={setTags} placeholder={t('create.tagsPh')} />
          </>
        )}

        {step === 1 && (
          <>
            <Field label={t('create.startDate')} value={startDate} onChangeText={setStartDate} placeholder="2026-10-24 18:30" required error={showErrors && !startDate.trim()} />
            <AppText variant="label" color={palette.textSecondary} style={styles.label}>
              {t('create.locationType')}
            </AppText>
            <View style={styles.chips}>
              {(['in_person', 'online', 'hybrid'] as Loc[]).map((x) => (
                <Chip key={x} label={locLabel(x)} selected={loc === x} onPress={() => setLoc(x)} />
              ))}
            </View>
            <View style={{ height: spacing.lg }} />
            {loc === 'online' ? (
              <Field label={t('create.onlineLink')} value={venue} onChangeText={setVenue} placeholder="https://" multiline />
            ) : (
              <Field label={t('create.venueAddress')} value={venue} onChangeText={setVenue} placeholder={t('create.venueAddressPh')} required error={showErrors && !venue.trim()} />
            )}
          </>
        )}

        {step === 2 && (
          <>
            <View style={styles.card}>
              <ToggleRow label={t('create.paidEvent')} value={paid} onValueChange={setPaid} icon="pricetag-outline" />
            </View>
            {paid && <Field label={t('create.price')} value={price} onChangeText={setPrice} placeholder="15" keyboardType="numeric" />}
            <Field label={t('create.capacity')} value={capacity} onChangeText={setCapacity} placeholder="100" keyboardType="numeric" />
            <View style={styles.card}>
              <ToggleRow label={t('create.enableWaitlist')} value={waitlist} onValueChange={setWaitlist} icon="hourglass-outline" />
            </View>
          </>
        )}

        {step === 3 && (
          <>
            <Field label={t('create.speakers')} value={speakers} onChangeText={setSpeakers} placeholder="—" multiline />
            <Field label={t('create.refundPolicy')} value={refund} onChangeText={setRefund} placeholder="—" multiline />
          </>
        )}

        {step === 4 && (
          <>
            <AppText variant="meta" color={palette.textMuted} style={{ marginBottom: spacing.md }}>
              {t('create.previewNote')}
            </AppText>
            <View style={styles.preview}>
              <RemoteImage uri={uploaded ? coverImg('new-event') : coverImg('preview')} scrim radius={radius.card} style={styles.previewImg} />
              <View style={styles.previewBody}>
                {category && <Badge label={t(`categories.${category}`)} icon={CATEGORY_META[category].icon} color={CATEGORY_META[category].color} variant="glass" />}
                <AppText variant="title" style={{ marginTop: spacing.sm }}>
                  {title || t('create.eventTitlePh')}
                </AppText>
                <AppText variant="meta" color={palette.textSecondary} numberOfLines={2} style={{ marginTop: 4 }}>
                  {description || t('create.descriptionPh')}
                </AppText>
                <View style={styles.previewMeta}>
                  <Icon name="calendar-outline" size={14} color={palette.lavender} />
                  <AppText variant="meta" color={palette.text} style={{ marginLeft: 5 }}>
                    {startDate || '—'}
                  </AppText>
                  <Icon name={paid ? 'pricetag-outline' : 'gift-outline'} size={14} color={palette.lavender} style={{ marginLeft: spacing.md }} />
                  <AppText variant="meta" color={palette.text} style={{ marginLeft: 5 }}>
                    {paid ? `₼${price || '0'}` : t('common.free')}
                  </AppText>
                </View>
              </View>
            </View>
          </>
        )}
      </ScrollView>

      <View style={[styles.footer, { paddingBottom: insets.bottom + spacing.md }]}>
        {step > 0 && <Button title={t('common.back')} variant="secondary" onPress={() => setStep((s) => s - 1)} style={{ flex: 1 }} />}
        {step < total - 1 ? (
          <Button title={t('common.next')} onPress={next} style={{ flex: 1.4 }} />
        ) : (
          <Button title={t('create.publish')} icon="rocket-outline" onPress={() => setPublished(true)} style={{ flex: 1.4 }} />
        )}
      </View>

      <Modal visible={published} transparent animationType="fade" onRequestClose={() => setPublished(false)}>
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <View style={styles.modalCheck}>
              <Icon name="checkmark" size={30} color={palette.success} />
            </View>
            <AppText variant="title" center style={{ marginTop: spacing.md }}>
              {t('create.published')}
            </AppText>
            <AppText variant="body" color={palette.textSecondary} center style={{ marginTop: spacing.sm }}>
              {t('create.publishedNote')}
            </AppText>
            <Button
              title={t('common.done')}
              onPress={() => {
                setPublished(false);
                navigation.goBack();
              }}
              fullWidth
              style={{ marginTop: spacing.lg }}
            />
          </View>
        </View>
      </Modal>
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
  progress: { paddingHorizontal: spacing.xl },
  content: { paddingHorizontal: spacing.xl, paddingTop: spacing.lg, paddingBottom: 40 },
  cover: {
    height: 150,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: palette.borderStrong,
    borderStyle: 'dashed',
    overflow: 'hidden',
    marginBottom: spacing.lg,
  },
  coverEmpty: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  label: { marginBottom: spacing.md },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  card: {
    backgroundColor: palette.card,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: palette.border,
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.lg,
  },
  preview: {
    backgroundColor: palette.card,
    borderRadius: radius.card,
    borderWidth: 1,
    borderColor: palette.border,
    overflow: 'hidden',
  },
  previewImg: { height: 160 },
  previewBody: { padding: spacing.lg },
  previewMeta: { flexDirection: 'row', alignItems: 'center', marginTop: spacing.md },
  footer: {
    flexDirection: 'row',
    gap: spacing.md,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: palette.border,
    backgroundColor: palette.bgSecondary,
  },
  modalBackdrop: { flex: 1, backgroundColor: palette.overlay, alignItems: 'center', justifyContent: 'center', padding: spacing.xl },
  modalCard: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: palette.bgSecondary,
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: palette.border,
    padding: spacing.xl,
    alignItems: 'center',
  },
  modalCheck: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: 'rgba(52,211,153,0.16)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
