import { Pressable, StyleSheet, View } from 'react-native';
import { palette, radius, spacing } from '../../theme';
import { AppText, Badge, Divider, Icon, RemoteImage } from '../ui';
import { formatDateTime } from '../../data/format';
import type { Booking, BookingStatus, EventItem } from '../../data/types';
import { useLocale } from '../../i18n/useLocale';

type TicketCardProps = {
  booking: Booking;
  event: EventItem;
  onView?: () => void;
  onDirections?: () => void;
  onAddCalendar?: () => void;
  onCancel?: () => void;
};

const STATUS_COLOR: Record<BookingStatus, string> = {
  confirmed: palette.success,
  pending: palette.warning,
  waitlisted: palette.cyan,
  attended: palette.textSecondary,
  cancelled: palette.error,
};

const STATUS_KEY: Record<BookingStatus, string> = {
  confirmed: 'myEvents.confirmed',
  pending: 'myEvents.pending',
  waitlisted: 'myEvents.waitlisted',
  attended: 'myEvents.attended',
  cancelled: 'myEvents.cancelled',
};

function Action({ icon, label, onPress }: { icon: string; label: string; onPress?: () => void }) {
  return (
    <Pressable style={styles.action} onPress={onPress} accessibilityRole="button" accessibilityLabel={label}>
      <Icon name={icon} size={18} color={palette.violetBright} />
      <AppText variant="tiny" color={palette.textSecondary} center style={{ marginTop: 4 }}>
        {label}
      </AppText>
    </Pressable>
  );
}

export function TicketCard({ booking, event, onView, onDirections, onAddCalendar, onCancel }: TicketCardProps) {
  const { t, lang, L } = useLocale();
  const color = STATUS_COLOR[booking.status];
  const canView = booking.status === 'confirmed' || booking.status === 'pending';
  const canCancel = booking.status === 'confirmed' || booking.status === 'pending';

  return (
    <View style={styles.card}>
      <View style={styles.top}>
        <RemoteImage uri={event.cover} radius={radius.md} style={styles.image} />
        <View style={styles.info}>
          <AppText variant="cardTitle" numberOfLines={2}>
            {L(event.title)}
          </AppText>
          <View style={styles.metaRow}>
            <Icon name="calendar-outline" size={13} color={palette.textSecondary} />
            <AppText variant="meta" color={palette.textSecondary} numberOfLines={1} style={{ marginLeft: 5 }}>
              {formatDateTime(event.start, lang)}
            </AppText>
          </View>
          <View style={styles.metaRow}>
            <Icon name="ticket-outline" size={13} color={palette.textSecondary} />
            <AppText variant="meta" color={palette.textSecondary} numberOfLines={1} style={{ marginLeft: 5 }}>
              {L(booking.ticketType)}
            </AppText>
          </View>
          <Badge label={t(STATUS_KEY[booking.status] as never)} color={color} style={{ marginTop: 8 }} />
        </View>
      </View>

      <Divider style={{ marginVertical: spacing.md }} />

      <View style={styles.actions}>
        {canView && <Action icon="qr-code-outline" label={t('myEvents.viewTicket')} onPress={onView} />}
        {event.format !== 'online' && (
          <Action icon="navigate-outline" label={t('myEvents.directions')} onPress={onDirections} />
        )}
        <Action icon="calendar-outline" label={t('myEvents.addToCalendar')} onPress={onAddCalendar} />
        {canCancel && <Action icon="close-circle-outline" label={t('myEvents.cancelBooking')} onPress={onCancel} />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: palette.card,
    borderRadius: radius.card,
    borderWidth: 1,
    borderColor: palette.border,
    padding: spacing.lg,
  },
  top: { flexDirection: 'row' },
  image: { width: 84, height: 84, borderRadius: radius.md },
  info: { flex: 1, marginLeft: spacing.md },
  metaRow: { flexDirection: 'row', alignItems: 'center', marginTop: 5 },
  actions: { flexDirection: 'row', justifyContent: 'space-around' },
  action: { alignItems: 'center', flex: 1 },
});
