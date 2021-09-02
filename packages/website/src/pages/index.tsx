import type { InferGetStaticPropsType } from 'next';

import { SectionContainer } from '@coderscamp/ui/components/SectionContainer';

import { About } from '@/components/About';
import { AboutBenefits } from '@/components/Benefits';
import { BigNumbers } from '@/components/BigNumbers/BigNumbers';
import { Curriculum } from '@/components/Curriculum';
import { Hero } from '@/components/Hero';
import { LearningSources } from '@/components/LearningSources';
import { Projects } from '@/components/Projects';
import { CandidateSchedule } from '@/components/Schedule';
import { AboutTestimonials } from '@/components/Testimonials';

import { getTestimonialsStaticProps } from '../getTestimonialsStaticProps';

const Home = ({ testimonials }: InferGetStaticPropsType<typeof getTestimonialsStaticProps>) => {
  return (
    <>
      <SectionContainer>
        <Hero />
      </SectionContainer>
      <SectionContainer>
        <About />
      </SectionContainer>
      <SectionContainer>
        <BigNumbers />
      </SectionContainer>

      <Curriculum />

      <LearningSources />

      <SectionContainer>
        <Projects />
      </SectionContainer>
      <SectionContainer>
        <AboutBenefits />
      </SectionContainer>
      <SectionContainer>
        <AboutTestimonials testimonials={testimonials} />
      </SectionContainer>
      <SectionContainer>
        <CandidateSchedule />
      </SectionContainer>
    </>
  );
};

export const getStaticProps = getTestimonialsStaticProps;

export default Home;
