import React from 'react';

import { Center } from '@coderscamp/ui/components/Center';
import { Flex } from '@coderscamp/ui/components/Flex';
import { Typography } from '@coderscamp/ui/components/Typography';

import { PartnersImgType, PartnerType } from '@/components/Partners/Partners.data';

import { ExternalLink } from '../ExternalLink';

export const PartnersList = ({ title = '', listOfPartnersImg = [] }: PartnerType) => {
  return (
    <>
      <Center w="100%" bgColor="gray.100" py="8px">
        <Typography color="gray.900" weight="bold" size="md">
          {title?.toUpperCase()}
        </Typography>
      </Center>
      <Flex flexWrap="wrap" justifyContent="space-between">
        {listOfPartnersImg?.map(({ id, image, url }: PartnersImgType) => {
          const Image = image;

          return (
            <Center key={id} maxW="320px" maxH="80px" margin={{ base: '0 auto 40px auto', md: '0 auto 80px auto' }}>
              <ExternalLink href={url} aria-label={`Przejdź na stronę ${id}`}>
                <Image width="100%" />
              </ExternalLink>
            </Center>
          );
        })}
      </Flex>
    </>
  );
};
