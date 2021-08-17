import codecademy from '@/assets/learning-sources/codecademy.svg';
import codeWars from '@/assets/learning-sources/codewars.svg';
import cssTricks from '@/assets/learning-sources/css-tricks.svg';
import devTo from '@/assets/learning-sources/devto.svg';
import fireship from '@/assets/learning-sources/fireship-io.svg';
import freeCodeCamp from '@/assets/learning-sources/freecodecamp.svg';
import frontendMasters from '@/assets/learning-sources/frontend-masters.svg';
import hackerNoon from '@/assets/learning-sources/hacker-noon.svg';
import levelUpCoding from '@/assets/learning-sources/level-up-coding.png';
import levelUpTutorials from '@/assets/learning-sources/level-up-tutorials.svg';
import smashingMagazine from '@/assets/learning-sources/smashing-magazine.svg';
import wesBos from '@/assets/learning-sources/wes-bos.png';

interface LearningSource {
  name: string;
  image: string;
  url: string;
  width?: number;
  height?: number;
}

export const learningSources: LearningSource[] = [
  { name: 'Codecademy', image: codecademy, url: 'https://codecademy.com/' },
  { name: 'Frontend Masters', image: frontendMasters, url: 'https://frontendmasters.com/' },
  { name: 'freeCodeCamp', image: freeCodeCamp, url: 'https://freecodecamp.org/' },
  { name: 'Codewars', image: codeWars, url: 'https://codewars.com/' },
  { name: 'Level Up Coding', image: levelUpCoding, url: 'https://levelup.gitconnected.com/', width: 200, height: 40 },
  { name: 'Wes Bos', image: wesBos, url: 'https://wesbos.com/', width: 80, height: 64 },
  { name: 'Level Up Tutorials', image: levelUpTutorials, url: 'https://leveluptutorials.com/' },
  { name: 'Fireship.io', image: fireship, url: 'https://fireship.io/' },
  { name: 'DEV Community ‍ ‍', image: devTo, url: 'https://dev.to/' },
  { name: 'Hacker Noon', image: hackerNoon, url: 'https://hackernoon.com/' },
  { name: 'CSS-Tricks', image: cssTricks, url: 'https://css-tricks.com/' },
  { name: 'Smashing Magazine', image: smashingMagazine, url: 'https://smashingmagazine.com/' },
];
