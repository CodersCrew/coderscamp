import React, { ComponentProps, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import { Box } from '@coderscamp/ui/components/Box';
import { SliderSteps, SliderStepsProps } from '@coderscamp/ui/components/SliderSteps';
import { VStack } from '@coderscamp/ui/components/Stack';

import { useRerender } from '../../hooks/useRerender';
import { TestimonialCard } from './TestimonialCard';
import { testimonials } from './Testimonials.data';

type SwiperProps = ComponentProps<typeof Swiper>;

export const TestimonialsCarousel = () => {
  const ref = useRef<Parameters<NonNullable<SwiperProps['onInit']>>[0]>();
  const rerender = useRerender();

  const handleSwiperInit: SwiperProps['onInit'] = (swiper) => {
    ref.current = swiper;
  };

  const handleSliderStepChange: SliderStepsProps['onChange'] = (index) => {
    ref.current?.slideTo(index);
  };

  return (
    <VStack spacing={{ base: '20px', sm: '40px' }} width="100%">
      <SliderSteps
        count={testimonials.length}
        selectedIndex={ref.current?.activeIndex ?? 0}
        onChange={handleSliderStepChange}
      />
      <Box width="100%">
        <Swiper
          speed={600}
          onInit={handleSwiperInit}
          slidesPerView={1}
          /* We need a rerender to re-calculate the `selectedIndex` prop value */
          onActiveIndexChange={rerender}
        >
          {testimonials.map((testimonial) => (
            <SwiperSlide key={testimonial.name}>
              <TestimonialCard testimonial={testimonial} />
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </VStack>
  );
};
