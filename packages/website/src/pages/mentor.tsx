
import { MentorBenefits } from '@/components/MentorBenefits';
import { MentorPerspective } from '@/components/MentorPerspective';
import { MentorRequirements } from '@/components/MentorRequirements';

const Mentor = () => {
  return (
    <>
      <MentorPerspective />
      <MentorBenefits />
      <MentorRequirements />
    </>
  );
};

export default Mentor;
