import React from 'react';

import {
  SolidFacebookIcon,
  SolidGitHubIcon,
  SolidGlobalIcon,
  SolidInstagramIcon,
  SolidLinkedinIcon,
} from '@coderscamp/ui/icons';

export const socialMediaIcons = [
  { name: 'FacebookIcon', component: <SolidFacebookIcon />, urlPath: 'https://www.facebook.com/ccrew18' },
  { name: 'InstagramIcon', component: <SolidInstagramIcon />, urlPath: 'https://www.instagram.com/coderscrew.pl/' },
  {
    name: 'LinkedinIcon',
    component: <SolidLinkedinIcon />,
    urlPath: 'https://www.linkedin.com/company/coderscrew/mycompany/',
  },
  { name: 'GitHubIcon', component: <SolidGitHubIcon />, urlPath: 'https://github.com/CodersCrew' },
  { name: 'GlobalIcon', component: <SolidGlobalIcon />, urlPath: 'https://coderscrew.pl/' },
];

export const footerNav = [
  {
    title: 'Nawigacja',
    items: [
      { urlPath: '/', name: 'Strona główna' },
      { urlPath: '/', name: 'Dla mentorów' },
      { urlPath: '/', name: 'FAQ' },
      { urlPath: '/', name: 'Kontakt' },
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
