import type { CSSObject } from '@emotion/react';

export const createStyles = <Styles extends CSSObject>(styles: Styles): Styles => styles;
