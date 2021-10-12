import React, { ComponentProps, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import { Box } from '@coderscamp/ui/components/Box';
import { SliderSteps, SliderStepsProps } from '@coderscamp/ui/components/SliderSteps';
import { useBreakpointValue } from '@coderscamp/ui/hooks/useBreakpointValue';
import { useMediaQuery } from '@coderscamp/ui/hooks/useMediaQuery';

import { useRerender } from '../../hooks/useRerender';
import { ProjectCard } from './ProjectCard';
import { projects } from './Projects.data';

type SwiperProps = ComponentProps<typeof Swiper>;

export const ProjectsCarousel = () => {
  const ref = useRef<Parameters<NonNullable<SwiperProps['onInit']>>[0]>();
  const [isSmallMobile] = useMediaQuery('(max-width: 520px)');
  const rerender = useRerender();

  const projectsPerView = useBreakpointValue({ base: 1, md: 2, xl: 3 }) ?? 3;
  const spaceBetween = useBreakpointValue({ base: 24, lg: 40, xl: 32, '2xl': 40 });

  const dotsCount = projects.length / projectsPerView;
  const selectedIndex = Math.floor((ref.current?.activeIndex ?? 0) / projectsPerView);

  const handleSwiperInit: SwiperProps['onInit'] = (swiper) => {
    ref.current = swiper;
  };

  const handleSliderStepChange: SliderStepsProps['onChange'] = (index) => {
    ref.current?.slideTo(index * projectsPerView);
  };

  return (
    <>
      <Box width="100%">
        <Swiper
          speed={600}
          onInit={handleSwiperInit}
          spaceBetween={spaceBetween}
          slidesPerView={projectsPerView}
          /* We need a rerender to re-calculate the `selectedIndex` prop value */
          onActiveIndexChange={rerender}
        >
          {projects.map((project) => (
            <SwiperSlide key={project.name}>
              <ProjectCard project={project} />
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
      <SliderSteps
        count={dotsCount}
        selectedIndex={selectedIndex}
        onChange={handleSliderStepChange}
        showDots={!isSmallMobile}
      />
    </>
  );
};
