import { useRef, useState } from 'react';
import { Animated, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { gradients } from '../../theme';

type RemoteImageProps = {
  uri: string;
  style?: StyleProp<ViewStyle>;
  radius?: number;
  /** Optional dark scrim gradient on top (for text legibility). */
  scrim?: boolean;
};

/**
 * Image with a violet gradient placeholder underneath. If the photo is slow or
 * fails, the gradient keeps the surface looking intentional (flat 2D glow).
 */
export function RemoteImage({ uri, style, radius = 0, scrim }: RemoteImageProps) {
  const opacity = useRef(new Animated.Value(0)).current;
  const [loaded, setLoaded] = useState(false);

  return (
    <View style={[styles.container, { borderRadius: radius }, style]}>
      <LinearGradient
        colors={gradients.violetSoft}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
      <Animated.Image
        source={{ uri }}
        resizeMode="cover"
        onLoad={() => {
          setLoaded(true);
          Animated.timing(opacity, {
            toValue: 1,
            duration: 240,
            useNativeDriver: true,
          }).start();
        }}
        style={[StyleSheet.absoluteFill, { opacity }]}
      />
      {scrim && loaded && (
        <LinearGradient
          colors={gradients.cardScrim}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          style={StyleSheet.absoluteFill}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    backgroundColor: '#171323',
  },
});
