import type { ComponentType } from 'react';

export type Import<Props = never> = Promise<Props extends never ? ComponentType : ComponentType<Props>>;
