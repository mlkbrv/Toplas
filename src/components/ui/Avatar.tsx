import { Image, StyleSheet, View } from 'react-native';
import { palette } from '../../theme';
import { Icon } from './Icon';

type AvatarProps = {
  uri: string;
  size?: number;
  verified?: boolean;
  ring?: boolean;
};

export function Avatar({ uri, size = 40, verified, ring }: AvatarProps) {
  return (
    <View style={{ width: size, height: size }}>
      <Image
        source={{ uri }}
        style={[
          styles.img,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
            borderWidth: ring ? 2 : 1,
            borderColor: ring ? palette.violet : palette.border,
          },
        ]}
      />
      {verified && (
        <View style={[styles.verify, { borderRadius: size / 4 }]}>
          <Icon name="checkmark" size={10} color={palette.white} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  img: {
    backgroundColor: palette.surface,
  },
  verify: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 16,
    height: 16,
    backgroundColor: palette.violet,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: palette.bg,
  },
});
