import 'swiper/swiper.scss';

import type { CSSProperties } from 'react';
import type { AppProps } from 'next/app';

import { ThemeProvider } from '@coderscamp/ui/theme';

import { Footer } from '@/components/Footer';
import { Navbar } from '@/components/Navbar';

const globalStyles: Record<string, CSSProperties> = {
  'html, body': { backgroundColor: 'white' },
  '.swiper-wrapper': { alignItems: 'stretch' },
  '.swiper-slide': { height: 'unset' },
};

// eslint-disable-next-line @typescript-eslint/naming-convention
const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider globalStyles={globalStyles}>
      <Navbar />
      <Component {...pageProps} />
      <Footer />
    </ThemeProvider>
  );
};

export default MyApp;
