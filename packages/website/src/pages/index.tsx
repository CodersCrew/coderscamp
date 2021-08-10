import { About } from '@/components/About';
import { BigNumbers } from '@/components/BigNumbers/BigNumbers';
import { Hero } from '@/components/Hero';
import { Schedule } from '@/components/Schedule';

const Home = () => {
  return (
    <>
      <Hero />
      <About />
      <BigNumbers />
      <Schedule />
    </>
  );
};

export default Home;
