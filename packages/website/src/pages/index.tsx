import { About } from '@/components/About';
import { BigNumbers } from '@/components/BigNumbers/BigNumbers';
import { CurriculumSection } from '@/components/CurriculumSection';
import { Hero } from '@/components/Hero';
import { LearningSources } from '@/components/LearningSources';
import { Projects } from '@/components/Projects';
import { Schedule } from '@/components/Schedule';
import { Testimonials } from '@/components/Testimonials';

const Home = () => {
  return (
    <>
      <Hero />
      <About />
      <BigNumbers />
      <CurriculumSection />
      <LearningSources />
      <Projects />
      <Testimonials />
      <Schedule />
    </>
  );
};

export default Home;
