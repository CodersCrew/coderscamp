import type { Testimonial } from './components/Testimonials/Testimonials.data';

const getMockedTestimonials = async () => {
  const { testimonials } = await import('./components/Testimonials/Testimonials.data');

  return { props: { testimonials } };
};

export const getTestimonialsStaticProps = async () => {
  const { createClient } = await import('@supabase/supabase-js');

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    return getMockedTestimonials();
  }

  const supabase = createClient(supabaseUrl, supabaseAnonKey);
  const { data } = await supabase.from<Testimonial>('testimonials').select('*').not('company', 'is', null);

  if (!data) {
    return getMockedTestimonials();
  }

  return {
    props: {
      testimonials: data.sort((t1, t2) => t2.content.length - t1.content.length),
    },
  };
};
