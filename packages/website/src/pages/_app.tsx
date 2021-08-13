import type { AppProps } from 'next/app';

import { ThemeProvider } from '@coderscamp/ui/theme';

import { Navbar } from '@/components/Navbar';

// eslint-disable-next-line @typescript-eslint/naming-convention
const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider>
      <Navbar />
      <Component {...pageProps} />
    </ThemeProvider>
  );
};

export default MyApp;
