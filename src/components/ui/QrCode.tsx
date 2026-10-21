import { ReactElement } from 'react';
import { View } from 'react-native';
import Svg, { Rect } from 'react-native-svg';
import { palette } from '../../theme';

type QrCodeProps = {
  value: string;
  size?: number;
};

/** A deterministic faux-QR built from the string. Decorative/demo only. */
export function QrCode({ value, size = 180 }: QrCodeProps) {
  const modules = 25;
  const inner = size - 16;
  const cell = inner / modules;

  // Simple seeded PRNG from the string.
  let seed = 0;
  for (let i = 0; i < value.length; i++) seed = (seed * 31 + value.charCodeAt(i)) >>> 0;
  const rand = () => {
    seed = (seed * 1103515245 + 12345) & 0x7fffffff;
    return seed / 0x7fffffff;
  };

  const isFinder = (r: number, c: number) => {
    const inBox = (br: number, bc: number) => r >= br && r < br + 7 && c >= bc && c < bc + 7;
    return inBox(0, 0) || inBox(0, modules - 7) || inBox(modules - 7, 0);
  };

  const finderFilled = (r: number, c: number) => {
    const local = (br: number, bc: number) => {
      const rr = r - br;
      const cc = c - bc;
      const edge = rr === 0 || rr === 6 || cc === 0 || cc === 6;
      const core = rr >= 2 && rr <= 4 && cc >= 2 && cc <= 4;
      return edge || core;
    };
    if (r < 7 && c < 7) return local(0, 0);
    if (r < 7 && c >= modules - 7) return local(0, modules - 7);
    if (r >= modules - 7 && c < 7) return local(modules - 7, 0);
    return false;
  };

  const rects: ReactElement[] = [];
  for (let r = 0; r < modules; r++) {
    for (let c = 0; c < modules; c++) {
      const filled = isFinder(r, c) ? finderFilled(r, c) : rand() > 0.55;
      if (filled) {
        rects.push(
          <Rect
            key={`${r}-${c}`}
            x={c * cell}
            y={r * cell}
            width={cell}
            height={cell}
            fill={palette.bg}
          />
        );
      }
    }
  }

  return (
    <View style={{ width: size, height: size, backgroundColor: palette.white, borderRadius: 12, padding: 8 }}>
      <Svg width={inner} height={inner}>{rects}</Svg>
    </View>
  );
}
