import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { palette, radius, spacing } from '../theme';
import {
  AppText,
  BottomSheet,
  Button,
  ConfirmDialog,
  Divider,
  Icon,
  Header,
  ListRow,
  Screen,
  ToggleRow,
} from '../components/ui';
import { useLocale } from '../i18n/useLocale';
import { useAppNavigation } from '../navigation/types';
import type { AppLanguage } from '../i18n/config';

function Group({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <View style={styles.group}>
      <AppText variant="label" color={palette.textSecondary} style={styles.groupLabel}>
        {label}
      </AppText>
      <View style={styles.card}>{children}</View>
    </View>
  );
}

export function SettingsScreen() {
  const { t, lang, setLanguage } = useLocale();
  const navigation = useAppNavigation();

  const [push, setPush] = useState(true);
  const [email, setEmail] = useState(false);
  const [inApp, setInApp] = useState(true);
  const [attendance, setAttendance] = useState(true);
  const [communityVis, setCommunityVis] = useState(true);
  const [locationDisc, setLocationDisc] = useState(false);
  const [langSheet, setLangSheet] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const langLabel = lang === 'az' ? t('settings.languageAzerbaijani') : t('settings.languageEnglish');

  const pickLanguage = (l: AppLanguage) => {
    setLanguage(l);
    setLangSheet(false);
  };

  return (
    <Screen scroll edges={['top']}>
      <Header title={t('settings.title')} onBack={() => navigation.goBack()} />

      <Group label={t('settings.account')}>
        <ListRow icon="person-outline" label={t('settings.personalInfo')} onPress={() => {}} />
        <Divider />
        <ListRow icon="shield-checkmark-outline" label={t('settings.security')} onPress={() => {}} />
        <Divider />
        <ListRow icon="key-outline" label={t('settings.password')} onPress={() => {}} />
      </Group>

      <Group label={t('settings.preferences')}>
        <ListRow icon="language-outline" label={t('settings.language')} right={langLabel} onPress={() => setLangSheet(true)} />
        <Divider />
        <ListRow icon="location-outline" label={t('settings.location')} onPress={() => {}} />
        <Divider />
        <ListRow icon="color-palette-outline" label={t('settings.appearance')} right="Dark" onPress={() => {}} />
      </Group>

      <Group label={t('settings.notifications')}>
        <ToggleRow label={t('settings.pushNotifications')} value={push} onValueChange={setPush} icon="notifications-outline" />
        <Divider />
        <ToggleRow label={t('settings.emailNotifications')} value={email} onValueChange={setEmail} icon="mail-outline" />
        <Divider />
        <ToggleRow label={t('settings.inAppNotifications')} value={inApp} onValueChange={setInApp} icon="chatbox-outline" />
      </Group>

      <Group label={t('settings.privacyHeading')}>
        <ToggleRow
          label={t('settings.attendanceSharing')}
          hint={t('settings.attendanceSharingHint')}
          value={attendance}
          onValueChange={setAttendance}
          icon="eye-outline"
        />
        <Divider />
        <ToggleRow label={t('settings.communityVisibility')} value={communityVis} onValueChange={setCommunityVis} icon="people-outline" />
        <Divider />
        <ToggleRow label={t('settings.locationDiscovery')} value={locationDisc} onValueChange={setLocationDisc} icon="navigate-outline" />
        <Divider />
        <ListRow icon="ban-outline" label={t('settings.blockedUsers')} onPress={() => {}} />
      </Group>

      <Group label={t('settings.data')}>
        <ListRow icon="download-outline" label={t('settings.exportData')} onPress={() => {}} />
        <Divider />
        <ListRow icon="trash-outline" label={t('settings.deleteAccount')} danger onPress={() => setDeleteOpen(true)} />
      </Group>

      <Group label={t('settings.support')}>
        <ListRow icon="help-circle-outline" label={t('settings.help')} onPress={() => {}} />
        <Divider />
        <ListRow icon="document-text-outline" label={t('settings.terms')} onPress={() => {}} />
        <Divider />
        <ListRow icon="lock-closed-outline" label={t('settings.privacyPolicy')} onPress={() => {}} />
      </Group>

      <Button title={t('settings.signOut')} variant="secondary" onPress={() => {}} style={{ marginTop: spacing.lg }} />

      <AppText variant="tiny" color={palette.textMuted} center style={{ marginTop: spacing.lg }}>
        Toplaş · 1.0.0
      </AppText>

      <BottomSheet visible={langSheet} onClose={() => setLangSheet(false)} title={t('settings.language')} heightFraction={0.4}>
        {(['en', 'az'] as AppLanguage[]).map((l) => (
          <Pressable key={l} style={styles.langRow} onPress={() => pickLanguage(l)} accessibilityRole="button">
            <AppText variant="bodyMedium">
              {l === 'az' ? t('settings.languageAzerbaijani') : t('settings.languageEnglish')}
            </AppText>
            {lang === l && <Icon name="checkmark-circle" size={22} color={palette.violet} />}
          </Pressable>
        ))}
      </BottomSheet>

      <ConfirmDialog
        visible={deleteOpen}
        title={t('settings.deleteConfirmTitle')}
        body={t('settings.deleteConfirmBody')}
        confirmLabel={t('settings.deleteAccount')}
        cancelLabel={t('common.cancel')}
        danger
        onCancel={() => setDeleteOpen(false)}
        onConfirm={() => setDeleteOpen(false)}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  group: { marginTop: spacing.xl },
  groupLabel: { marginBottom: spacing.sm, marginLeft: spacing.xs },
  card: {
    backgroundColor: palette.card,
    borderRadius: radius.card,
    borderWidth: 1,
    borderColor: palette.border,
    paddingHorizontal: spacing.lg,
  },
  langRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.lg,
  },
});
