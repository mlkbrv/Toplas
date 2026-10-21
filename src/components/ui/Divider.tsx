import { StyleProp, View, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { palette } from '../../theme';

type DividerProps = {
  style?: StyleProp<ViewStyle>;
  /** Thin luminous gradient line instead of a flat border. */
  glow?: boolean;
};

export function Divider({ style, glow }: DividerProps) {
  if (glow) {
    return (
      <LinearGradient
        colors={['transparent', palette.violet, 'transparent']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={[{ height: 1, opacity: 0.5, borderRadius: 1 }, style]}
      />
    );
  }
  return <View style={[{ height: 1, backgroundColor: palette.border }, style]} />;
}
