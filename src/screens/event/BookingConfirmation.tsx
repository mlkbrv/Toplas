import { Modal, StyleSheet, View } from 'react-native';
import { palette, radius, spacing } from '../../theme';
import { AppText, Button, Divider, Icon, QrCode } from '../../components/ui';
import { formatDateTime } from '../../data/format';
import type { EventItem } from '../../data/types';
import { useLocale } from '../../i18n/useLocale';

type Props = {
  visible: boolean;
  event: EventItem;
  waitlist?: boolean;
  onClose: () => void;
  onViewEvents: () => void;
};

export function BookingConfirmation({ visible, event, waitlist, onClose, onViewEvents }: Props) {
  const { t, lang, L } = useLocale();
  const free = event.priceFrom === 0;

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={styles.backdrop}>
        <View style={styles.sheet}>
          <View style={styles.handle} />
          <View style={[styles.check, waitlist && { backgroundColor: 'rgba(34,211,238,0.16)' }]}>
            <Icon
              name={waitlist ? 'hourglass-outline' : 'checkmark'}
              size={30}
              color={waitlist ? palette.cyan : palette.success}
            />
          </View>
          <AppText variant="title" center style={{ marginTop: spacing.md }}>
            {waitlist ? t('event.joinWaitlist') : free ? t('event.reserveSpot') : t('myEvents.confirmed')}
          </AppText>
          <AppText variant="body" color={palette.textSecondary} center style={{ marginTop: 6 }}>
            {L(event.title)}
          </AppText>
          <AppText variant="meta" color={palette.textMuted} center style={{ marginTop: 2 }}>
            {formatDateTime(event.start, lang)} · {L(event.venueName)}
          </AppText>

          {!waitlist && (
            <>
              <View style={styles.qrWrap}>
                <QrCode value={`TOPLAS-${event.id}`} size={170} />
              </View>
              <AppText variant="meta" color={palette.textMuted} center>
                {t('myEvents.showQr')}
              </AppText>
            </>
          )}

          <Divider style={{ marginVertical: spacing.lg }} />

          <Button title={t('myEvents.viewTicket')} onPress={onViewEvents} fullWidth iconRight="arrow-forward" />
          <Button title={t('common.close')} variant="ghost" onPress={onClose} fullWidth style={{ marginTop: spacing.sm }} />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: { flex: 1, backgroundColor: palette.overlay, justifyContent: 'flex-end' },
  sheet: {
    backgroundColor: palette.bgSecondary,
    borderTopLeftRadius: radius.xl,
    borderTopRightRadius: radius.xl,
    borderWidth: 1,
    borderColor: palette.border,
    padding: spacing.xl,
    paddingBottom: spacing.xxxl,
    alignItems: 'center',
  },
  handle: {
    width: 44,
    height: 5,
    borderRadius: 3,
    backgroundColor: palette.surfaceHigh,
    marginBottom: spacing.lg,
  },
  check: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: 'rgba(52,211,153,0.16)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  qrWrap: { marginVertical: spacing.lg, alignItems: 'center' },
});
