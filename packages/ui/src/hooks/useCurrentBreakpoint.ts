import { useBreakpointValue } from './useBreakpointValue';

export const useCurrentBreakpoint = () =>
  useBreakpointValue({ base: 'base', sm: 'sm', md: 'md', lg: 'lg', xl: 'xl', '2xl': '2xl' } as const) ?? '2xl';
