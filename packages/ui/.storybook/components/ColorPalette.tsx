import React from 'react'
import { useTheme } from "@chakra-ui/react";
import { ColorPalette as StorybookCollorPalette, ColorItem } from '@storybook/addon-docs/blocks';
import { ThemeProvider } from '../../src/theme';

interface ColorPaletteProps {
  color: string;
}

const AllVariants = ({color}: ColorPaletteProps) => {
  const theme = useTheme();
  
  return <ColorItem title={`${color}`} subtitle='' colors={theme.colors[color]} />
};

const SingleVariant = ({color}: ColorPaletteProps) => {
  const theme = useTheme();
  const pickedColor = theme.colors[color];

  return <>{
    Object.keys(pickedColor).map((range) => (
      <ColorItem title={`${color}.${range}`} subtitle={pickedColor[range]} colors={[pickedColor[range]]} />
    ))
  }</>
}

export const ColorPalette = ({color}: ColorPaletteProps) => {
  return (
    <ThemeProvider>
      <StorybookCollorPalette>
        <AllVariants color={color}/>
        <SingleVariant color={color}/>
      </StorybookCollorPalette>
    </ThemeProvider>
  )
};
