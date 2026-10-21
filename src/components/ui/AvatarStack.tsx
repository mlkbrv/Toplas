import { Image, StyleSheet, View } from 'react-native';
import { palette } from '../../theme';
import { AppText } from './AppText';

type AvatarStackProps = {
  uris: string[];
  size?: number;
  max?: number;
  extraCount?: number;
};

export function AvatarStack({ uris, size = 32, max = 4, extraCount }: AvatarStackProps) {
  const shown = uris.slice(0, max);
  const overflow = extraCount ?? Math.max(0, uris.length - max);

  return (
    <View style={styles.row}>
      {shown.map((uri, i) => (
        <Image
          key={`${uri}-${i}`}
          source={{ uri }}
          style={[
            styles.avatar,
            {
              width: size,
              height: size,
              borderRadius: size / 2,
              marginLeft: i === 0 ? 0 : -size * 0.32,
              zIndex: shown.length - i,
            },
          ]}
        />
      ))}
      {overflow > 0 && (
        <View
          style={[
            styles.more,
            {
              width: size,
              height: size,
              borderRadius: size / 2,
              marginLeft: -size * 0.32,
            },
          ]}
        >
          <AppText variant="tiny" color={palette.text}>
            +{overflow}
          </AppText>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center' },
  avatar: {
    borderWidth: 2,
    borderColor: palette.bg,
    backgroundColor: palette.surface,
  },
  more: {
    borderWidth: 2,
    borderColor: palette.bg,
    backgroundColor: palette.surfaceHigh,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
