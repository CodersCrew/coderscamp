import type { InferGetStaticPropsType } from 'next';

import { AboutMentor } from '@/components/AboutMentor';
import { MentorBenefits } from '@/components/Benefits';
import { MentorPerspective } from '@/components/MentorPerspective';
import { MentorRequirements } from '@/components/MentorRequirements';
import { MentorSchedule } from '@/components/Schedule';
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
      <MentorSchedule />
    </>
  );
};

export const getStaticProps = getTestimonialsStaticProps;

export default Mentor;
