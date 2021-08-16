export type CodersCampRole = 'student' | 'partner' | 'mentor';

export interface Testimonial {
  image: string;
  name: string;
  company: string;
  role: CodersCampRole;
  content: string;
}

export const testimonials: Testimonial[] = [
  {
    image: 'https://randomuser.me/api/portraits/men/88.jpg',
    name: 'Milton Reynolds',
    company: 'Junior JavaScript Developer, Poodle',
    role: 'student',
    content:
      'Maecenas luctus ipsum vitae orci sodales, a convallis felis consectetur. In rutrum odio varius nisi mattis venenatis. Duis pellentesque elementum elit a ullamcorper. Proin hendrerit odio eu euismod iaculis. Fusce nec dictum tellus, auctor egestas purus. Donec eros nunc, maximus id lobortis quis, luctus at nibh. Etiam orci tortor, porttitor vitae malesuada eget, gravida a tortor. Praesent pulvinar, justo consectetur porttitor iaculis, justo augue pellentesque nisi, nec finibus nunc orci in ante. Donec nec finibus dolor, et porttitor leo. Aenean eu laoreet felis. Phasellus tristique semper pellentesque. Maecenas quis sem ac ex rhoncus ullamcorper ac ut erat. Phasellus viverra orci sapien, eget tincidunt felis vulputate id. Fusce vitae mauris.',
  },
  {
    image: 'https://randomuser.me/api/portraits/women/96.jpg',
    name: 'Darlene Mccoy',
    company: 'Senior Node.js Developer, Legos',
    role: 'mentor',
    content:
      'Donec vitae dui at mauris sollicitudin pellentesque ut nec nibh. Praesent hendrerit pellentesque ipsum, non luctus nulla rutrum eget. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Phasellus sagittis iaculis dolor, a euismod erat sodales non. Proin tristique turpis eget elit dictum, at hendrerit sapien suscipit. Phasellus cursus semper nibh, ut efficitur arcu porttitor quis. Integer posuere urna eu purus auctor, at dignissim elit facilisis. Donec non suscipit turpis. Fusce aliquet finibus ultrices. Donec gravida risus nec elit rutrum, eget varius magna dapibus. Ut felis tortor, semper et molestie at, commodo ac lacus. Etiam sit amet metus eget risus iaculis mollis. Etiam sodales, dolor at rutrum tincidunt, risus risus mattis eros, vitae efficitur neque metus pharetra sapien. Suspendisse potenti. Sed id sem aliquet, faucibus arcu et tincidunt.',
  },
  {
    image: 'https://randomuser.me/api/portraits/men/85.jpg',
    name: 'Jon Barnes',
    company: 'CTO, Brainio',
    role: 'partner',
    content:
      'Sed porta vitae nunc sit amet tempor. Donec velit libero, finibus sit amet tellus vitae, eleifend bibendum augue. Phasellus dignissim nulla ut diam tempus suscipit. Duis at lorem tortor. Pellentesque euismod nisi odio, eget bibendum risus euismod eu. Fusce lacinia consectetur sem eget maximus. Donec viverra maximus lectus, non aliquet risus pretium a. Cras pellentesque ligula a ultricies feugiat. Integer tincidunt mattis mi, et lacinia lorem auctor eu. Duis mattis nisl purus, a tristique eros convallis a. Morbi ullamcorper, arcu vitae porttitor hendrerit, urna felis faucibus felis, pretium condimentum diam dui a dui. Nullam tincidunt magna nec eros feugiat mattis. Vivamus et neque rhoncus, porta felis et, porta sem. Sed eu rutrum est. Maecenas feugiat efficitur odio, eleifend vulputate dolor. In sit amet iaculis arcu. Integer congue luctus cursus. Fusce sollicitudin egestas mauris, eu dignissim nibh sollicitudin laoreet. Cras metus tortor, semper in imperdiet non, rutrum non purus. Mauris pellentesque nulla vitae mauris bibendum tellus.',
  },
];
