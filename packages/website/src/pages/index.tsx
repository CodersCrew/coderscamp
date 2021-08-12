import { About } from '@/components/About';
import { BigNumbers } from '@/components/BigNumbers/BigNumbers';
import { Hero } from '@/components/Hero';
import { LearningSources } from '@/components/LearningSources';

const Home = () => {
  return (
    <>
      <Hero />
      <About />
      <BigNumbers />
      <LearningSources />
    </>
  );
};

export default Home;
