import 'swiper/css';

import type { CSSProperties } from 'react';
import type { AppProps } from 'next/app';
import Head from 'next/head';

import { ThemeProvider } from '@coderscamp/ui/theme';

import { Footer } from '@/components/Footer';
import { Navbar } from '@/components/Navbar';
import { RecruitmentModalProvider } from '@/components/RecruitmentModal';

const globalStyles: Record<string, CSSProperties> = {
  'html, body': { backgroundColor: 'white' },
  '.swiper-wrapper': { alignItems: 'stretch' },
  '.swiper-slide': { height: 'unset' },
};

const userPrefersDark =
  typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

// eslint-disable-next-line @typescript-eslint/naming-convention
const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <title>CodersCamp - największy otwarty kurs programowania webowego w Polsce</title>
        <meta
          name="description"
          content="CodersCamp to 6-miesięczny, darmowy kurs programowania webowego. Naszym celem jest przeprowadzić każdego od pierwszych linii kodu do rozpoczęcia kariery w branży IT."
        />
        <link
          rel="icon"
          type="image/svg+xml"
          href="https://res.cloudinary.com/coderscamp/image/upload/v1630711865/favicon/favicon.svg"
        />
        <link
          rel="icon"
          type="image/png"
          href={`https://res.cloudinary.com/coderscamp/image/upload/v1630711899/favicon/favicon-${
            userPrefersDark ? 'white' : 'black'
          }.png`}
        />
        <meta property="og:title" content="CodersCamp - największy otwarty kurs programowania webowego w Polsce" />
        <meta
          property="og:description"
          content="CodersCamp to 6-miesięczny, darmowy kurs programowania webowego. Naszym celem jest przeprowadzić każdego od pierwszych linii kodu do rozpoczęcia kariery w branży IT."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content="https://res.cloudinary.com/coderscamp/image/upload/v1634125737/opengraph.png"
        />
      </Head>
      <ThemeProvider globalStyles={globalStyles}>
        <RecruitmentModalProvider>
          <Navbar />
          <Component {...pageProps} />
          <Footer />
        </RecruitmentModalProvider>
      </ThemeProvider>
    </>
  );
};

export default MyApp;
