import { MentorPerspective } from '@/components/MentorPerspective';
import { MentorRequirements } from '@/components/MentorRequirements';
import { MentorSchedule } from '@/components/Schedule/MentorSchedule/MentorSchedule';

const Mentor = () => {
  return (
    <>
      <MentorRequirements />
      <MentorPerspective />
      <MentorSchedule />
    </>
  );
};

export default Mentor;
