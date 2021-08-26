import type { InferGetStaticPropsType } from 'next';

import { About } from '@/components/About';
import { AboutBenefits } from '@/components/Benefits';
import { BigNumbers } from '@/components/BigNumbers/BigNumbers';
import { Curriculum } from '@/components/Curriculum';
import { Hero } from '@/components/Hero';
import { LearningSources } from '@/components/LearningSources';
import { Projects } from '@/components/Projects';
import { Schedule } from '@/components/Schedule';
import { AboutTestimonials } from '@/components/Testimonials';

import { getTestimonialsStaticProps } from '../getTestimonialsStaticProps';

const Home = ({ testimonials }: InferGetStaticPropsType<typeof getTestimonialsStaticProps>) => {
  return (
    <>
      <Hero />
      <About />
      <BigNumbers />
      <Curriculum />
      <LearningSources />
      <Projects />
      <AboutBenefits />
      <AboutTestimonials testimonials={testimonials} />
      <Schedule />
    </>
  );
};

export const getStaticProps = getTestimonialsStaticProps;

export default Home;
