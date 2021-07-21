import React, { ReactText } from 'react';
import { Box, forwardRef, HTMLChakraProps } from '@chakra-ui/react';

type StatusProps = 'idle' | 'doing' | 'review' | 'done;';
type Image = string;
type Title = string;
type Url = string;

export interface ProjectCardProps extends HTMLChakraProps<'div'> {
  children: ReactText | ReactText[];
  status: StatusProps;
  image: Image;
  title: Title;
  url: Url;
}

export const ProjectCard = forwardRef<ProjectCardProps, 'div'>(
  ({ status, image, title, url, children, ...props }, ref) => {
    return <div>work</div>;
  },
);
