import { keyframes } from '@coderscamp/ui/components/Keyframes';

const sliding = keyframes`
   100% {
    transform: translateX(-66.66%);
  }
`;
export const animation = `${sliding} linear infinite`;
