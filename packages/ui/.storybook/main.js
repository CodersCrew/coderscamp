const { addEmotionConfig } = require('./addEmotionConfig');

module.exports = {
  stories: ['./docs/*.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
  webpackFinal: (config) => {
    addEmotionConfig(config);

    return config;
  },
};
