import type { InferGetStaticPropsType } from 'next';

import { AboutMentor } from '@/components/AboutMentor';
import { MentorBenefits } from '@/components/Benefits';
import { MentorPerspective } from '@/components/MentorPerspective';
import { MentorRequirements } from '@/components/MentorRequirements';
import { MentorTestimonials } from '@/components/Testimonials';

import { getTestimonialsStaticProps } from '../getTestimonialsStaticProps';

const Mentor = ({ testimonials }: InferGetStaticPropsType<typeof getTestimonialsStaticProps>) => {
  return (
    <>
      <AboutMentor />
      <MentorPerspective />
      <MentorBenefits />
      <MentorRequirements />
      <MentorTestimonials testimonials={testimonials} />
    </>
  );
};

export const getStaticProps = getTestimonialsStaticProps;

export default Mentor;
