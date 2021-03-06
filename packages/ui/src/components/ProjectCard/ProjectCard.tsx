import React from 'react';
import { Box, Flex, Grid, Image } from '@chakra-ui/react';

import { Button } from '../Button';
import { Typography } from '../Typography';
import { PROJECT_CARD_TEXT, ProjectCardProps } from './projectCardTypes';

export const ProjectCard = ({
  status,
  image,
  title,
  url,
  points,
  pointsMax,
  date,
  onButtonClick,
  ...props
}: ProjectCardProps) => {
  return (
    <Box w="100%" boxShadow="base" borderRadius="8px" {...props}>
      <Grid templateRows="min-content 1fr" h="100%">
        <Image
          src={image}
          alt={`Grafika projektu z modułu ${title}`}
          background="gray.300"
          borderRadius="8px 8px 0 0"
          h="auto"
        />

        <Grid templateRows="repeat(4, 1fr)" padding="24px">
          <Typography as="p" weight="bold" size="lg">
            {title}
          </Typography>

          <Flex justifyContent="space-between" alignSelf="end">
            <Typography weight="medium" as="span">
              Status:
            </Typography>
            <Typography as="span">{PROJECT_CARD_TEXT[status].statusText}</Typography>
          </Flex>

          <Flex justifyContent="space-between" alignSelf="start">
            <Typography weight="medium" as="span">
              {PROJECT_CARD_TEXT[status].timeStatus}:
            </Typography>
            <Typography as="span">
              {status !== 'done' && date ? new Date(date).toLocaleDateString() : `${points}/${pointsMax}`}
            </Typography>
          </Flex>
          <Button disabled={status === 'idle'} onClick={() => onButtonClick(url)}>
            Przejdź do projektu
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};
