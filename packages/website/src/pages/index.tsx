import { About } from '@/components/About';
import { BigNumbers } from '@/components/BigNumbers/BigNumbers';
import { Hero } from '@/components/Hero';
import { LearningSources } from '@/components/LearningSources';
import { Projects } from '@/components/Projects';

const Home = () => {
  return (
    <>
      <Hero />
      <About />
      <BigNumbers />
      <LearningSources />
      <Projects />
    </>
  );
};

export default Home;
