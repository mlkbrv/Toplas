import React from 'react';
import {
  RefreshControl,
  ScrollView,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import { Edge, SafeAreaView } from 'react-native-safe-area-context';
import { layout, palette } from '../../theme';
import { AmbientGlow } from './AmbientGlow';

type ScreenProps = {
  children: React.ReactNode;
  scroll?: boolean;
  glow?: boolean;
  padded?: boolean;
  edges?: Edge[];
  contentStyle?: StyleProp<ViewStyle>;
  refreshing?: boolean;
  onRefresh?: () => void;
};

export function Screen({
  children,
  scroll,
  glow = true,
  padded = true,
  edges = ['top'],
  contentStyle,
  refreshing,
  onRefresh,
}: ScreenProps) {
  const padding = padded ? { paddingHorizontal: layout.screenPadding } : null;

  return (
    <SafeAreaView style={styles.safe} edges={edges}>
      {glow && <AmbientGlow size={420} opacity={0.4} style={styles.topGlow} />}
      {scroll ? (
        <ScrollView
          style={styles.flex}
          contentContainerStyle={[padding, styles.scrollContent, contentStyle]}
          showsVerticalScrollIndicator={false}
          refreshControl={
            onRefresh ? (
              <RefreshControl
                refreshing={!!refreshing}
                onRefresh={onRefresh}
                tintColor={palette.violetBright}
                colors={[palette.violet]}
              />
            ) : undefined
          }
        >
          {children}
        </ScrollView>
      ) : (
        <View style={[styles.flex, padding, contentStyle]}>{children}</View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: palette.bg },
  flex: { flex: 1 },
  scrollContent: { paddingBottom: layout.tabBarHeight + 32 },
  topGlow: {
    position: 'absolute',
    top: -160,
    right: -120,
  },
});
