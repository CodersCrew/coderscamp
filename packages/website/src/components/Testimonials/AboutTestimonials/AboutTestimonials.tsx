import { Testimonials } from '../Testimonials';
import type { Testimonial } from '../Testimonials.data';
import { TestimonialsCarousel } from '../TestimonialsCarousel';
import { AboutTestimonialCard } from './AboutTestimonialCard';

export const AboutTestimonials = ({ testimonials }: { testimonials: Testimonial[] }) => (
  <Testimonials title="Opinie o kursie">
    <TestimonialsCarousel testimonials={testimonials} Component={AboutTestimonialCard} />
  </Testimonials>
);
