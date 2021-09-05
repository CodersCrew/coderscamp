const withTranspileModules = require('next-transpile-modules');
const withPlugins = require('next-compose-plugins');
const { dependencies } = require('./package.json');

const monorepoPackageNames = Object.keys(dependencies).filter((dependencyName) =>
  dependencyName.includes('@coderscamp/'),
);

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withPlugins([withBundleAnalyzer, withTranspileModules(monorepoPackageNames)], {
  reactStrictMode: true,
  images: {
    domains: ['res.cloudinary.com', 'randomuser.me'],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      Object.assign(config.resolve.alias, {
        react: 'preact/compat',
        'react-dom/test-utils': 'preact/test-utils',
        'react-dom': 'preact/compat',
      });
    }

    return config;
  },
});
