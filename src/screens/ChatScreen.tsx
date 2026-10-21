import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { gradients, palette, radius, spacing } from '../theme';
import { AppText, Avatar, Icon, IconButton } from '../components/ui';
import { getConversation } from '../data/conversations';
import type { ChatMessage } from '../data/types';
import { useLocale } from '../i18n/useLocale';
import { useAppNavigation } from '../navigation/types';
import type { RootStackParamList } from '../navigation/types';

export function ChatScreen() {
  const route = useRoute<RouteProp<RootStackParamList, 'Chat'>>();
  const navigation = useAppNavigation();
  const insets = useSafeAreaInsets();
  const { t, L } = useLocale();

  const conversation = getConversation(route.params.conversationId);
  const [messages, setMessages] = useState<ChatMessage[]>(conversation?.messages ?? []);
  const [text, setText] = useState('');

  if (!conversation) {
    return (
      <View style={styles.missing}>
        <AppText variant="body">Conversation not found</AppText>
      </View>
    );
  }

  const isGroup = conversation.kind === 'event';

  const send = () => {
    const value = text.trim();
    if (!value) return;
    setMessages((prev) => [
      ...prev,
      { id: `local-${prev.length}`, fromMe: true, text: { en: value, az: value }, time: 'now' },
    ]);
    setText('');
  };

  return (
    <View style={styles.root}>
      <View style={[styles.header, { paddingTop: insets.top + 8 }]}>
        <IconButton name="chevron-back" onPress={() => navigation.goBack()} accessibilityLabel={t('common.back')} />
        <Avatar uri={conversation.avatar} size={38} />
        <View style={{ flex: 1, marginLeft: spacing.sm }}>
          <AppText variant="label" numberOfLines={1}>
            {L(conversation.title)}
          </AppText>
          {isGroup && (
            <AppText variant="tiny" color={palette.lavender}>
              {t('inbox.eventChats')}
            </AppText>
          )}
        </View>
        <IconButton name="ellipsis-vertical" onPress={() => {}} size={38} iconSize={18} accessibilityLabel={t('inbox.reportUser')} />
      </View>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={8}
      >
        <ScrollView contentContainerStyle={styles.messages} showsVerticalScrollIndicator={false}>
          {messages.map((m) => (
            <View key={m.id} style={[styles.bubbleRow, m.fromMe ? styles.rowMe : styles.rowOther]}>
              {m.fromMe ? (
                <LinearGradient
                  colors={gradients.primaryButton}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={[styles.bubble, styles.bubbleMe]}
                >
                  <AppText variant="body" color={palette.white}>
                    {L(m.text)}
                  </AppText>
                  <AppText variant="tiny" color="rgba(255,255,255,0.7)" style={styles.time}>
                    {m.time}
                  </AppText>
                </LinearGradient>
              ) : (
                <View style={[styles.bubble, styles.bubbleOther]}>
                  {isGroup && m.author && (
                    <AppText variant="tiny" color={palette.lavender} style={{ marginBottom: 2 }}>
                      {m.author}
                    </AppText>
                  )}
                  <AppText variant="body" color={palette.text}>
                    {L(m.text)}
                  </AppText>
                  <AppText variant="tiny" color={palette.textMuted} style={styles.time}>
                    {m.time}
                  </AppText>
                </View>
              )}
            </View>
          ))}
        </ScrollView>

        <View style={[styles.inputBar, { paddingBottom: insets.bottom || spacing.md }]}>
          <Pressable style={styles.iconBtn} accessibilityRole="button">
            <Icon name="add-circle-outline" size={24} color={palette.textMuted} />
          </Pressable>
          <TextInput
            style={styles.input}
            placeholder={t('inbox.typeMessage')}
            placeholderTextColor={palette.textMuted}
            value={text}
            onChangeText={setText}
            multiline
          />
          <Pressable style={styles.send} onPress={send} accessibilityRole="button" accessibilityLabel="Send">
            <Icon name="arrow-up" size={20} color={palette.white} />
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: palette.bg },
  missing: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: palette.bg },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: palette.border,
    backgroundColor: palette.bgSecondary,
  },
  messages: { padding: spacing.lg, gap: spacing.sm },
  bubbleRow: { flexDirection: 'row' },
  rowMe: { justifyContent: 'flex-end' },
  rowOther: { justifyContent: 'flex-start' },
  bubble: { maxWidth: '80%', padding: spacing.md, borderRadius: radius.lg },
  bubbleMe: { borderBottomRightRadius: 4 },
  bubbleOther: {
    backgroundColor: palette.surface,
    borderWidth: 1,
    borderColor: palette.border,
    borderBottomLeftRadius: 4,
  },
  time: { alignSelf: 'flex-end', marginTop: 4 },
  inputBar: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    gap: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: palette.border,
    backgroundColor: palette.bgSecondary,
  },
  iconBtn: { height: 44, justifyContent: 'center' },
  input: {
    flex: 1,
    maxHeight: 120,
    minHeight: 44,
    backgroundColor: palette.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: palette.border,
    paddingHorizontal: spacing.md,
    paddingTop: 12,
    color: palette.text,
    fontFamily: 'Inter_400Regular',
    fontSize: 15,
  },
  send: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: palette.violet,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
