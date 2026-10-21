import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { palette, spacing } from '../theme';
import {
  AppText,
  Avatar,
  BarChart,
  Badge,
  Button,
  Card,
  Chip,
  Divider,
  EmptyState,
  Header,
  Icon,
  Screen,
  StatCard,
} from '../components/ui';
import {
  DASHBOARD_SUMMARY,
  ORGANIZER_EVENT_ROWS,
  REGISTRATIONS_SERIES,
  VIEWS_SERIES,
} from '../data/metrics';
import { getEvent } from '../data/events';
import { ATTENDEES } from '../data/users';
import { useLocale } from '../i18n/useLocale';
import { useAppNavigation } from '../navigation/types';

type Tab = 'overview' | 'events' | 'attendees' | 'promotions' | 'analytics';

function Progress({ value }: { value: number }) {
  return (
    <View style={styles.track}>
      <View style={[styles.fill, { width: `${Math.round(value * 100)}%` }]} />
    </View>
  );
}

export function OrganizerDashboardScreen() {
  const { t, L } = useLocale();
  const navigation = useAppNavigation();
  const [tab, setTab] = useState<Tab>('overview');
  const s = DASHBOARD_SUMMARY;

  const tabs: Tab[] = ['overview', 'events', 'attendees', 'promotions', 'analytics'];
  const tabLabel = (x: Tab) => t(`organizer.${x}`);

  return (
    <Screen scroll edges={['top']} padded={false}>
      <View style={styles.pad}>
        <Header title={t('organizer.title')} onBack={() => navigation.goBack()} />
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabs}>
        {tabs.map((x) => (
          <Chip key={x} label={tabLabel(x)} selected={tab === x} onPress={() => setTab(x)} />
        ))}
      </ScrollView>

      <View style={styles.pad}>
        {tab === 'overview' && (
          <View style={{ marginTop: spacing.lg, gap: spacing.md }}>
            <View style={styles.statRow}>
              <StatCard label={t('organizer.totalEvents')} value={`${s.totalEvents}`} icon="calendar-outline" />
              <StatCard label={t('organizer.registrations')} value={s.registrations.toLocaleString()} icon="people-outline" accent={palette.cyan} />
            </View>
            <View style={styles.statRow}>
              <StatCard label={t('organizer.revenue')} value={`₼${s.revenue.toLocaleString()}`} icon="cash-outline" accent={palette.success} />
              <StatCard label={t('organizer.attendanceRate')} value={`${Math.round(s.attendanceRate * 100)}%`} icon="checkmark-done-outline" accent={palette.magenta} />
            </View>
            <View style={styles.statRow}>
              <StatCard label={t('organizer.pageViews')} value={s.pageViews.toLocaleString()} icon="eye-outline" />
              <StatCard label={t('organizer.conversion')} value={`${Math.round(s.conversion * 100)}%`} icon="trending-up-outline" accent={palette.cyan} />
            </View>

            <Card padded style={{ marginTop: spacing.sm }}>
              <View style={styles.chartHead}>
                <AppText variant="cardTitle">{t('organizer.registrations')}</AppText>
                <Badge label={t('organizer.last7')} color={palette.lavender} />
              </View>
              <View style={{ marginTop: spacing.md }}>
                <BarChart data={REGISTRATIONS_SERIES} />
              </View>
            </Card>

            <Button title={t('organizer.createEvent')} icon="add" onPress={() => navigation.navigate('CreateEvent')} />
            <AppText variant="tiny" color={palette.textMuted} center>
              {t('common.demoNotice')}
            </AppText>
          </View>
        )}

        {tab === 'events' && (
          <View style={{ marginTop: spacing.lg, gap: spacing.md }}>
            {ORGANIZER_EVENT_ROWS.map((row) => {
              const ev = getEvent(row.eventId);
              if (!ev) return null;
              return (
                <Card key={row.eventId} padded>
                  <AppText variant="cardTitle" numberOfLines={1}>
                    {L(ev.title)}
                  </AppText>
                  <AppText variant="meta" color={palette.textSecondary} style={{ marginTop: 4 }}>
                    {t('organizer.registeredOf', { registered: row.registered, capacity: row.capacity })}
                  </AppText>
                  <View style={{ marginTop: spacing.sm }}>
                    <Progress value={row.registered / row.capacity} />
                  </View>
                  {row.checkedIn > 0 && (
                    <AppText variant="meta" color={palette.success} style={{ marginTop: 6 }}>
                      {t('organizer.checkedIn', { count: row.checkedIn })}
                    </AppText>
                  )}
                  <Divider style={{ marginVertical: spacing.md }} />
                  <View style={styles.actions}>
                    <DashAction icon="create-outline" label={t('organizer.editEvent')} />
                    <DashAction icon="copy-outline" label={t('organizer.duplicate')} />
                    <DashAction icon="qr-code-outline" label={t('organizer.checkIn')} />
                    <DashAction icon="close-circle-outline" label={t('organizer.cancelEvent')} />
                  </View>
                </Card>
              );
            })}
          </View>
        )}

        {tab === 'attendees' && (
          <View style={{ marginTop: spacing.lg }}>
            <Card padded>
              {ATTENDEES.map((a, i) => (
                <View key={a.id}>
                  {i > 0 && <Divider style={{ marginVertical: spacing.sm }} />}
                  <View style={styles.attendee}>
                    <Avatar uri={a.avatar} size={40} />
                    <AppText variant="bodyMedium" style={{ flex: 1, marginLeft: spacing.md }}>
                      {a.name}
                    </AppText>
                    <Badge label={t('myEvents.confirmed')} color={palette.success} />
                  </View>
                </View>
              ))}
            </Card>
          </View>
        )}

        {tab === 'promotions' && (
          <View style={{ marginTop: spacing.lg, gap: spacing.md }}>
            <Card padded>
              <View style={styles.promoHead}>
                <Icon name="star-outline" size={20} color={palette.lavender} />
                <AppText variant="cardTitle" style={{ marginLeft: spacing.sm }}>
                  {t('organizer.promoteFeatured')}
                </AppText>
              </View>
              <Button title={t('organizer.promote')} variant="secondary" onPress={() => {}} style={{ marginTop: spacing.md }} />
            </Card>
            <Card padded>
              <View style={styles.promoHead}>
                <Icon name="megaphone-outline" size={20} color={palette.magenta} />
                <AppText variant="cardTitle" style={{ marginLeft: spacing.sm }}>
                  {t('organizer.promoteSponsored')}
                </AppText>
              </View>
              <Button title={t('organizer.promote')} variant="secondary" onPress={() => {}} style={{ marginTop: spacing.md }} />
            </Card>
            <AppText variant="meta" color={palette.textMuted} center>
              {t('organizer.promoteNote')}
            </AppText>
          </View>
        )}

        {tab === 'analytics' && (
          <View style={{ marginTop: spacing.lg, gap: spacing.md }}>
            <Card padded>
              <View style={styles.chartHead}>
                <AppText variant="cardTitle">{t('organizer.pageViews')}</AppText>
                <Badge label={t('organizer.last7')} color={palette.lavender} />
              </View>
              <View style={{ marginTop: spacing.md }}>
                <BarChart data={VIEWS_SERIES} />
              </View>
            </Card>
            <Card padded>
              <View style={styles.chartHead}>
                <AppText variant="cardTitle">{t('organizer.registrations')}</AppText>
                <Badge label={t('organizer.last7')} color={palette.lavender} />
              </View>
              <View style={{ marginTop: spacing.md }}>
                <BarChart data={REGISTRATIONS_SERIES} />
              </View>
            </Card>
            <EmptyState icon="bar-chart-outline" title={t('common.demoNotice')} />
          </View>
        )}
      </View>
    </Screen>
  );
}

function DashAction({ icon, label }: { icon: string; label: string }) {
  return (
    <View style={styles.dashAction}>
      <Icon name={icon} size={18} color={palette.violetBright} />
      <AppText variant="tiny" color={palette.textSecondary} center style={{ marginTop: 4 }}>
        {label}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  pad: { paddingHorizontal: spacing.xl },
  tabs: { paddingHorizontal: spacing.xl, gap: spacing.sm, marginTop: spacing.sm },
  statRow: { flexDirection: 'row', gap: spacing.md },
  chartHead: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  actions: { flexDirection: 'row', justifyContent: 'space-around' },
  dashAction: { alignItems: 'center', flex: 1 },
  attendee: { flexDirection: 'row', alignItems: 'center' },
  promoHead: { flexDirection: 'row', alignItems: 'center' },
  track: { height: 8, borderRadius: 4, backgroundColor: palette.surfaceHigh, overflow: 'hidden' },
  fill: { height: 8, borderRadius: 4, backgroundColor: palette.violet },
});
