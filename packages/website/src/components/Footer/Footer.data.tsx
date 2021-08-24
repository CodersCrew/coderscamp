import React from 'react';

import {
  SolidFacebookIcon,
  SolidGitHubIcon,
  SolidGlobalIcon,
  SolidInstagramIcon,
  SolidLinkedinIcon,
} from '@coderscamp/ui/icons';

export const socialMediaIcons = [
  { name: 'FacebookIcon', component: <SolidFacebookIcon /> },
  { name: 'InstagramIcon', component: <SolidInstagramIcon /> },
  { name: 'LinkedinIcon', component: <SolidLinkedinIcon /> },
  { name: 'GitHubIcon', component: <SolidGitHubIcon /> },
  { name: 'GlobalIcon', component: <SolidGlobalIcon /> },
];

export const footerNav = [
  {
    title: 'Nawigacja',
    items: [
      { urlPath: '/', name: 'Strona główna' },
      { urlPath: '/', name: '' },
      { urlPath: '/', name: '' },
      { urlPath: '/', name: '' },
    ],
  },
  {
    title: 'Do pobrania',
    items: [
      { urlPath: '/', name: 'Plan kursu' },
      { urlPath: '/', name: 'Poradnik mentora' },
      { urlPath: '/', name: 'Media kit' },
    ],
  },
  {
    title: 'Kwestie prawne',
    items: [
      { urlPath: '/', name: 'Regulamin kursu' },
      { urlPath: '/', name: 'Polityka prywatności' },
      { urlPath: '/', name: 'Polityka cookies' },
    ],
  },
];
