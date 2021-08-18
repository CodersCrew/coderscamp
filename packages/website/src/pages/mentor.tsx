import { AboutMentor } from '@/components/AboutMentor';
import { MentorBenefits } from '@/components/MentorBenefits';
import { MentorPerspective } from '@/components/MentorPerspective';
import { MentorRequirements } from '@/components/MentorRequirements';
import { MentorTestimonials } from '@/components/Testimonials';

const Mentor = () => {
  return (
    <>
      <AboutMentor />
      <MentorPerspective />
      <MentorBenefits />
      <MentorRequirements />
      <MentorTestimonials />
    </>
  );
};

export default Mentor;
