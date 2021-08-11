import { About } from '@/components/About';
import { Benefits } from '@/components/Benefits';
import { BigNumbers } from '@/components/BigNumbers/BigNumbers';
import { Hero } from '@/components/Hero';

const Home = () => {
  return (
    <>
      <Hero />
      <Benefits />
      <About />
      <BigNumbers />
    </>
  );
};

export default Home;
