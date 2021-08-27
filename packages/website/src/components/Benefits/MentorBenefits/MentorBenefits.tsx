import { Benefits } from '../Benefits';
import { mentorBenefitItems } from './MentorBenefits.data';

export const MentorBenefits = () => (
  <Benefits title="Dlaczego warto zostać mentorem?" benefitItems={mentorBenefitItems} />
);
