import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { palette } from '../../theme';

type IconProps = {
  name: string;
  size?: number;
  color?: string;
  style?: React.ComponentProps<typeof Ionicons>['style'];
};

/** Thin wrapper over Ionicons so screens don't cast icon names everywhere. */
export function Icon({ name, size = 22, color = palette.text, style }: IconProps) {
  return <Ionicons name={name as React.ComponentProps<typeof Ionicons>['name']} size={size} color={color} style={style} />;
}
