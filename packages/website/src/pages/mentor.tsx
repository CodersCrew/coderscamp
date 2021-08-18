import { AboutMentor } from '@/components/AboutMentor';
import { MentorPerspective } from '@/components/MentorPerspective';
import { MentorRequirements } from '@/components/MentorRequirements';
import { RecruitmentMentorsModal } from '@/components/Modals/RecruitmentMentorsModal';

const Mentor = () => {
  return (
    <>
      <RecruitmentMentorsModal />
      <AboutMentor />
      <MentorPerspective />
      <MentorRequirements />
    </>
  );
};

export default Mentor;
