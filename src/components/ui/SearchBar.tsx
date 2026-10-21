import { Pressable, StyleSheet, TextInput, View } from 'react-native';
import { palette, radius, spacing } from '../../theme';
import { AppText } from './AppText';
import { Icon } from './Icon';

type SearchBarProps = {
  placeholder: string;
  value?: string;
  onChangeText?: (text: string) => void;
  onFilterPress?: () => void;
  onPress?: () => void;
  autoFocus?: boolean;
};

/**
 * Rounded search field. When `onPress` is given and no `onChangeText`,
 * it renders as a tappable fake input that opens a dedicated search screen.
 */
export function SearchBar({
  placeholder,
  value,
  onChangeText,
  onFilterPress,
  onPress,
  autoFocus,
}: SearchBarProps) {
  const asButton = !!onPress && !onChangeText;

  return (
    <View style={styles.wrap}>
      <Pressable
        style={styles.field}
        onPress={onPress}
        disabled={!asButton}
        accessibilityRole={asButton ? 'button' : undefined}
      >
        <Icon name="search" size={18} color={palette.textMuted} />
        {asButton ? (
          <AppText variant="body" color={palette.textMuted} style={styles.input}>
            {placeholder}
          </AppText>
        ) : (
          <TextInput
            style={styles.input}
            placeholder={placeholder}
            placeholderTextColor={palette.textMuted}
            value={value}
            onChangeText={onChangeText}
            autoFocus={autoFocus}
            returnKeyType="search"
          />
        )}
      </Pressable>
      {onFilterPress && (
        <Pressable style={styles.filterBtn} onPress={onFilterPress} accessibilityRole="button">
          <Icon name="options-outline" size={20} color={palette.text} />
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  field: {
    flex: 1,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    gap: spacing.md,
    backgroundColor: palette.surface,
    borderRadius: radius.input,
    borderWidth: 1,
    borderColor: palette.border,
  },
  input: {
    flex: 1,
    color: palette.text,
    fontFamily: 'Inter_400Regular',
    fontSize: 15,
    padding: 0,
  },
  filterBtn: {
    width: 50,
    height: 50,
    borderRadius: radius.input,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: palette.surface,
    borderWidth: 1,
    borderColor: palette.border,
  },
});
