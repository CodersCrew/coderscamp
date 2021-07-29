import React from 'react';
import { useHistory } from 'react-router-dom';
import { Box, Flex, forwardRef, Grid, Image } from '@chakra-ui/react';

import { Button } from '../Button';
import { Typography } from '../Typography';
import { DoneProps, NotDoneProps, ProjectCardProps } from './projectCardTypes';
import { statusValueCheck } from './statusValueCheck';

export const ProjectCard = forwardRef<ProjectCardProps, 'div'>(
  ({ status, image, title, url, points = 100, pointsMax = 200, date = new Date(), ...props }, ref) => {
    const history = useHistory();
    const statusValue: DoneProps | NotDoneProps = status === 'done' ? { status, points, pointsMax } : { status, date };

    const { statusText, timeStatus, dateOrPoints } = statusValueCheck(statusValue);

    const goToProjectPage = () => history.push(url);

    return (
      <Box ref={ref} w="100%" boxShadow="base" borderRadius="8px" {...props}>
        <Grid templateRows="min-content 1fr" h="100%">
          <Image
            src={image}
            alt={`Grafika projektu z modułu ${title}`}
            background="gray.300"
            borderRadius="8px 8px 0 0"
            h="auto"
          />

          <Grid templateRows="repeat(4, 1fr)" padding="24px">
            <Typography as="p" fontWeight="700" size="lg">
              {title}
            </Typography>

            <Flex justifyContent="space-between" alignSelf="end">
              <Typography fontWeight="500" as="span">
                Status:
              </Typography>
              <Typography as="span">{statusText}</Typography>
            </Flex>

            <Flex justifyContent="space-between" alignSelf="start">
              <Typography fontWeight="500" as="span">
                {timeStatus}:
              </Typography>
              <Typography as="span">{dateOrPoints}</Typography>
            </Flex>
            <Button disabled={status === 'idle'} onClick={goToProjectPage}>
              Przejdź do projektu
            </Button>
          </Grid>
        </Grid>
      </Box>
    );
  },
);
