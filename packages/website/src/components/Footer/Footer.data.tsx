import React, { ReactElement } from 'react';

import { SolidFacebookIcon } from '@coderscamp/ui/icons/SolidFacebook';
import { SolidGitHubIcon } from '@coderscamp/ui/icons/SolidGitHub';
import { SolidGlobalIcon } from '@coderscamp/ui/icons/SolidGlobal';
import { SolidInstagramIcon } from '@coderscamp/ui/icons/SolidInstagram';
import { SolidLinkedinIcon } from '@coderscamp/ui/icons/SolidLinkedin';

import {
  COURSE_PLAN_URL,
  MENTORS_GUIDE_URL,
  pageNavigation,
  PRIVACY_POLICY_URL,
  SCHEDULE_URL,
  TERMS_URL,
} from '@/constants';

export interface Social {
  label: string;
  icon: ReactElement;
  href: string;
}

export const codersCrewSocials: Social[] = [
  {
    label: 'Konto Facebook Stowarzyszenia CodersCrew',
    icon: <SolidFacebookIcon />,
    href: 'https://facebook.com/ccrew18',
  },
  {
    label: 'Konto Instagram Stowarzyszenia CodersCrew',
    icon: <SolidInstagramIcon />,
    href: 'https://instagram.com/coderscrew.pl',
  },
  {
    label: 'Konto LinkedIn Stowarzyszenia CodersCrew',
    icon: <SolidLinkedinIcon />,
    href: 'https://linkedin.com/company/coderscrew',
  },
  { label: 'Konto GitHub Stowarzyszenia CodersCrew', icon: <SolidGitHubIcon />, href: 'https://github.com/CodersCrew' },
  { label: 'Strona internetowa CodersCrew', icon: <SolidGlobalIcon />, href: 'https://coderscrew.pl' },
];

export const liveChatSocials: Social[] = [
  {
    label: 'Konto Facebook firmy LiveChat',
    icon: <SolidFacebookIcon />,
    href: 'https://www.facebook.com/livechatpany',
  },
  {
    label: 'Konto Instagram firmy LiveChat',
    icon: <SolidInstagramIcon />,
    href: 'https://www.instagram.com/livechat',
  },
  {
    label: 'Konto LinkedIn firmy LiveChat',
    icon: <SolidLinkedinIcon />,
    href: 'https://www.linkedin.com/company/livechat',
  },
  { label: 'Konto GitHub firmy LiveChat', icon: <SolidGitHubIcon />, href: 'https://github.com/livechat' },
  { label: 'Strona internetowa LiveChat', icon: <SolidGlobalIcon />, href: 'https://www.livechat.com' },
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
