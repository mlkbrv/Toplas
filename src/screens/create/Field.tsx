import { StyleSheet, TextInput, View } from 'react-native';
import { palette, radius, spacing } from '../../theme';
import { AppText } from '../../components/ui';

type FieldProps = {
  label: string;
  value: string;
  onChangeText: (v: string) => void;
  placeholder?: string;
  multiline?: boolean;
  keyboardType?: 'default' | 'numeric';
  required?: boolean;
  error?: boolean;
};

export function Field({
  label,
  value,
  onChangeText,
  placeholder,
  multiline,
  keyboardType = 'default',
  required,
  error,
}: FieldProps) {
  return (
    <View style={styles.wrap}>
      <View style={styles.labelRow}>
        <AppText variant="label" color={palette.textSecondary}>
          {label}
        </AppText>
        {required && <AppText variant="label" color={palette.error}> *</AppText>}
      </View>
      <TextInput
        style={[styles.input, multiline && styles.multiline, error && styles.inputError]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={palette.textMuted}
        multiline={multiline}
        keyboardType={keyboardType}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { marginBottom: spacing.lg },
  labelRow: { flexDirection: 'row', marginBottom: spacing.sm },
  input: {
    backgroundColor: palette.surface,
    borderRadius: radius.input,
    borderWidth: 1,
    borderColor: palette.border,
    paddingHorizontal: spacing.lg,
    minHeight: 50,
    color: palette.text,
    fontFamily: 'Inter_400Regular',
    fontSize: 15,
    paddingTop: 14,
    paddingBottom: 14,
  },
  multiline: { minHeight: 100, textAlignVertical: 'top' },
  inputError: { borderColor: palette.error },
});
