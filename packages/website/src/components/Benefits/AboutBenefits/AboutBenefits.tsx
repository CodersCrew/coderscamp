import { Benefits } from '../Benefits';
import { aboutBenefitItems } from './AboutBenefitItems.data';

export const AboutBenefits = () => (
  <Benefits
    title="Co wyróżnia CodersCamp?"
    benefitItems={aboutBenefitItems}
    showExpandProfitButton={aboutBenefitItems.length > 5}
  />
);
