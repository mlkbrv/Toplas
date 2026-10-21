import { Pressable, StyleSheet, View } from 'react-native';
import { palette, spacing } from '../../theme';
import { AppText, Avatar, Button, Icon } from '../ui';
import { formatTime } from '../../data/format';
import type { Conversation } from '../../data/types';
import { useLocale } from '../../i18n/useLocale';

type ConversationRowProps = {
  conversation: Conversation;
  onPress?: () => void;
  onAccept?: () => void;
  onDecline?: () => void;
};

export function ConversationRow({ conversation, onPress, onAccept, onDecline }: ConversationRowProps) {
  const { t, L } = useLocale();
  const isRequest = conversation.kind === 'request';

  return (
    <Pressable onPress={onPress} style={styles.row} accessibilityRole="button">
      <Avatar uri={conversation.avatar} size={52} />
      <View style={styles.body}>
        <View style={styles.topLine}>
          <AppText variant="label" numberOfLines={1} style={{ flex: 1 }}>
            {L(conversation.title)}
          </AppText>
          {!isRequest && (
            <AppText variant="tiny" color={palette.textMuted}>
              {formatTime(conversation.timestamp)}
            </AppText>
          )}
        </View>

        {conversation.kind === 'event' && (
          <View style={styles.context}>
            <Icon
              name={conversation.isOrganizerAnnouncement ? 'megaphone-outline' : 'calendar-outline'}
              size={12}
              color={palette.lavender}
            />
            <AppText variant="tiny" color={palette.lavender} style={{ marginLeft: 4 }}>
              {conversation.isOrganizerAnnouncement ? t('inbox.organizerAnnouncement') : t('inbox.eventChats')}
            </AppText>
          </View>
        )}

        <AppText variant="meta" color={palette.textSecondary} numberOfLines={1} style={{ marginTop: 3 }}>
          {L(conversation.lastMessage)}
        </AppText>

        {isRequest && (
          <View style={styles.actions}>
            <Button title={t('inbox.accept')} size="md" onPress={onAccept} style={styles.action} />
            <Button title={t('inbox.decline')} size="md" variant="secondary" onPress={onDecline} style={styles.action} />
          </View>
        )}
      </View>

      {!isRequest && conversation.unread > 0 && (
        <View style={styles.badge}>
          <AppText variant="tiny" color={palette.white}>
            {conversation.unread}
          </AppText>
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
  },
  body: { flex: 1, marginLeft: spacing.md },
  topLine: { flexDirection: 'row', alignItems: 'center' },
  context: { flexDirection: 'row', alignItems: 'center', marginTop: 3 },
  actions: { flexDirection: 'row', gap: spacing.sm, marginTop: spacing.sm },
  action: { flex: 1, height: 40 },
  badge: {
    minWidth: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: palette.violet,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 6,
    marginLeft: spacing.sm,
  },
});
