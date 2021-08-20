import { Testimonials } from '../Testimonials';
import { testimonials } from '../Testimonials.data';
import { TestimonialsCarousel } from '../TestimonialsCarousel';
import { MentorTestimonialCard } from './MentorTestimonialCard';

export const MentorTestimonials = () => (
  <Testimonials title="Opinie mentorów z poprzednich edycji">
    <TestimonialsCarousel
      testimonials={testimonials.filter((t) => t.role === 'mentor')}
      Component={MentorTestimonialCard}
    />
  </Testimonials>
);
