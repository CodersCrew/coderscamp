import { mode, Styles } from '@chakra-ui/theme-tools';

export const styles: Styles = {
  global: (props) => ({
    body: {
      bg: mode('gray.50', 'gray.800')(props),
    },
  }),
};
