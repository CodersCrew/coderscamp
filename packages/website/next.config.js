const withTranspileModules = require('next-transpile-modules');
const withImages = require('next-images');
const withPlugins = require('next-compose-plugins');
const { dependencies } = require('./package.json');

const monorepoPackageNames = Object.keys(dependencies).filter((dependencyName) =>
  dependencyName.includes('@coderscamp/'),
);

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withPlugins([withBundleAnalyzer, withTranspileModules(monorepoPackageNames), withImages], {
  reactStrictMode: true,
  images: {
    disableStaticImages: true,
    domains: ['res.cloudinary.com'],
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
