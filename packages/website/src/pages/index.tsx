import { About } from '@/components/About';
import { BigNumbers } from '@/components/BigNumbers/BigNumbers';
import { Hero } from '@/components/Hero';
import { Projects } from '@/components/Projects';

const Home = () => {
  return (
    <>
      <Hero />
      <About />
      <BigNumbers />
      <Projects />
    </>
  );
};

export default Home;
