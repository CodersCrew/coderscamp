import { MentorPerspective } from '@/components/MentorPerspective';
import { MentorRequirements } from '@/components/MentorRequirements';
import { MentorSchedule } from '@/components/Schedule/MentorSchedule/MentorSchedule';

const Mentor = () => {
  return (
    <>
	  <MentorPerspective />
      <MentorRequirements />
      <MentorSchedule />
    </>
  );
};

export default Mentor;
