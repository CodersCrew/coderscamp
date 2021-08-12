import type { AppProps } from 'next/app';

import { ThemeProvider } from '@coderscamp/ui/theme';

// eslint-disable-next-line @typescript-eslint/naming-convention
const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider globalStyles={{ 'html, body': { backgroundColor: 'white' } }}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
};

export default MyApp;
