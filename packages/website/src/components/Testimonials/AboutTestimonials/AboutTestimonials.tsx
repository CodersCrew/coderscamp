import { Testimonials } from '../Testimonials';
import { testimonials } from '../Testimonials.data';
import { TestimonialsCarousel } from '../TestimonialsCarousel';
import { AboutTestimonialCard } from './AboutTestimonialCard';

export const AboutTestimonials = () => (
  <Testimonials title="Opinie o kursie">
    <TestimonialsCarousel testimonials={testimonials} Component={AboutTestimonialCard} />
  </Testimonials>
);
