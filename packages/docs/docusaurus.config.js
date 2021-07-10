const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: 'CodersCamp Docs',
  tagline: 'Documentation for the entire CodersCamp monorepo',
  url: 'https://your-docusaurus-test-site.com',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'CodersCrew',
  projectName: 'coderscamp',
  themeConfig: {
    navbar: {
      title: 'CodersCamp Docs',
      logo: { alt: 'My Site Logo', src: 'img/logo.svg' },
    },
    footer: {
      style: 'dark',
      copyright: `Copyright © ${new Date().getFullYear()} CodersCrew, Built with Docusaurus.`,
    },
    prism: { theme: lightCodeTheme, darkTheme: darkCodeTheme },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          path: 'src',
          routeBasePath: '/',
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: 'https://github.com/CodersCrew/coderscamp/edit/main/packages/docs/',
        },
        theme: { customCss: require.resolve('./styles.css') },
      },
    ],
  ],
};
