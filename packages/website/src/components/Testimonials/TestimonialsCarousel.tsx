import React, { ComponentProps, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import { Box } from '@coderscamp/ui/components/Box';
import { SliderSteps, SliderStepsProps } from '@coderscamp/ui/components/SliderSteps';
import { VStack } from '@coderscamp/ui/components/Stack';
import { useCurrentBreakpoint } from '@coderscamp/ui/hooks/useCurrentBreakpoint';

import { useRerender } from '../../hooks/useRerender';
import { Testimonial } from './Testimonials.data';

type SwiperProps = ComponentProps<typeof Swiper>;

export interface TestimonialsCarouselProps {
  testimonials: Testimonial[];
  Component: React.ComponentType<Testimonial>;
}

export const TestimonialsCarousel = ({
  testimonials,
  // eslint-disable-next-line @typescript-eslint/naming-convention
  Component,
}: TestimonialsCarouselProps) => {
  const ref = useRef<Parameters<NonNullable<SwiperProps['onInit']>>[0]>();
  const rerender = useRerender();
  const breakpoint = useCurrentBreakpoint();

  const handleSwiperInit: SwiperProps['onInit'] = (swiper) => {
    ref.current = swiper;
  };

  const handleSliderStepChange: SliderStepsProps['onChange'] = (index) => {
    ref.current?.slideTo(index);
  };

  const showDots = breakpoint !== 'base' && !(breakpoint === 'sm' && testimonials.length > 11);

  return (
    <VStack spacing={{ base: '20px', sm: '40px' }} width="100%">
      <SliderSteps
        count={testimonials.length}
        selectedIndex={ref.current?.activeIndex ?? 0}
        onChange={handleSliderStepChange}
        showDots={showDots}
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
              <Component {...testimonial} />
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </VStack>
  );
};
