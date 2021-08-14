import { About } from '@/components/About';
import { BigNumbers } from '@/components/BigNumbers/BigNumbers';
import { CurriculumSection } from '@/components/CurriculumSection';
import { Hero } from '@/components/Hero';

const Home = () => {
  return (
    <>
      <Hero />
      <About />
      <BigNumbers />
      <CurriculumSection />
    </>
  );
};

export default Home;
