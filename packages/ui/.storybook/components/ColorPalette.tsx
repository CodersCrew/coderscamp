import React from 'react'
import { ColorPalette as StorybookCollorPalette, ColorItem } from '@storybook/addon-docs/blocks';
import { colors } from '../../src/theme/overwrites/foundations/colors';

interface ColorPaletteProps {
  color: string;
}

export const AllVariants = ({color}: ColorPaletteProps) => {
  return (
    <ColorItem title='' subtitle='' colors={Object.values(colors[color])} />
  )
};

export const SingleVariant = ({color}: ColorPaletteProps) => {
  const pickedColor = colors[color];
  return <>{
    Object.keys(pickedColor).map((value) => (
      <ColorItem title={`${color}.${value}`} subtitle={pickedColor[value]} colors={[pickedColor[value]]} />
    ))
  }</>
}

export const ColorPalette = ({color}: ColorPaletteProps) => {
  return (
      <StorybookCollorPalette>
        <AllVariants color={color}/>
        <SingleVariant color={color}/>
      </StorybookCollorPalette>
  )
};
