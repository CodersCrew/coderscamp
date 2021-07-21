import React from 'react'
import { ColorPalette, ColorItem } from '@storybook/addon-docs/blocks';
import { colors } from '../../src/theme/overwrites/foundations/colors';
interface SelectedColorPaletteProps {
  color: string;
}

export const SelectedColorPalette = ({color}: SelectedColorPaletteProps) => {
  const allColorVariantsInOneItem = (color: string) => {
    return <ColorItem title='' subtitle='' colors={Object.values(colors[color])} />;
  };

  const eachColorVariantInSeparateItem = (color: string) => {
    const selectedColor = colors[color];
    return Object.keys(selectedColor).map((value) => (
      <ColorItem title={`${color}.${value}`} subtitle={selectedColor[value]} colors={[selectedColor[value]]} />
    ));
  };
  
  return (
    <ColorPalette>
      {allColorVariantsInOneItem(color)}
      {eachColorVariantInSeparateItem(color)}
    </ColorPalette>
  )
};