import {
  ActivityIndicator,
  Animated,
  Pressable,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { gradients, palette, radius, shadow, spacing } from '../../theme';
import { AppText } from './AppText';
import { Icon } from './Icon';
import { usePressScale } from './usePressScale';

type Variant = 'primary' | 'secondary' | 'ghost';
type Size = 'md' | 'lg';

type ButtonProps = {
  title: string;
  onPress?: () => void;
  variant?: Variant;
  size?: Size;
  icon?: string;
  iconRight?: string;
  fullWidth?: boolean;
  loading?: boolean;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
};

export function Button({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  icon,
  iconRight,
  fullWidth,
  loading,
  disabled,
  style,
}: ButtonProps) {
  const { scale, onPressIn, onPressOut } = usePressScale();
  const height = size === 'lg' ? 54 : 48;
  const isPrimary = variant === 'primary';
  const textColor = isPrimary ? palette.white : variant === 'secondary' ? palette.text : palette.violetBright;
  const disabledStyle = disabled || loading ? { opacity: 0.5 } : null;

  const inner = (
    <View style={styles.inner}>
      {loading ? (
        <ActivityIndicator color={textColor} />
      ) : (
        <>
          {icon && <Icon name={icon} size={18} color={textColor} style={{ marginRight: 8 }} />}
          <AppText variant="button" color={textColor}>
            {title}
          </AppText>
          {iconRight && <Icon name={iconRight} size={18} color={textColor} style={{ marginLeft: 8 }} />}
        </>
      )}
    </View>
  );

  return (
    <Pressable
      onPress={disabled || loading ? undefined : onPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      accessibilityRole="button"
      accessibilityState={{ disabled: !!disabled, busy: !!loading }}
      style={[fullWidth && { alignSelf: 'stretch' }, style]}
    >
      <Animated.View
        style={[
          { transform: [{ scale }], height, borderRadius: radius.button },
          fullWidth && { width: '100%' },
          isPrimary && shadow.glowViolet,
          disabledStyle,
        ]}
      >
        {isPrimary ? (
          <LinearGradient
            colors={gradients.primaryButton}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={[styles.surface, { height, borderRadius: radius.button }]}
          >
            {inner}
          </LinearGradient>
        ) : (
          <View
            style={[
              styles.surface,
              { height, borderRadius: radius.button },
              variant === 'secondary' && styles.secondary,
            ]}
          >
            {inner}
          </View>
        )}
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  surface: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
  },
  secondary: {
    backgroundColor: palette.surface,
    borderWidth: 1,
    borderColor: palette.borderStrong,
  },
  inner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
