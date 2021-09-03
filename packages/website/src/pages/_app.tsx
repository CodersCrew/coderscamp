import 'swiper/css';

import type { CSSProperties } from 'react';
import type { AppProps } from 'next/app';

import { ThemeProvider } from '@coderscamp/ui/theme';

import { Footer } from '@/components/Footer';
import { Navbar } from '@/components/Navbar';
import { RecruitmentModalProvider } from '@/components/RecruitmentModal';

const globalStyles: Record<string, CSSProperties> = {
  'html, body': { backgroundColor: 'white' },
  '.swiper-wrapper': { alignItems: 'stretch' },
  '.swiper-slide': { height: 'unset' },
};

// eslint-disable-next-line @typescript-eslint/naming-convention
const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider globalStyles={globalStyles}>
      <RecruitmentModalProvider>
        <Navbar />
        <Component {...pageProps} />
        <Footer />
      </RecruitmentModalProvider>
    </ThemeProvider>
  );
};

export default MyApp;
