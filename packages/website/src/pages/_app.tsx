import 'swiper/swiper.scss';

import type { AppProps } from 'next/app';

import { ThemeProvider } from '@coderscamp/ui/theme';

import { Navbar } from '@/components/Navbar';

// eslint-disable-next-line @typescript-eslint/naming-convention
const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider globalStyles={{ 'html, body': { backgroundColor: 'white' } }}>
      <Navbar />
      <Component {...pageProps} />
    </ThemeProvider>
  );
};

export default MyApp;
