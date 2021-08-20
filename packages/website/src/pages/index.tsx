import { About } from '@/components/About';
import { AboutBenefits } from '@/components/Benefits';
import { BigNumbers } from '@/components/BigNumbers/BigNumbers';
import { Hero } from '@/components/Hero';
import { LearningSources } from '@/components/LearningSources';
import { Projects } from '@/components/Projects';
import { Schedule } from '@/components/Schedule';
import { AboutTestimonials } from '@/components/Testimonials';

const Home = () => {
  return (
    <>
      <Hero />
      <About />
      <BigNumbers />
      <LearningSources />
      <Projects />
      <AboutBenefits />
      <AboutTestimonials />
      <Schedule />
    </>
  );
};

export default Home;
