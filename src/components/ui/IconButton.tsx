import { Pressable, StyleSheet } from 'react-native';
import { palette, radius } from '../../theme';
import { Icon } from './Icon';

type IconButtonProps = {
  name: string;
  onPress?: () => void;
  size?: number;
  iconSize?: number;
  color?: string;
  variant?: 'surface' | 'glass';
  accessibilityLabel?: string;
};

export function IconButton({
  name,
  onPress,
  size = 44,
  iconSize = 20,
  color = palette.text,
  variant = 'surface',
  accessibilityLabel,
}: IconButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      style={({ pressed }) => [
        styles.btn,
        {
          width: size,
          height: size,
          borderRadius: radius.md,
          backgroundColor: variant === 'glass' ? 'rgba(11,9,20,0.5)' : palette.surface,
          opacity: pressed ? 0.7 : 1,
        },
      ]}
    >
      <Icon name={name} size={iconSize} color={color} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btn: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: palette.border,
  },
});
