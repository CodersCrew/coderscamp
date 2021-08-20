import { AboutMentor } from '@/components/AboutMentor';
import { MentorPerspective } from '@/components/MentorPerspective';
import { MentorRequirements } from '@/components/MentorRequirements';
import { RecruitmentModal } from '@/components/Modals/RecruitmentModal';

const Mentor = () => {
  return (
    <>
      <RecruitmentModal />
      <AboutMentor />
      <MentorPerspective />
      <MentorRequirements />
    </>
  );
};

export default Mentor;
