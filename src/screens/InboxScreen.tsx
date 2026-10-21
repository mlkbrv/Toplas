import { useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { spacing } from '../theme';
import { AppText, EmptyState, Screen, SegmentedControl } from '../components/ui';
import { ConversationRow } from '../components/cards';
import { CONVERSATIONS } from '../data/conversations';
import { useLocale } from '../i18n/useLocale';
import { useAppNavigation } from '../navigation/types';

type Tab = 'messages' | 'event' | 'requests';

export function InboxScreen() {
  const { t } = useLocale();
  const navigation = useAppNavigation();
  const [tab, setTab] = useState<Tab>('messages');

  const list = useMemo(() => {
    if (tab === 'messages') return CONVERSATIONS.filter((c) => c.kind === 'dm');
    if (tab === 'event') return CONVERSATIONS.filter((c) => c.kind === 'event');
    return CONVERSATIONS.filter((c) => c.kind === 'request');
  }, [tab]);

  const options = [
    { key: 'messages', label: t('inbox.messages') },
    { key: 'event', label: t('inbox.eventChats') },
    { key: 'requests', label: t('inbox.requests') },
  ];

  const emptyFor = () => {
    if (tab === 'requests')
      return <EmptyState icon="person-add-outline" title={t('inbox.emptyRequests')} />;
    return (
      <EmptyState
        icon="chatbubbles-outline"
        title={t('inbox.emptyMessages')}
        hint={t('inbox.emptyMessagesHint')}
      />
    );
  };

  return (
    <Screen scroll>
      <AppText variant="headline">{t('inbox.title')}</AppText>

      <View style={{ marginTop: spacing.lg }}>
        <SegmentedControl options={options} value={tab} onChange={(k) => setTab(k as Tab)} />
      </View>

      {list.length === 0 ? (
        emptyFor()
      ) : (
        <View style={styles.list}>
          {list.map((c) => (
            <ConversationRow
              key={c.id}
              conversation={c}
              onPress={() => navigation.navigate('Chat', { conversationId: c.id })}
              onAccept={() => navigation.navigate('Chat', { conversationId: c.id })}
              onDecline={() => {}}
            />
          ))}
        </View>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  list: { marginTop: spacing.lg },
});
