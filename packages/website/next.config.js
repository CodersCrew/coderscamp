const withTranspileModules = require('next-transpile-modules');
const withImages = require('next-images');
const withPlugins = require('next-compose-plugins');
const { dependencies } = require('./package.json');

const monorepoPackageNames = Object.keys(dependencies).filter((dependencyName) =>
  dependencyName.includes('@coderscamp/'),
);

module.exports = withPlugins([withTranspileModules(monorepoPackageNames), withImages], {
  reactStrictMode: true,
  images: {
    disableStaticImages: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
});
