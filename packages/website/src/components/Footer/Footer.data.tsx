import React, { ReactElement } from 'react';
import { pageNavigation } from 'src/pageNavigation';

import { SolidFacebookIcon } from '@coderscamp/ui/icons/SolidFacebook';
import { SolidGitHubIcon } from '@coderscamp/ui/icons/SolidGitHub';
import { SolidGlobalIcon } from '@coderscamp/ui/icons/SolidGlobal';
import { SolidInstagramIcon } from '@coderscamp/ui/icons/SolidInstagram';
import { SolidLinkedinIcon } from '@coderscamp/ui/icons/SolidLinkedin';

import { COURSE_PLAN_URL, MENTORS_GUIDE_URL, PRIVACY_POLICY_URL, SCHEDULE_URL, TERMS_URL } from '@/constants';

interface Social {
  label: string;
  icon: ReactElement;
  href: string;
}

export const socialMediaIcons: Social[] = [
  { label: 'Link do konta Facebook', icon: <SolidFacebookIcon />, href: 'https://facebook.com/ccrew18' },
  { label: 'Link do konta Instagram', icon: <SolidInstagramIcon />, href: 'https://instagram.com/coderscrew.pl' },
  { label: 'Link do konta LinkedIn', icon: <SolidLinkedinIcon />, href: 'https://linkedin.com/company/coderscrew' },
  { label: 'Link do konta GitHub', icon: <SolidGitHubIcon />, href: 'https://github.com/CodersCrew' },
  { label: 'Link do strony internetowej', icon: <SolidGlobalIcon />, href: 'https://coderscrew.pl' },
];

interface NavItem {
  href: string;
  children: string;
  isExternal?: boolean;
}

interface NavColumn {
  title: string;
  items: NavItem[];
}

export const footerNav: NavColumn[] = [
  {
    title: 'Nawigacja',
    items: pageNavigation,
  },
  {
    title: 'Do pobrania',
    items: [
      { href: SCHEDULE_URL, children: 'Harmonogram', isExternal: true },
      { href: COURSE_PLAN_URL, children: 'Plan kursu', isExternal: true },
      { href: MENTORS_GUIDE_URL, children: 'Poradnik mentora', isExternal: true },
    ],
  },
  {
    title: 'Kwestie prawne',
    items: [
      { href: TERMS_URL, children: 'Regulamin kursu', isExternal: true },
      { href: PRIVACY_POLICY_URL, children: 'Polityka prywatności', isExternal: true },
    ],
  },
];
