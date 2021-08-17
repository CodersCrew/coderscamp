import { AboutMentor } from '@/components/AboutMentor';
import { MentorBenefits } from '@/components/MentorBenefits';
import { MentorPerspective } from '@/components/MentorPerspective';
import { MentorRequirements } from '@/components/MentorRequirements';

const Mentor = () => {
  return (
    <>
      <AboutMentor />
      <MentorPerspective />
      <MentorBenefits />
      <MentorRequirements />
    </>
  );
};

export default Mentor;
