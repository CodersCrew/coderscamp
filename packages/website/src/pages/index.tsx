import { About } from '@/components/About';
import { BigNumbers } from '@/components/BigNumbers/BigNumbers';
import { Hero } from '@/components/Hero';
import { LearningSources } from '@/components/LearningSources';
import { Projects } from '@/components/Projects';
import { Testimonials } from '@/components/Testimonials';

const Home = () => {
  return (
    <>
      <Hero />
      <About />
      <BigNumbers />
      <LearningSources />
      <Projects />
      <Testimonials />
    </>
  );
};

export default Home;
