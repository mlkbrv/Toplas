import { Pressable, StyleSheet, View } from 'react-native';
import { BlurView } from 'expo-blur';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useTranslation } from 'react-i18next';
import { palette, radius, shadow } from '../theme';
import { AppText, Icon } from '../components/ui';

const TAB_ICON: Record<string, { on: string; off: string; label: string }> = {
  Discover: { on: 'compass', off: 'compass-outline', label: 'tabs.discover' },
  Explore: { on: 'map', off: 'map-outline', label: 'tabs.explore' },
  Communities: { on: 'people', off: 'people-outline', label: 'tabs.communities' },
  Inbox: { on: 'chatbubble-ellipses', off: 'chatbubble-ellipses-outline', label: 'tabs.inbox' },
  Profile: { on: 'person', off: 'person-outline', label: 'tabs.profile' },
};

export function TabBar({ state, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();

  return (
    <View style={[styles.wrap, { paddingBottom: insets.bottom || 12 }]} pointerEvents="box-none">
      <View style={[styles.bar, shadow.nav]}>
        <BlurView intensity={40} tint="dark" style={StyleSheet.absoluteFill} />
        <View style={styles.inner}>
          {state.routes.map((route, index) => {
            const meta = TAB_ICON[route.name];
            if (!meta) return null;
            const focused = state.index === index;

            const onPress = () => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              });
              if (!focused && !event.defaultPrevented) {
                navigation.navigate(route.name);
              }
            };

            return (
              <Pressable
                key={route.key}
                onPress={onPress}
                style={styles.tab}
                accessibilityRole="button"
                accessibilityState={{ selected: focused }}
                accessibilityLabel={t(meta.label as never)}
              >
                <View style={[styles.iconWrap, focused && styles.iconWrapActive]}>
                  <Icon
                    name={focused ? meta.on : meta.off}
                    size={22}
                    color={focused ? palette.violetBright : palette.textMuted}
                  />
                </View>
                <AppText variant="tiny" color={focused ? palette.violetBright : palette.textMuted}>
                  {t(meta.label as never)}
                </AppText>
              </Pressable>
            );
          })}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  bar: {
    width: '100%',
    borderRadius: radius.xl + 4,
    borderWidth: 1,
    borderColor: palette.border,
    overflow: 'hidden',
    backgroundColor: 'rgba(16,13,28,0.82)',
  },
  inner: {
    flexDirection: 'row',
    paddingVertical: 10,
  },
  tab: { flex: 1, alignItems: 'center', gap: 3 },
  iconWrap: {
    width: 42,
    height: 30,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconWrapActive: {
    backgroundColor: 'rgba(139,92,246,0.18)',
  },
});
