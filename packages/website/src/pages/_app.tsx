import 'swiper/swiper.scss';

import type { CSSProperties } from 'react';
import type { AppProps } from 'next/app';

import { ThemeProvider } from '@coderscamp/ui/theme';

import { ModalProvider } from '@/components/Modal/ModalProvider';
import { RecruitmentModal } from '@/components/Modal/RecruitmentModal';
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
      <ModalProvider>
        <Navbar />
        <Component {...pageProps} />
        <RecruitmentModal />
      </ModalProvider>
    </ThemeProvider>
  );
};

export default MyApp;
