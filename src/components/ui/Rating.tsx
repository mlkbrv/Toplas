import { StyleSheet, View } from 'react-native';
import { palette } from '../../theme';
import { AppText } from './AppText';
import { Icon } from './Icon';

type RatingProps = {
  value: number;
  count?: number;
  size?: number;
};

export function Rating({ value, count, size = 14 }: RatingProps) {
  return (
    <View style={styles.row}>
      <Icon name="star" size={size} color={palette.warning} />
      <AppText variant="label" color={palette.text} style={{ marginLeft: 4 }}>
        {value.toFixed(1)}
      </AppText>
      {typeof count === 'number' && count > 0 && (
        <AppText variant="meta" color={palette.textMuted} style={{ marginLeft: 4 }}>
          ({count})
        </AppText>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center' },
});
