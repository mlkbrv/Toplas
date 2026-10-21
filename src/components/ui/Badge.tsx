import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { gradients, palette, radius } from '../../theme';
import { AppText } from './AppText';
import { Icon } from './Icon';

type BadgeProps = {
  label: string;
  icon?: string;
  /** Tint color for the soft variant. */
  color?: string;
  variant?: 'soft' | 'solid' | 'gradient' | 'glass';
  style?: StyleProp<ViewStyle>;
};

export function Badge({ label, icon, color = palette.violetBright, variant = 'soft', style }: BadgeProps) {
  if (variant === 'gradient') {
    return (
      <LinearGradient
        colors={gradients.primary}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={[styles.badge, style]}
      >
        {icon && <Icon name={icon} size={12} color={palette.white} style={{ marginRight: 4 }} />}
        <AppText variant="tiny" color={palette.white}>
          {label}
        </AppText>
      </LinearGradient>
    );
  }

  const isGlass = variant === 'glass';
  const bg = isGlass ? 'rgba(11,9,20,0.55)' : `${color}26`;

  return (
    <View
      style={[
        styles.badge,
        { backgroundColor: bg, borderWidth: 1, borderColor: isGlass ? palette.border : `${color}40` },
        style,
      ]}
    >
      {icon && <Icon name={icon} size={12} color={isGlass ? palette.text : color} style={{ marginRight: 4 }} />}
      <AppText variant="tiny" color={isGlass ? palette.text : color}>
        {label}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: radius.pill,
  },
});
