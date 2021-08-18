import { keyframes } from '@coderscamp/ui/components/Keyframes';

const sliding = keyframes`
   100% {
    transform: translateX(-66.6666%);
  }
`;
export const animation = `${sliding} infinite 20s linear`;
