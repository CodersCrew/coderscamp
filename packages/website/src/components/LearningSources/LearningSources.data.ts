import type { ComponentType } from 'react';

import {
  CodeCademy,
  Codewars,
  CssTricks,
  Devto,
  FireshipIo,
  Freecodecamp,
  FrontendMasters,
  HackerNoon,
  LevelUpCoding,
  LevelUpTutorials,
  SmashingMagazine,
  WesBos,
} from '@coderscamp/ui/svg/learning-sources';
import type { HTMLChakraProps } from '@coderscamp/ui/types';

interface LearningSource {
  name: string;
  image: ComponentType<HTMLChakraProps<'svg'>>;
  url: string;
}

export const learningSources: LearningSource[] = [
  { name: 'Codecademy', image: CodeCademy, url: 'https://codecademy.com/' },
  { name: 'Frontend Masters', image: FrontendMasters, url: 'https://frontendmasters.com/' },
  { name: 'freeCodeCamp', image: Freecodecamp, url: 'https://freecodecamp.org/' },
  { name: 'Codewars', image: Codewars, url: 'https://codewars.com/' },
  { name: 'Level Up Coding', image: LevelUpCoding, url: 'https://levelup.gitconnected.com/' },
  { name: 'Wes Bos', image: WesBos, url: 'https://wesbos.com/' },
  { name: 'Level Up Tutorials', image: LevelUpTutorials, url: 'https://leveluptutorials.com/' },
  { name: 'Fireship.io', image: FireshipIo, url: 'https://fireship.io/' },
  { name: 'DEV Community ‍ ‍', image: Devto, url: 'https://dev.to/' },
  { name: 'Hacker Noon', image: HackerNoon, url: 'https://hackernoon.com/' },
  { name: 'CSS-Tricks', image: CssTricks, url: 'https://css-tricks.com/' },
  { name: 'Smashing Magazine', image: SmashingMagazine, url: 'https://smashingmagazine.com/' },
];
