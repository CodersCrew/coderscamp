const withTranspileModules = require('next-transpile-modules');
const withPlugins = require('next-compose-plugins');
const { dependencies } = require('./package.json');

const monorepoPackageNames = Object.keys(dependencies).filter((dependencyName) =>
  dependencyName.includes('@coderscamp/'),
);

module.exports = withPlugins([withTranspileModules(monorepoPackageNames)], {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
});
