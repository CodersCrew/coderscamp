import { ComponentType } from 'react';

import { CodeCademy } from '@coderscamp/ui/svg/learning-sources';
import { HTMLChakraProps } from '@coderscamp/ui/types';

export type PartnersImgType = {
  id: string;
  image: ComponentType<HTMLChakraProps<'svg'>>;
  url: string;
};

export type PartnerType = {
  title: string;
  listOfPartnersImg: PartnersImgType[];
};

export const listOfPartners: PartnerType[] = [
  {
    title: 'Partnerzy kursu',
    listOfPartnersImg: [
      { id: '1', image: CodeCademy, url: 'https://codecademy.com/' },
      { id: '2', image: CodeCademy, url: 'https://codecademy.com/' },
      { id: '3', image: CodeCademy, url: 'https://codecademy.com/' },
      { id: '4', image: CodeCademy, url: 'https://codecademy.com/' },
      { id: '5', image: CodeCademy, url: 'https://codecademy.com/' },
    ],
  },
  {
    title: 'Patronat honorowy',
    listOfPartnersImg: [
      { id: '1', image: CodeCademy, url: 'https://codecademy.com/' },
      { id: '2', image: CodeCademy, url: 'https://codecademy.com/' },
      { id: '3', image: CodeCademy, url: 'https://codecademy.com/' },
      { id: '4', image: CodeCademy, url: 'https://codecademy.com/' },
      { id: '5', image: CodeCademy, url: 'https://codecademy.com/' },
    ],
  },
  {
    title: 'Patronat medialny',
    listOfPartnersImg: [
      { id: '1', image: CodeCademy, url: 'https://codecademy.com/' },
      { id: '2', image: CodeCademy, url: 'https://codecademy.com/' },
      { id: '3', image: CodeCademy, url: 'https://codecademy.com/' },
      { id: '4', image: CodeCademy, url: 'https://codecademy.com/' },
      { id: '5', image: CodeCademy, url: 'https://codecademy.com/' },
      { id: '6', image: CodeCademy, url: 'https://codecademy.com/' },
      { id: '7', image: CodeCademy, url: 'https://codecademy.com/' },
      { id: '8', image: CodeCademy, url: 'https://codecademy.com/' },
    ],
  },
];
