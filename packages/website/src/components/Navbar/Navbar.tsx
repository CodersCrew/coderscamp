import { Button } from '@coderscamp/ui/components/Button';
import { Center } from '@coderscamp/ui/components/Center';
import { Flex } from '@coderscamp/ui/components/Flex';
import { HStack } from '@coderscamp/ui/components/Stack';
import { useBreakpointValue } from '@coderscamp/ui/hooks/useBreakpointValue';

import { DesktopBaseNavbar, MobileBaseNavbar } from './BaseNavbar';

export const Navbar = () => {
  const baseNavbar = useBreakpointValue({ base: <MobileBaseNavbar />, lg: <DesktopBaseNavbar /> } as const);
  const buttonSize = useBreakpointValue({ base: 'xs', sm: 'md' } as const);
  const horizontalPadding = useBreakpointValue({ base: '8px', sm: '18px', md: '24px', lg: '40px' });

  return (
    <Center width="100%">
      <HStack
        py="18px"
        px={horizontalPadding}
        width="min(1920px, 100%)"
        justifyContent="space-between"
        alignItems="center"
        position="relative"
      >
        {baseNavbar}
        <Flex>
          <Button size={buttonSize} mr="12px">
            Zostań mentorem
          </Button>
          <Button size={buttonSize} color="brand">
            Zapisz się na kurs
          </Button>
        </Flex>
      </HStack>
    </Center>
  );
};
